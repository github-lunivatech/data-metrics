import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    goodsOuts: {},
    // allgoodsOutsId: [],
}

const goodOutEntity = new schema.Entity('goodOut', {}, {
    idAttribute: 'GOId'
});
const goodOutListSchema = new schema.Array(goodOutEntity);

const goodOut = createSlice({
    name: 'goodOut',
    initialState,
    reducers: {
        getAllGoodsOutSuccess: (state, action) => {            
            const { GetListofGoodsOutRecordByDate } = action.payload;
            let normalizedgoodOutData = normalize(GetListofGoodsOutRecordByDate, goodOutListSchema)
            // state.allgoodsOutsId = normalizedgoodOutData.result;
            state.goodsOuts = normalizedgoodOutData.entities.goodOut
        }
    }
})

export const {
    getAllGoodsOutSuccess
} = goodOut.actions;

export default goodOut.reducer;
