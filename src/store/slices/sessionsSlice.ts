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
  selectedErrorStatus: number | null;
};

const initialState: SessionsState = {
  items: [],
  selected: null,
  status: "idle",
  error: null,
  selectedErrorStatus: null,
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
      return await sessionsService.fetchAllLiveSessions();
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

export const fetchSessionById = createAsyncThunk(
  "sessions/fetchById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      return await sessionsService.fetchSessionById(id);
    } catch (err) {
      if (err instanceof ApiError) {
        return rejectWithValue({ message: err.message, status: err.status });
      }
      return rejectWithValue({
        message: toErrorMessage(err),
        status: 0,
      });
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
      })
      .addCase(fetchSessionById.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.selectedErrorStatus = null;
        state.selected = null;
      })
      .addCase(fetchSessionById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
        state.selectedErrorStatus = null;
      })
      .addCase(fetchSessionById.rejected, (state, action) => {
        state.status = "failed";
        const payload = action.payload as
          | { message: string; status: number }
          | string
          | undefined;
        if (payload && typeof payload === "object") {
          state.error = payload.message || "Failed to load session";
          state.selectedErrorStatus = payload.status || null;
        } else {
          state.error = payload || "Failed to load session";
          state.selectedErrorStatus = null;
        }
      });
  },
});

export const { clearSessionsError, clearSelectedSession } = sessionsSlice.actions;
export default sessionsSlice.reducer;
