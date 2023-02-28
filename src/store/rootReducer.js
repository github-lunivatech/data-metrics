import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import consumptionSlice from './slices/consumptionSlice';
import goodsInSlice from './slices/goodsInSlice';
import goodsOutSlice from './slices/goodsOutSlice';
import itemRatioSlice from './slices/itemRatioSlice';
import itemSourceSlice from './slices/itemSourceSlice';
import locationSlice from './slices/locationSlice';
import manufactureSlice from './slices/manufactureSlice';
import newItemSlice from './slices/newItemSlice';
import printSlice from './slices/printSlice';
import rackSlice from './slices/rackSlice';
import reagentSlice from './slices/reagentSlice';
import sdControlSlice from './slices/sdControlSlice';
import typeSlice from './slices/typeSlice';
import unitSlice from './slices/unitSlice';
import userSlice from './slices/userSlice';
import wastageSlice from './slices/wastageSlice';

const rootReducer = combineReducers({
    category: categorySlice,
    goodsin: goodsInSlice,
    goodsout: goodsOutSlice,
    itemRatio: itemRatioSlice,
    locations: locationSlice,
    newItem: newItemSlice,
    itemTypes: typeSlice,
    racks: rackSlice,
    units: unitSlice,
    user: userSlice,
    wastage: wastageSlice,
    consumption: consumptionSlice,
    printdata: printSlice,
    reagent: reagentSlice,
    manu: manufactureSlice,
    testcontrol: sdControlSlice,
    itemSource: itemSourceSlice,
})

export default rootReducer