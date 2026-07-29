export type CartItem = {
  id?: string;
  _id?: string;
  session_id?: string;
  quantity?: number;
  discount?: number;
  price?: number | string;
  session?: Record<string, unknown>;
  title?: string;
  thumbnail?: string;
  session_type?: string;
  [key: string]: unknown;
};

export type Cart = {
  id?: string;
  items?: CartItem[];
  subtotal?: number | string;
  total?: number | string;
  discount?: number | string;
  [key: string]: unknown;
};

export type AddToCartPayload = {
  session_id: string;
  quantity: number;
  discount?: number;
  metadata?: Record<string, unknown> | null;
};

export type UpdateCartItemPayload = {
  quantity?: number;
  discount?: number;
  metadata?: unknown;
};
