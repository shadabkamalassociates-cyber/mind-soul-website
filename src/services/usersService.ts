import type { User } from "@/types/user";
import { apiGet, extractData, extractList } from "@/services/apiClient";

export async function fetchAllUsers() {
  const res = await apiGet("/users/fetch-all");
  return extractList<User>(res);
}

export async function fetchUserById(id: string | number) {
  const res = await apiGet(`/users/fetch-by-id/${id}`);
  return extractData<User>(res);
}
