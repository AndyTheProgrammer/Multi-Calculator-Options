import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUnits } from '../../services/GetUnits'
import { RootState } from '../store'

interface GetUnitsSliceI {
    units: any[];
}

const initialState: GetUnitsSliceI = { units: [] }

export const fetchGetUnits = createAsyncThunk('getUnits/fetchGetUnits', async () => {
    const { success, payload } = await getUnits();

    if (success) {
        return {
            units: payload
        }
    }

    return {
        units: [],
    }
})

export const getUnitsSlice = createSlice({
    name: 'getUnitsSlice',
    initialState,
    reducers: {
        setGetUnits: (state, action: PayloadAction<any[]>) => {
            state.units = action.payload
        }
    },
    extraReducers: {
        [fetchGetUnits.fulfilled.toString()]: (state, action: PayloadAction<any>) => {
            const { units } = action.payload
            state.units = units
        }
    }
})

export const { setGetUnits } = getUnitsSlice.actions
export const selectUnits = (state: RootState) => state.getUnitsSlice;
export default getUnitsSlice.reducer
