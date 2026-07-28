import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slices/authSlice";
import categoriesReducer from "@/store/slices/categoriesSlice";
import sessionsReducer from "@/store/slices/sessionsSlice";
import expertsReducer from "@/store/slices/expertsSlice";

import recordedSessionsReducer from "@/store/slices/recordedSessionsSlice";
import cartReducer from "@/store/slices/cartSlice";
import blogsReducer from "@/store/slices/blogsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      categories: categoriesReducer,
      sessions: sessionsReducer,
      recordedSessions: recordedSessionsReducer,
      experts: expertsReducer,
      cart: cartReducer,
      blogs: blogsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
