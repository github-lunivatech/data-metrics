import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    locations: {},
    // alllocationsId: [],
}


const locationEntity = new schema.Entity('location', {}, {
    idAttribute: 'LId'
});
const locationListSchema = new schema.Array(locationEntity);

const location = createSlice({
    name: 'location',
    initialState,
    reducers: {
        getAllLocationSuccess: (state, action) => {
            const { LocationDetails } = action.payload;
            let normalizedlocationData = normalize(LocationDetails, locationListSchema)
            // state.alllocationsId = normalizedlocationData.result;
            state.locations = normalizedlocationData.entities.location
        }
    }
})

export const {
    getAllLocationSuccess
} = location.actions;

export default location.reducer;