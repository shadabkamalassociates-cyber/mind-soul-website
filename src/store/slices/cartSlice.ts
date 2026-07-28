import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/types/cart";
import type { CheckoutPayload } from "@/types/purchase";
import type { Session } from "@/types/session";
import * as paymentService from "@/services/paymentService";
import * as purchaseService from "@/services/purchaseService";
import { ApiError } from "@/services/apiClient";

type Status = "idle" | "loading" | "succeeded" | "failed";

type CartState = {
  items: CartItem[];
  sessionSnapshots: Record<string, Session>;
  subtotal: number;
  total: number;
  status: Status;
  actionStatus: Status;
  purchaseStatus: Status;
  error: string | null;
  purchaseMessage: string | null;
};

const initialState: CartState = {
  items: [],
  sessionSnapshots: {},
  subtotal: 0,
  total: 0,
  status: "idle",
  actionStatus: "idle",
  purchaseStatus: "idle",
  error: null,
  purchaseMessage: null,
};

function toErrorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Cart request failed";
}

function parseAmount(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value.replace(/[^\d.]/g, "")) || 0;
  return 0;
}

function applyCartState(
  state: CartState,
  cart: ReturnType<typeof paymentService.normalizeCart>,
  keepExistingIfEmpty = false,
) {
  const incoming = cart.items ?? [];
  if (incoming.length === 0 && keepExistingIfEmpty && state.items.length > 0) {
    return;
  }
  state.items = incoming;
  state.subtotal = parseAmount(cart.subtotal);
  state.total = parseAmount(cart.total);
  if (!state.total && state.items.length > 0) {
    state.total = state.items.reduce((sum, item) => {
      const price = parseAmount(item.price ?? item.session?.price);
      const qty = Number(item.quantity ?? 1);
      return sum + price * qty;
    }, 0);
  }
  if (!state.subtotal) state.subtotal = state.total;
}

function ensureOptimisticItem(
  state: CartState,
  sessionId: string,
  quantity: number,
) {
  const exists = state.items.some(
    (item) => paymentService.getCartSessionId(item) === sessionId,
  );
  if (exists) return;

  state.items.push({
    id: `local-${sessionId}`,
    session_id: sessionId,
    quantity,
  });
}

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await paymentService.fetchCart();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async (
    payload: {
      session_id: string;
      quantity?: number;
      discount?: number;
      sessionSnapshot?: Session;
    },
    { rejectWithValue },
  ) => {
    try {
      const cart = await paymentService.addToCart({
        session_id: payload.session_id,
        quantity: payload.quantity ?? 1,
        discount: payload.discount ?? 0,
      });
      return {
        cart,
        session_id: payload.session_id,
        quantity: payload.quantity ?? 1,
        sessionSnapshot: payload.sessionSnapshot,
      };
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (
    payload: { itemId: string; sessionId?: string },
    { rejectWithValue, getState },
  ) => {
    try {
      const { itemId, sessionId } = payload;
      if (itemId.startsWith("local-")) {
        return {
          localRemove: true,
          sessionId: sessionId ?? itemId.replace("local-", ""),
        };
      }
      const cart = await paymentService.removeCartItem(itemId);
      return { cart, localRemove: false as const };
    } catch (err) {
      const state = getState() as { cart: CartState };
      if (payload.sessionId || payload.itemId.startsWith("local-")) {
        return {
          localRemove: true,
          sessionId:
            payload.sessionId ?? payload.itemId.replace("local-", ""),
        };
      }
      if (state.cart.items.length > 0) {
        return rejectWithValue(toErrorMessage(err));
      }
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const clearCartItems = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      return await paymentService.clearCart();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const checkoutCart = createAsyncThunk(
  "cart/checkout",
  async (
    payload: { coupon_code?: string | null; notes?: string | null },
    { getState, rejectWithValue },
  ) => {
    try {
      const state = getState() as { cart: CartState };
      const items = state.cart.items;
      if (items.length === 0) throw new Error("Your cart is empty");

      const purchase = await purchaseService.checkoutCart({
        payment_type: "full",
        coupon_code: payload.coupon_code ?? null,
        notes: payload.notes ?? null,
      } satisfies CheckoutPayload);

      try {
        await paymentService.clearCart();
      } catch {
        // cart clear is best-effort after successful purchase
      }
      return purchase;
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError(state) {
      state.error = null;
    },
    clearPurchaseMessage(state) {
      state.purchaseMessage = null;
      state.purchaseStatus = "idle";
    },
    resetCart(state) {
      state.items = [];
      state.sessionSnapshots = {};
      state.subtotal = 0;
      state.total = 0;
      state.status = "idle";
      state.actionStatus = "idle";
      state.error = null;
    },
    cacheSessionSnapshot(
      state,
      action: PayloadAction<{ sessionId: string; session: Session }>,
    ) {
      state.sessionSnapshots[action.payload.sessionId] = action.payload.session;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        applyCartState(state, action.payload, true);
        if (state.items.length === 0 && Object.keys(state.sessionSnapshots).length > 0) {
          for (const [sessionId, session] of Object.entries(state.sessionSnapshots)) {
            ensureOptimisticItem(state, sessionId, 1);
          }
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to load cart";
      })
      .addCase(addCartItem.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        applyCartState(state, action.payload.cart);
        if (action.payload.sessionSnapshot) {
          state.sessionSnapshots[action.payload.session_id] =
            action.payload.sessionSnapshot;
        }
        ensureOptimisticItem(
          state,
          action.payload.session_id,
          action.payload.quantity,
        );
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = (action.payload as string) || "Failed to add to cart";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.actionStatus = "loading";
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        if (action.payload.localRemove) {
          const sessionId = action.payload.sessionId ?? "";
          state.items = state.items.filter(
            (item) => paymentService.getCartSessionId(item) !== sessionId,
          );
          delete state.sessionSnapshots[sessionId];
          state.subtotal = state.items.reduce((sum, item) => {
            const snap = state.sessionSnapshots[paymentService.getCartSessionId(item)];
            const price = parseAmount(item.price ?? snap?.price);
            return sum + price * Number(item.quantity ?? 1);
          }, 0);
          state.total = state.subtotal;
          return;
        }
        applyCartState(state, action.payload.cart!);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = (action.payload as string) || "Failed to remove item";
      })
      .addCase(clearCartItems.fulfilled, (state, action) => {
        applyCartState(state, action.payload);
        state.sessionSnapshots = {};
      })
      .addCase(checkoutCart.pending, (state) => {
        state.purchaseStatus = "loading";
        state.error = null;
        state.purchaseMessage = null;
      })
      .addCase(checkoutCart.fulfilled, (state) => {
        state.purchaseStatus = "succeeded";
        state.purchaseMessage = "Payment successful! Your session purchase is confirmed.";
        state.items = [];
        state.sessionSnapshots = {};
        state.subtotal = 0;
        state.total = 0;
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.purchaseStatus = "failed";
        state.error = (action.payload as string) || "Payment failed";
      });
  },
});

export const {
  clearCartError,
  clearPurchaseMessage,
  resetCart,
  cacheSessionSnapshot,
} = cartSlice.actions;
export default cartSlice.reducer;
