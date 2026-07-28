import type {
  AuthResponse,
  AuthUser,
  LoginPayload,
  SignupPayload,
} from "@/types/auth";
import { apiPost, extractData } from "@/services/apiClient";

export function extractToken(payload: AuthResponse): string | null {
  if (typeof payload.token === "string") return payload.token;
  if (typeof payload.accessToken === "string") return payload.accessToken;
  if (typeof payload.access_token === "string") return payload.access_token;

  if (payload.data && typeof payload.data === "object") {
    const data = payload.data as Record<string, unknown>;
    if (typeof data.token === "string") return data.token;
    if (typeof data.accessToken === "string") return data.accessToken;
    if (typeof data.access_token === "string") return data.access_token;
  }

  return null;
}

export function extractUser(payload: AuthResponse): AuthUser | null {
  if (payload.user && typeof payload.user === "object") return payload.user;

  if (payload.data && typeof payload.data === "object") {
    const data = payload.data as Record<string, unknown>;
    if (data.user && typeof data.user === "object") {
      return data.user as AuthUser;
    }
    if (
      "phone" in data ||
      "email" in data ||
      "first_name" in data ||
      "id" in data
    ) {
      return data as AuthUser;
    }
  }

  return null;
}

/** API expects digits-only phone */
export function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

export async function loginUser(payload: LoginPayload) {
  const body = {
    phone: normalizePhone(payload.phone),
    password: payload.password,
  };
  // Backend path: POST /api/user/logIn  body: { phone, password }
  const res = await apiPost<AuthResponse>("/user/logIn", body, false);
  return {
    raw: res,
    token: extractToken(res),
    user: extractUser(res),
    message:
      typeof res.message === "string" ? res.message : "Login successful",
  };
}

export async function loginExpert(payload: LoginPayload) {
  const body = {
    phone: normalizePhone(payload.phone),
    password: payload.password,
  };
  const res = await apiPost<AuthResponse>("/expert/logIn", body, false);
  return {
    raw: res,
    token: extractToken(res),
    user: extractUser(res),
    message:
      typeof res.message === "string" ? res.message : "Login successful",
  };
}

export async function signupUser(payload: SignupPayload) {
  const body = {
    first_name: payload.first_name.trim(),
    last_name: payload.last_name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: normalizePhone(payload.phone),
    password: payload.password,
  };
  // Correct backend path is /user/signUp (not singUp)
  const res = await apiPost<AuthResponse>("/user/signUp", body, false);
  return {
    raw: res,
    token: extractToken(res),
    user: extractUser(res) ?? (extractData<AuthUser>(res) as AuthUser),
    message:
      typeof res.message === "string" ? res.message : "Registration successful",
  };
}

export async function sendOtp(phone: string) {
  const res = await apiPost<{ success?: boolean; message?: string }>(
    "/user/send-otp",
    { phone: normalizePhone(phone) },
    false,
  );

  return {
    message:
      typeof res.message === "string"
        ? res.message
        : "OTP sent successfully via WhatsApp.",
  };
}
