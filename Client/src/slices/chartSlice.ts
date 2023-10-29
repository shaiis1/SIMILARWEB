import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface chartType {
    view: string
  }

export const chartAdapter = createEntityAdapter<chartType>({
    selectId: (item) => item.view
  })

export const chartSelectors =
chartAdapter.getSelectors<RootState>((state) => state.chart)

export const { selectAll, selectById, selectEntities, selectTotal } =
chartSelectors

const chartSlice = createSlice({
  name: "chart",
  initialState: chartAdapter.getInitialState({
    loading: false,
    error: '',
    success: false,
    yAxisRatioTypes: [],
    selectedYAxisRatioType: 'units_sold',
    addedTrendLine: ''
  }),
  reducers: {
    setYAxisRatioTypes: (state, action) => {
        state.yAxisRatioTypes = action.payload
    },
    setSelectedYAxisRatioType: (state, action) => {
        state.selectedYAxisRatioType = action.payload
    },
    setAddedTrendLine: (state, action) => {
        state.addedTrendLine = action.payload
    }
  },
});

export const { setSelectedYAxisRatioType, setYAxisRatioTypes, setAddedTrendLine } = chartSlice.actions;
export const chartState = (state: RootState) => state.chart
export default chartSlice.reducer;