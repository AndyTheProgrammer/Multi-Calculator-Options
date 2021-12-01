import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store'

interface CalculatorState {
  results: any,
  isCalculating: boolean
}

// Initial states
const initialState: CalculatorState = {
  results: '',
  isCalculating: false,
};

export const calcsSlice = createSlice({
  name: "calcSlice",
  initialState,
  reducers: {
    calculateData: (state, action: PayloadAction<any>) => {
      // destructure payload
      const { calculatorObject, method } = action.payload

      // Optional state to hide or show the result container
      state.isCalculating = true;

      // If statements that match the method to return the right payload for the calculator
      if (method === "circleArea") {
        state.results = `Area = ${calculatorObject.area}${calculatorObject.units}2`
        //  console.log("CIRCLEAREA: ", calculatorObject.area)
      }

    },
  },
});

// Action creators are generated for each case reducer function
export const { calculateData } = calcsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCalculators = (state: RootState) => state.calcsSlice;

export default calcsSlice.reducer;
