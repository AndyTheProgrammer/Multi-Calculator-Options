import { combineReducers } from "redux";

import calculatorReducer from "./CalculatorsSlice";
import getUnitsReducer from "./GetUnits";


const rootReducer = combineReducers({
  calcsSlice: calculatorReducer,
  getUnitsSlice: getUnitsReducer,
});

export default rootReducer;
