export type AuthUser = {
  id?: string;
  _id?: string;
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  alternate_phone?: string | null;
  whatsapp_number?: string | null;
  role?: string | null;
  status?: string | null;
  profile_completed?: boolean | null;
  profile_image?: string | null;
  cover_image?: string | null;
  bio?: string | null;
  about?: string | null;
  profession?: string | null;
  professional_title?: string | null;
  specialization?: string | null;
  experience_years?: number | string | null;
  languages?: string | string[] | null;
  certifications?: string | null;
  education?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  timezone?: string | null;
  consultation_fee?: number | string | null;
  average_rating?: string | number | null;
  total_reviews?: number | null;
  total_sessions?: number | null;
  mission?: string | null;
  uniqueness?: string | null;
  why_started?: string | null;
  client_approach?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
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
