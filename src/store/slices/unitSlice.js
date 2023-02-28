import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    units: {},
    // allUnitsId: [],
}


const unitEntity = new schema.Entity('unit', {}, {
    idAttribute: 'UnId'
});
const unitListSchema = new schema.Array(unitEntity);

const unit = createSlice({
    name: 'unit',
    initialState,
    reducers: {
        getAllUnitSuccess: (state, action) => {
            const { units } = action.payload;
            let normalizedUnitData = normalize(units, unitListSchema)
            // state.allUnitsId = normalizedUnitData.result;
            state.units = normalizedUnitData.entities.unit
        }
    }
})

export const {
    getAllUnitSuccess
} = unit.actions;

export default unit.reducer;