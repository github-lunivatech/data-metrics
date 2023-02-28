import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    itemRatios: {},
    // allitemRatiosId: [],
}

const itemRatioEntity = new schema.Entity('itemRatio', {}, {
    idAttribute: 'RId'
});
const itemRatioListSchema = new schema.Array(itemRatioEntity);

const itemRatio = createSlice({
    name: 'itemRatio',
    initialState,
    reducers: {
        getAllItemRatioSuccess: (state, action) => {
            const { GetListOfItemVsTestRatio } = action.payload;
            let normalizeditemRatioData = normalize(GetListOfItemVsTestRatio, itemRatioListSchema)
            // state.allitemRatiosId = normalizeditemRatioData.result;
            state.itemRatios = normalizeditemRatioData.entities.itemRatio
        }
    }
})

export const {
    getAllItemRatioSuccess
} = itemRatio.actions;

export default itemRatio.reducer;