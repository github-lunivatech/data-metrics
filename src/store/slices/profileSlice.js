import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: undefined,
  authToken: undefined
}

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    storeUserData: (state, action) => {
      state.userData = action.payload
    },
    storeAuthToken: (state, action) => {

    },
    logout: (state, action) => {
      state.userData = undefined;
    }
  }
})

export const {
  storeUserData,
  storeAuthToken,
  logout
} = profile.actions;

export default profile.reducer;
