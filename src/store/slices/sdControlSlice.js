import { createSlice } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';

const initialState = {
    testcontrols: {},
    testcontrollist: {},
    testcontrollisttest: {},
    testcontrollistData: {},
    testcontrolSDlistData: {},
}

const testControlEntity = new schema.Entity('testControl', {}, {
    idAttribute: 'SId'
});
const testControlListSchema = new schema.Array(testControlEntity);

const testControlListEntity = new schema.Entity('testControl', {}, {
    idAttribute: 'CId'
});
const testControlTestListSchema = new schema.Array(testControlListEntity);

const testControlListTestEntity = new schema.Entity('testControl', {}, {
    idAttribute: 'TId'
});
const testControlTestListTestSchema = new schema.Array(testControlListTestEntity);

const testControlDataEntity = new schema.Entity('testControl', {}, {
    idAttribute: 'QId'
});
const testControlTestDataSchema = new schema.Array(testControlDataEntity);

const testControlSDListEntity = new schema.Entity('testControl', {}, {
    idAttribute: 'CId'
});
const testControlSDTestListSchema = new schema.Array(testControlSDListEntity);

const testControl = createSlice({
    name: 'testControl',
    initialState,
    reducers: {
        getAlltestcontrolsuccess: (state, action) => {
            const { GetListOfControlWiseSD } = action.payload;
            let normalizedtestControlData = normalize(GetListOfControlWiseSD, testControlListSchema)
            state.testcontrols = normalizedtestControlData.entities.testControl
        },
        getAlltestcontrolListsuccess: (state, action) => {
            const { GetControlDetails } = action.payload;
            let normalizedtestControlData = normalize(GetControlDetails, testControlTestListSchema)
            state.testcontrollist = normalizedtestControlData.entities.testControl
        },
        getAlltestcontroltestListsuccess: (state, action) => {
            const { GetControlTestList } = action.payload;
            let normalizedtestControlData = normalize(GetControlTestList, testControlTestListTestSchema)
            state.testcontrollisttest = normalizedtestControlData.entities.testControl
        },
        getAlltestcontrolDatasuccess: (state, action) => {
            const { GetControlValueByControlTestId } = action.payload;
            let normalizedtestControlData = normalize(GetControlValueByControlTestId, testControlTestDataSchema)
            state.testcontrollistData = normalizedtestControlData.entities.testControl
        },
        getAllSDtestcontrolDatasuccess: (state, action) => {
            const { GetControlWiseSDMeanCV } = action.payload;
            let normalizedtestControlData = normalize(GetControlWiseSDMeanCV, testControlSDTestListSchema)
            state.testcontrolSDlistData = normalizedtestControlData.entities.testControl
        }
    }
})

export const {
    getAlltestcontrolsuccess,
    getAlltestcontrolListsuccess,
    getAlltestcontroltestListsuccess,
    getAlltestcontrolDatasuccess,
    getAllSDtestcontrolDatasuccess
} = testControl.actions;

export default testControl.reducer;