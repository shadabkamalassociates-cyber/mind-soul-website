import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiBlog, ApiBlogCategory } from "@/types/blog";
import * as blogsService from "@/services/blogsService";
import { ApiError } from "@/services/apiClient";

type Status = "idle" | "loading" | "succeeded" | "failed";

type BlogsState = {
  items: ApiBlog[];
  categories: ApiBlogCategory[];
  selected: ApiBlog | null;
  status: Status;
  categoriesStatus: Status;
  error: string | null;
};

const initialState: BlogsState = {
  items: [],
  categories: [],
  selected: null,
  status: "idle",
  categoriesStatus: "idle",
  error: null,
};

function toErrorMessage(err: unknown) {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Failed to load blogs";
}

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await blogsService.fetchAllBlogs();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBySlug",
  async (slug: string, { rejectWithValue }) => {
    try {
      return await blogsService.fetchBlogBySlug(slug);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchBlogCategories = createAsyncThunk(
  "blogs/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await blogsService.fetchBlogCategories();
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

export const fetchBlogsByCategory = createAsyncThunk(
  "blogs/fetchByCategory",
  async (categoryId: string, { rejectWithValue }) => {
    try {
      return await blogsService.fetchBlogsByCategory(categoryId);
    } catch (err) {
      return rejectWithValue(toErrorMessage(err));
    }
  },
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    clearBlogsError(state) {
      state.error = null;
    },
    clearSelectedBlog(state) {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to load blogs";
      })
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to load blog";
      })
      .addCase(fetchBlogCategories.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.categoriesStatus = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchBlogCategories.rejected, (state, action) => {
        state.categoriesStatus = "failed";
        state.error = (action.payload as string) || "Failed to load blog categories";
      })
      .addCase(fetchBlogsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      });
  },
});

export const { clearBlogsError, clearSelectedBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
