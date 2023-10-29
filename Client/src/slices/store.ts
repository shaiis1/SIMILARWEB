import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import categoriesSlice from "./categoriesSlice";
import chartSlice from "./chartSlice";
import productsSlice from "./productsSlice";
import viewSlice from "./viewSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        categories: categoriesSlice,
        views: viewSlice,
        chart: chartSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;