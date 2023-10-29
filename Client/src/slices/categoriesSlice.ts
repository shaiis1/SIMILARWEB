import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface categoriesType {
    id: string
    category_name: string
    date: string
    product_views: string
    revenue: string
    units_sold: string
  }

export const categoriesAdapter = createEntityAdapter<categoriesType>({
    selectId: (category) => category.id
  })

export const categoriesSelectors =
categoriesAdapter.getSelectors<RootState>((state) => state.products)

export const { selectAll, selectById, selectEntities, selectTotal } =
categoriesSelectors

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState({
    loading: false,
    error: '',
    success: false,
    categories: [],
    selectedCategory: ''
  }),
  reducers: {
    setCategories: (state, action) => {
      // Ensure unique categories using a Set and then convert back to an array
      //state.selectedCategory = action.payload[0]
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload
    }
  },
});

export const { setCategories, setSelectedCategory } = categoriesSlice.actions;
export const categoriesState = (state: RootState) => state.categories
export default categoriesSlice.reducer;