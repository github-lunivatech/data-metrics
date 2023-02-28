import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    racks: {},
    // allracksId: [],
}


const rackEntity = new schema.Entity('rack', {}, {
    idAttribute: 'RId'
});
const rackListSchema = new schema.Array(rackEntity);

const rack = createSlice({
    name: 'rack',
    initialState,
    reducers: {
        getAllRackSuccess: (state, action) => {
            const { RackDetailsByLocationId } = action.payload;
            let normalizedrackData = normalize(RackDetailsByLocationId, rackListSchema)
            // state.allracksId = normalizedrackData.result;
            state.racks = normalizedrackData.entities.rack
        }
    }
})

export const {
    getAllRackSuccess
} = rack.actions;

export default rack.reducer;