import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    reagents: {},
}

const reagentEntity = new schema.Entity('reagent', {}, {
    idAttribute: 'CId'
});
const reagentListSchema = new schema.Array(reagentEntity);

const reagent = createSlice({
    name: 'reagent',
    initialState,
    reducers: {
        getAllreagentSuccess: (state, action) => {
            const { GetReagentUsedForControlByDate } = action.payload;
            let normalizedreagentData = normalize(GetReagentUsedForControlByDate, reagentListSchema)
            state.reagents = normalizedreagentData.entities.reagent
        }
    }
})

export const {
    getAllreagentSuccess
} = reagent.actions;

export default reagent.reducer;