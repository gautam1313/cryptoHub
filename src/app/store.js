import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(cryptoApi.middleware),
    getDefaultMiddleware().concat(cryptoNewsApi.middleware)
  ),
});

// setupListeners(configureStore.dispatch);
