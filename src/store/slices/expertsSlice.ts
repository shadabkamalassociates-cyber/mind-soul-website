import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Expert } from "@/types/expert";
import * as expertsService from "@/services/expertsService";
import { ApiError } from "@/services/apiClient";

type Status = "idle" | "loading" | "succeeded" | "failed";

type ExpertsState = {
  items: Expert[];
  verified: Expert[];
  blocked: Expert[];
  selected: Expert | null;
  status: Status;
  actionStatus: Status;
  error: string | null;
};

const initialState: ExpertsState = {
  items: [],
  verified: [],
  blocked: [],
  selected: null,
  status: "idle",
  actionStatus: "idle",
  error: null,
};

function toErrorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Failed to load experts";
}

export const fetchExperts = createAsyncThunk(
  "experts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await expertsService.fetchAllExperts();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchExpertById = createAsyncThunk(
  "experts/fetchById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      return await expertsService.fetchExpertByIdFromAll(id);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchVerifiedExperts = createAsyncThunk(
  "experts/fetchVerified",
  async (_, { rejectWithValue }) => {
    try {
      return await expertsService.fetchVerifiedExperts();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchBlockedExperts = createAsyncThunk(
  "experts/fetchBlocked",
  async (_, { rejectWithValue }) => {
    try {
      return await expertsService.fetchBlockedExperts();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const updateExpert = createAsyncThunk(
  "experts/update",
  async (
    { id, body }: { id: string | number; body: unknown },
    { rejectWithValue },
  ) => {
    try {
      await expertsService.updateExpert(id, body);
      return await expertsService.fetchExpertById(id);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const deleteExperts = createAsyncThunk(
  "experts/delete",
  async (ids: Array<string | number>, { rejectWithValue }) => {
    try {
      await expertsService.deleteExperts(ids);
      return ids.map(String);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const blockExpert = createAsyncThunk(
  "experts/block",
  async (
    {
      id,
      user_id,
      reason,
    }: { id: string | number; user_id: string | number; reason: string },
    { rejectWithValue },
  ) => {
    try {
      await expertsService.blockExpert(id, { user_id, reason });
      return String(id);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const verifyExpert = createAsyncThunk(
  "experts/verify",
  async (
    {
      id,
      user_id,
      status,
      reason,
    }: {
      id: string | number;
      user_id: string | number;
      status: string;
      reason: string;
    },
    { rejectWithValue },
  ) => {
    try {
      await expertsService.verifyExpert(id, { user_id, status, reason });
      return String(id);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

const expertsSlice = createSlice({
  name: "experts",
  initialState,
  reducers: {
    clearExpertsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchExperts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchExperts.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to load experts";
      })
      .addCase(fetchVerifiedExperts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVerifiedExperts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.verified = action.payload;
      })
      .addCase(fetchVerifiedExperts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || "Failed to load verified experts";
      })
      .addCase(fetchBlockedExperts.fulfilled, (state, action) => {
        state.blocked = action.payload;
      })
      .addCase(fetchExpertById.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchExpertById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(fetchExpertById.rejected, (state, action) => {
        state.error = (action.payload as string) || "Failed to load expert";
      })
      .addCase(updateExpert.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(updateExpert.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.selected = action.payload;
        const id = String(action.payload?.id ?? "");
        const idx = state.items.findIndex((e) => String(e.id) === id);
        if (idx >= 0 && action.payload) state.items[idx] = action.payload;
      })
      .addCase(updateExpert.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = (action.payload as string) || "Update failed";
      })
      .addCase(deleteExperts.fulfilled, (state, action) => {
        const ids = new Set(action.payload);
        state.items = state.items.filter((e) => !ids.has(String(e.id)));
        state.actionStatus = "succeeded";
      })
      .addCase(deleteExperts.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = (action.payload as string) || "Delete failed";
      })
      .addCase(blockExpert.fulfilled, (state) => {
        state.actionStatus = "succeeded";
      })
      .addCase(blockExpert.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = (action.payload as string) || "Block failed";
      })
      .addCase(verifyExpert.fulfilled, (state) => {
        state.actionStatus = "succeeded";
      })
      .addCase(verifyExpert.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = (action.payload as string) || "Verify failed";
      });
  },
});

export const { clearExpertsError } = expertsSlice.actions;
export default expertsSlice.reducer;
