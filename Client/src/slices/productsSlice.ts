import { createEntityAdapter, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GetProducts } from "../apis/productsApi"
import { setCategories } from "./categoriesSlice"
import { RootState } from "./store"

export interface productsType {
    id: string
    category_name: string
    date: string
    product_views: string
    revenue: string
    units_sold: string
  }

export const productsAdapter = createEntityAdapter<productsType>({
    selectId: (product) => product.id
  })
  
  export const productsSelectors =
  productsAdapter.getSelectors<RootState>((state) => state.products)
  
  export const { selectAll, selectById, selectEntities, selectTotal } =
  productsSelectors

  export const getProducts = createAsyncThunk(
        'products/getProducts',
        async (_,thunkApi) => {
          try {
            const res = await GetProducts()
            const categories = Array.from(new Set(res.data.map((item: { category_name: any }) => item.category_name)))
            thunkApi.dispatch(setCategories(categories))
            return res.data
          } catch (err: any) {
            return err.message
          }
        }
    )

    const productsSlice = createSlice({
        name: 'products',
        initialState: productsAdapter.getInitialState({
          loading: false,
          error: '',
          success: false,
          entities: []
        }),
        reducers: {
        },
        extraReducers(builder) {
          builder
            .addCase(getProducts.pending, (state, action) => {
              state.loading = true
            })
            .addCase(
                getProducts.fulfilled,
              (state, action: PayloadAction<any>) => {
                state.loading = false
                productsAdapter.setAll(state, action.payload)
                // customerUsersAdapter.updateOne() = action.payload
              }
            )
            .addCase(getProducts.rejected, (state, action: PayloadAction<any>) => {
              state.loading = false
              state.error = action.payload
            })
        }
      })

export const { } = productsSlice.actions
export const productsState = (state: RootState) => state.products
export default productsSlice.reducer


