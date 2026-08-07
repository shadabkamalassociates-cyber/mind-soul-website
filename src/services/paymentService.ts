import type { AddToCartPayload, Cart, CartItem, UpdateCartItemPayload } from "@/types/cart";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut, 
  extractData,
  extractList,
} from "@/services/apiClient";

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  return Boolean(
    obj.session_id ??
      obj.sessionId ??
      obj.id ??
      obj._id ??
      obj.title ??
      obj.session,
  );
}

function normalizeCartItems(payload: unknown): CartItem[] {
  if (Array.isArray(payload)) {
    return payload.filter(isCartItem) as CartItem[];
  }

  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;

    if (Array.isArray(obj.items)) return obj.items as CartItem[];
    if (Array.isArray(obj.cart_items)) return obj.cart_items as CartItem[];
    if (Array.isArray(obj.cartItems)) return obj.cartItems as CartItem[];

    if (obj.cart && typeof obj.cart === "object") {
      return normalizeCartItems(obj.cart);
    }

    if (obj.data && typeof obj.data === "object") {
      const nested = obj.data as Record<string, unknown>;
      if (Array.isArray(nested.items)) return nested.items as CartItem[];
      if (Array.isArray(nested.cart_items)) return nested.cart_items as CartItem[];
      if (Array.isArray(nested.data)) return nested.data as CartItem[];
      if (nested.cart) return normalizeCartItems(nested.cart);
      if (isCartItem(nested)) return [nested as CartItem];
    }

    if (Array.isArray(obj.data)) return obj.data as CartItem[];
    if (isCartItem(obj)) return [obj as CartItem];
  }

  return extractList<CartItem>(payload);
}

export function normalizeCart(payload: unknown): Cart {
  const data = extractData<unknown>(payload);
  let source: unknown = data ?? payload;

  // add-to-cart returns { cart: {...}, item: {...} }
  if (source && typeof source === "object" && !Array.isArray(source)) {
    const wrapper = source as Record<string, unknown>;
    if (wrapper.cart && typeof wrapper.cart === "object") {
      source = wrapper.cart;
    }
  }

  if (source && typeof source === "object" && !Array.isArray(source)) {
    const obj = source as Record<string, unknown>;
    const items = normalizeCartItems(
      obj.items ?? obj.cart_items ?? obj.cartItems ?? obj,
    );
    return {
      ...(obj as Cart),
      items,
      subtotal: (obj.subtotal ?? obj.session_price) as Cart["subtotal"],
      total: (obj.total ?? obj.to_be_paid ?? obj.grand_total) as Cart["total"],
    };
  }

  return { items: normalizeCartItems(source) };
}

export function getCartItemId(item: CartItem): string {
  return String(item.id ?? item._id ?? item.cart_item_id ?? "");
}

export function getCartSessionId(item: CartItem): string {
  const session = item.session;
  const nestedSession =
    session && typeof session === "object"
      ? (session as Record<string, unknown>)
      : null;

  return String(
    item.session_id ??
      item.sessionId ??
      nestedSession?.id ??
      nestedSession?._id ??
      nestedSession?.session_id ??
      "",
  );
}

export async function fetchCart() {
  const res = await apiGet("/payment/fetch-cart");
  console.log(res,"------------------");
  return normalizeCart(res);
}

export async function addToCart(body: AddToCartPayload) {
  const res = await apiPost("/payment/cart/add", {
    session_id: body.session_id,
    quantity: body.quantity ?? 1,
    discount: body.discount ?? 0,
    metadata: body.metadata ?? null,
  });
  const normalized = normalizeCart(res);
  if ((normalized.items ?? []).length > 0) return normalized;
  // Add endpoint may return success without items — fetch full cart
  return fetchCart();
}

export async function updateCartItem(
  itemId: string | number,
  body: UpdateCartItemPayload,
) {
  const res = await apiPut(`/payment/cart/item/${itemId}`, body);
  return normalizeCart(res);
}

/** Removes a cart line via PUT /payment/cart/item/:id with quantity 0. */
export async function removeCartItem(itemId: string | number) {
  return updateCartItem(itemId, { quantity: 0 });
}

export async function clearCart() {
  const res = await apiDelete("/payment/cart/clear");
  return normalizeCart(res);
}

export type SessionPurchaseRecord = {
  session_id?: string | number;
  payment_status?: string | null;
  purchase_status?: string | null;
};

export async function fetchMyPurchases() {
  const res = await apiGet("/payment/my-purchases", true);
  return extractList<SessionPurchaseRecord>(res);
}
