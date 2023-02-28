import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    itemTypes: {},
    // allitemTypesId: [],
}

const itemTypeEntity = new schema.Entity('itemType', {}, {
    idAttribute: 'TId'
});
const itemTypeListSchema = new schema.Array(itemTypeEntity);

const itemType = createSlice({
    name: 'itemType',
    initialState,
    reducers: {
        getAllItemTypeSuccess: (state, action) => {
            const { GetItemType } = action.payload;
            let normalizeditemTypeData = normalize(GetItemType, itemTypeListSchema)
            // state.allitemTypesId = normalizeditemTypeData.result;
            state.itemTypes = normalizeditemTypeData.entities.itemType
        }
    }
})

export const {
    getAllItemTypeSuccess
} = itemType.actions;

export default itemType.reducer;