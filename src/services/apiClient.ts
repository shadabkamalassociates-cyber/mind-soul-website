/** Production API — all requests go to backend.apnasmartgate.com */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://backend.apnasmartgate.com/api";

const BASE_URL = API_BASE_URL;

export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("soulsensei_token");
  } catch {
    return null;
  }
}

export function extractList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.users)) return obj.users as T[];
    if (Array.isArray(obj.results)) return obj.results as T[];
    if (Array.isArray(obj.items)) return obj.items as T[];
    if (obj.data && typeof obj.data === "object") {
      const nested = obj.data as Record<string, unknown>;
      if (Array.isArray(nested.data)) return nested.data as T[];
      if (Array.isArray(nested.users)) return nested.users as T[];
    }
  }
  return [];
}

export function extractData<T>(payload: unknown): T {
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    // Some endpoints return data as a single-item array
    if (Array.isArray(obj.data)) {
      return (obj.data[0] ?? null) as T;
    }
    if ("data" in obj && obj.data !== undefined) return obj.data as T;
    if (Array.isArray(obj.users)) {
      return (obj.users[0] ?? null) as T;
    }
  }
  return payload as T;
}

export function extractMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === "object") {
    const obj = payload as Record<string, unknown>;
    if (typeof obj.message === "string" && obj.message.trim()) return obj.message;
    if (typeof obj.error === "string" && obj.error.trim()) return obj.error;
    if (Array.isArray(obj.errors) && obj.errors.length > 0) {
      const first = obj.errors[0];
      if (typeof first === "string") return first;
      if (first && typeof first === "object" && "message" in first) {
        return String((first as { message: unknown }).message);
      }
    }
  }
  if (typeof payload === "string" && payload.trim()) {
    return sanitizeErrorText(payload);
  }
  return fallback;
}

function sanitizeErrorText(text: string): string {
  const preMatch = text.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i);
  if (preMatch) {
    return preMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
  if (/<!DOCTYPE html>|<html/i.test(text)) {
    return "Server error. Please try again.";
  }
  return text.trim();
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
  headers?: Record<string, string>;
};

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, auth = true, headers = {} } = options;
  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const finalHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  if (body !== undefined) {
    finalHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers: finalHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let payload: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!res.ok) {
    throw new ApiError(
      extractMessage(payload, `Request failed (${res.status})`),
      res.status,
      payload,
    );
  }

  return payload as T;
}

export function apiGet<T = unknown>(path: string, auth = true) {
  return apiRequest<T>(path, { method: "GET", auth });
}

export function apiPost<T = unknown>(
  path: string,
  body?: unknown,
  auth = true,
) {
  return apiRequest<T>(path, { method: "POST", body, auth });
}

export function apiPut<T = unknown>(
  path: string,
  body?: unknown,
  auth = true,
) {
  return apiRequest<T>(path, { method: "PUT", body, auth });
}

export function apiPatch<T = unknown>(
  path: string,
  body?: unknown,
  auth = true,
) {
  return apiRequest<T>(path, { method: "PATCH", body, auth });
}

export function apiDelete<T = unknown>(
  path: string,
  body?: unknown,
  auth = true,
) {
  return apiRequest<T>(path, { method: "DELETE", body, auth });
}
