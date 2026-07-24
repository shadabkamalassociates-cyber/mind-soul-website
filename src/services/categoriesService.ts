import type { Category } from "@/types/category";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  extractData,
  extractList,
} from "@/services/apiClient";

export async function fetchAllCategories() {
  const res = await apiGet("/categories/fetch-all", false);
  return extractList<Category>(res);
}

export async function fetchCategoryById(id: string | number) {
  const res = await apiGet(`/categories/fetch/${id}`, false);
  return extractData<Category>(res);
}

export async function createCategory(body: { name: string; icon: string }) {
  return apiPost("/categories/create", body);
}

export async function updateCategory(
  id: string | number,
  body: Partial<{ name: string; icon: string }>,
) {
  return apiPut(`/categories/update/${id}`, body);
}

export async function deleteCategories(ids: Array<string | number>) {
  return apiDelete("/categories/delete", ids);
}
