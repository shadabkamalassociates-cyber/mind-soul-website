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
  checkAuthSuccess: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  hydrated: false,
  checkAuthSuccess: false,
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

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = getStoredToken();
    if (!token) {
      return { user: null as AuthUser | null, skipped: true as const };
    }

    try {
      const result = await authService.checkAuthUser();
      console.log("result", result);
      return { user: result.user, skipped: false as const };
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        return rejectWithValue({ unauthorized: true });
      }
      return rejectWithValue({ unauthorized: false });
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
      // Storage is ready; checkAuth still refreshes user in the background.
      state.hydrated = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      state.checkAuthSuccess = false;
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
        state.checkAuthSuccess = Boolean(action.payload.token);
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
        state.checkAuthSuccess = Boolean(action.payload.token);
        if (action.payload.token) setStoredToken(action.payload.token);
        if (action.payload.user) setStoredUser(action.payload.user);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Signup failed";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.checkAuthSuccess = !action.payload.skipped;
        if (!action.payload.skipped && action.payload.user) {
          state.user = action.payload.user;
          setStoredUser(action.payload.user);
        }
        state.hydrated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.checkAuthSuccess = false;
        const payload = action.payload as
          | { unauthorized?: boolean }
          | undefined;
        if (payload?.unauthorized) {
          state.user = null;
          state.token = null;
          state.status = "idle";
          state.error = null;
          clearAuthStorage();
        }
        state.hydrated = true;
      });
  },
});

export const { hydrateAuth, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
