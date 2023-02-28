import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    wastages: {},
    // allwastagesId: [],
}

const wastageEntity = new schema.Entity('wastage', {}, {
    idAttribute: 'WId'
});
const wastageListSchema = new schema.Array(wastageEntity);

const wastage = createSlice({
    name: 'wastage',
    initialState,
    reducers: {
        getAllWastageSuccess: (state, action) => {
            const { GetlistOfwastageDetailsByDate } = action.payload;
            let normalizedwastageData = normalize(GetlistOfwastageDetailsByDate, wastageListSchema)
            // state.allwastagesId = normalizedwastageData.result;
            state.wastages = normalizedwastageData.entities.wastage
        }
    }
})

export const {
    getAllWastageSuccess
} = wastage.actions;

export default wastage.reducer;