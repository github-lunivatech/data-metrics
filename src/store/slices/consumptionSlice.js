import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    consumption: {},
    consumptionLook: {},
}


const consumptionEntity = new schema.Entity('consumption', {}, {
    idAttribute: 'CGId'
});
const consumptionListSchema = new schema.Array(consumptionEntity);

const consumptionLookEntity = new schema.Entity('consumptionLook', {}, {
    idAttribute: 'CId'
});
const consumptionLookListSchema = new schema.Array(consumptionLookEntity);

const consumption = createSlice({
    name: 'consumption',
    initialState,
    reducers: {
        getAllconsumptionSuccess: (state, action) => {
            const { GetConsumptionGroup } = action.payload;
            let normalizedconsumptionData = normalize(GetConsumptionGroup, consumptionListSchema)
            // state.allconsumptionId = normalizedconsumptionData.result;
            state.consumption = normalizedconsumptionData.entities.consumption
        },
        getAllConsumptionLookSuccess: (state, action) => {
            const { GetConsumptionGroupTestLookUp } = action.payload;
            let normalizedconsumptionData = normalize(GetConsumptionGroupTestLookUp, consumptionLookListSchema)
            // state.allconsumptionId = normalizedconsumptionData.result;
            state.consumptionLook = normalizedconsumptionData.entities.consumptionLook
        }
    }
})

export const {
  getAllconsumptionSuccess,
  getAllConsumptionLookSuccess
} = consumption.actions;

export default consumption.reducer;