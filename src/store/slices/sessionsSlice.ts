import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Session } from "@/types/session";
import * as sessionsService from "@/services/sessionsService";
import { ApiError } from "@/services/apiClient";

type Status = "idle" | "loading" | "succeeded" | "failed";

type SessionsState = {
  items: Session[];
  selected: Session | null;
  status: Status;
  error: string | null;
};

const initialState: SessionsState = {
  items: [],
  selected: null,
  status: "idle",
  error: null,
};

function toErrorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Failed to load sessions";
}

export const fetchSessions = createAsyncThunk(
  "sessions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await sessionsService.fetchAllSessions();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchSessionsByCategory = createAsyncThunk(
  "sessions/fetchByCategory",
  async (categoryId: string | number, { rejectWithValue }) => {
    try {
      return await sessionsService.fetchSessionsByCategory(categoryId);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchSessionsByExpert = createAsyncThunk(
  "sessions/fetchByExpert",
  async (expertId: string | number, { rejectWithValue }) => {
    try {
      return await sessionsService.fetchSessionsByExpert(expertId);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    clearSessionsError(state) {
      state.error = null;
    },
    clearSelectedSession(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSessions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to load sessions";
      })
      .addCase(fetchSessionsByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSessionsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchSessionsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to load sessions";
      })
      .addCase(fetchSessionsByExpert.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      });
  },
});

export const { clearSessionsError, clearSelectedSession } = sessionsSlice.actions;
export default sessionsSlice.reducer;
