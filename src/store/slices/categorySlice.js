import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    category: {},
    // allcategoryId: [],
}


const categoryEntity = new schema.Entity('category', {}, {
    idAttribute: 'CId'
});
const categoryListSchema = new schema.Array(categoryEntity);

const category = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getAllCategorySuccess: (state, action) => {
            const { ItemGategory } = action.payload;
            let normalizedcategoryData = normalize(ItemGategory, categoryListSchema)
            // state.allcategoryId = normalizedcategoryData.result;
            state.category = normalizedcategoryData.entities.category
        }
    }
})

export const {
  getAllCategorySuccess
} = category.actions;

export default category.reducer;