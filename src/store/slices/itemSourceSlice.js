import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    newItems: {},
    // allnewItemsId: [],
}

const newItemEntity = new schema.Entity('newItem', {}, {
    idAttribute: 'Id'
});
const newItemListSchema = new schema.Array(newItemEntity);

const newItem = createSlice({
    name: 'newItem',
    initialState,
    reducers: {
        getAllNewItemSourceSuccess: (state, action) => {
            const { itemsource } = action.payload;
            let normalizednewItemData = normalize(itemsource, newItemListSchema)
            state.newItems = normalizednewItemData.entities.newItem
        }
    }
})

export const {
    getAllNewItemSourceSuccess
} = newItem.actions;

export default newItem.reducer;