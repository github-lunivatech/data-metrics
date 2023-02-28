import { createSlice } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr"

const initialState= {
  goodsin: {}
}

const goodsEntity = new schema.Entity('goodsin', {}, {
  idAttribute: 'GId'
});
const goodsListSchema = new schema.Array(goodsEntity);

const goodsin = createSlice({
  name: 'goodsin',
  initialState,
  reducers: {
    getAllGoodsInSucess: (state, action) => {
      const {GetGoodReceivedDetailsByDate} = action.payload;
      let normalizedGoodsData = normalize(GetGoodReceivedDetailsByDate, goodsListSchema);
      state.goodsin = normalizedGoodsData.entities.goodsin
      
    }
  }
})

export const {
  getAllGoodsInSucess
} = goodsin.actions;

export default goodsin.reducer;