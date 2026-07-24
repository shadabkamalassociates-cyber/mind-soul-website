import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthUser, LoginPayload, SignupPayload } from "@/types/auth";
import * as authService from "@/services/authService";
import {
  clearAuthStorage,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from "@/lib/authStorage";
import { ApiError } from "@/services/apiClient";

type Status = "idle" | "loading" | "succeeded" | "failed";

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  status: Status;
  error: string | null;
  hydrated: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  hydrated: false,
};

function toErrorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Something went wrong";
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      return await authService.loginUser(payload);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload: SignupPayload, { rejectWithValue }) => {
    try {
      return await authService.signupUser(payload);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state) {
      state.token = getStoredToken();
      state.user = getStoredUser<AuthUser>();
      state.hydrated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      clearAuthStorage();
    },
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        if (action.payload.token) setStoredToken(action.payload.token);
        if (action.payload.user) setStoredUser(action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Login failed";
      })
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.user = action.payload.user;
        if (action.payload.token) setStoredToken(action.payload.token);
        if (action.payload.user) setStoredUser(action.payload.user);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Signup failed";
      });
  },
});

export const { hydrateAuth, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
