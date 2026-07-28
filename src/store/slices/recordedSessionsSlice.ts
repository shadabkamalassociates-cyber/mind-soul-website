import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Session } from "@/types/session";
import * as sessionsService from "@/services/sessionsService";
import { ApiError } from "@/services/apiClient";

type Status = "idle" | "loading" | "succeeded" | "failed";

type RecordedSessionsState = {
  items: Session[];
  status: Status;
  error: string | null;
};

const initialState: RecordedSessionsState = {
  items: [],
  status: "idle",
  error: null,
};

function toErrorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Failed to load recorded sessions";
}

export const fetchRecordedSessions = createAsyncThunk(
  "recordedSessions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await sessionsService.fetchAllRecordedSessions();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

const recordedSessionsSlice = createSlice({
  name: "recordedSessions",
  initialState,
  reducers: {
    clearRecordedSessionsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecordedSessions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRecordedSessions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRecordedSessions.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) || "Failed to load recorded sessions";
      });
  },
});

export const { clearRecordedSessionsError } = recordedSessionsSlice.actions;
export default recordedSessionsSlice.reducer;
