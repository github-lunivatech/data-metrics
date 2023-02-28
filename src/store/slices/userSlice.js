import { createSlice } from '@reduxjs/toolkit';

// const userEntity = new schema.Entity('user', {}, {
//   idAttribute: 'UId'
// })
// const userListSchema = new schema.Array(userEntity);


const initialState = {
  users: {},
  allUserIds: []
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAllUsersSuccess: (state, action) => {
      const { UserDetails } = action.payload;
      let normalizedUserData = UserDetails;
      state.allUserIds = normalizedUserData?.result;
      state.users = normalizedUserData?.entities?.user
    },
    getSingleUserSuccess: (state, action) => {
      const { UserDetails } = action.payload;
      state.users[UserDetails[0]?.UId] = UserDetails[0]
    }
  }
})

export const {
  getAllUsersSuccess,
  getSingleUserSuccess
} = user.actions;

export default user.reducer;