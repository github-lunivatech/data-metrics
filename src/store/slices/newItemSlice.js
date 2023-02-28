import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    newItems: {},
    // allnewItemsId: [],
}

const newItemEntity = new schema.Entity('newItem', {}, {
    idAttribute: 'TId'
});
const newItemListSchema = new schema.Array(newItemEntity);

const newItem = createSlice({
    name: 'newItem',
    initialState,
    reducers: {
        getAllNewItemSuccess: (state, action) => {
            const { GetListOfLabItemsDetailsByTypeId } = action.payload;
            let normalizednewItemData = normalize(GetListOfLabItemsDetailsByTypeId, newItemListSchema)
            // state.allnewItemsId = normalizednewItemData.result;
            state.newItems = normalizednewItemData.entities.newItem
        }
    }
})

export const {
    getAllNewItemSuccess
} = newItem.actions;

export default newItem.reducer;