import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface viewType {
    view: string
  }

export const viewAdapter = createEntityAdapter<viewType>({
    selectId: (item) => item.view
  })

export const viewSelectors =
viewAdapter.getSelectors<RootState>((state) => state.views)

export const { selectAll, selectById, selectEntities, selectTotal } =
viewSelectors

const viewsSlice = createSlice({
  name: "views",
  initialState: viewAdapter.getInitialState({
    loading: false,
    error: '',
    success: false,
    selectedView: 'chart'
  }),
  reducers: {
    setSelectedView: (state, action) => {
        state.selectedView = action.payload
    }
  },
});

export const { setSelectedView } = viewsSlice.actions;
export const viewsState = (state: RootState) => state.views
export default viewsSlice.reducer;