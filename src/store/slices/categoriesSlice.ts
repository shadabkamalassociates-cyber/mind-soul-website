import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Category } from "@/types/category";
import * as categoriesService from "@/services/categoriesService";
import { ApiError } from "@/services/apiClient";

type Status = "idle" | "loading" | "succeeded" | "failed";

type CategoriesState = {
  items: Category[];
  selected: Category | null;
  status: Status;
  error: string | null;
};

const initialState: CategoriesState = {
  items: [],
  selected: null,
  status: "idle",
  error: null,
};

function toErrorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Failed to load categories";
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await categoriesService.fetchAllCategories();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchCategoryById = createAsyncThunk(
  "categories/fetchById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      return await categoriesService.fetchCategoryById(id);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoriesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to load categories";
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export const { clearCategoriesError } = categoriesSlice.actions;

/** UI helper: id + label for dropdowns */
export function mapCategoryForUi(category: Category) {
  const id = String(category.id ?? category._id ?? "");
  const label = String(category.name ?? category.label ?? "Category");
  const slug = String(category.slug ?? id);
  return { id, slug, label, icon: category.icon, raw: category };
}

export default categoriesSlice.reducer;
