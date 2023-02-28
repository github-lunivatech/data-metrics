import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    manus: {},
    // allmanusId: [],
}


const manuEntity = new schema.Entity('manu', {}, {
    idAttribute: 'MId'
});
const manuListSchema = new schema.Array(manuEntity);

const manu = createSlice({
    name: 'manu',
    initialState,
    reducers: {
        getAllmanusuccess: (state, action) => {
            const { GetManufactureDetails } = action.payload;
            let normalizedmanuData = normalize(GetManufactureDetails, manuListSchema)
            // state.allmanusId = normalizedmanuData.result;
            state.manus = normalizedmanuData.entities.manu
        }
    }
})

export const {
    getAllmanusuccess
} = manu.actions;

export default manu.reducer;