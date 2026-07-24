export type AuthUser = {
  id?: string;
  _id?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  email?: string;
  phone?: string;
  [key: string]: unknown;
};

export type LoginPayload = {
  phone: string;
  password: string;
};

export type SignupPayload = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};

export type AuthResponse = {
  token?: string;
  accessToken?: string;
  access_token?: string;
  user?: AuthUser;
  data?: AuthUser | { user?: AuthUser; token?: string };
  message?: string;
  [key: string]: unknown;
};
