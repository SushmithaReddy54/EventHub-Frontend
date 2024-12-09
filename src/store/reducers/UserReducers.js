import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserAuthenticated: false,
  user: {},
  searchedUser: {},
  changePassword: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialState },
  reducers: {
    saveUser: (state, action) => {
      state.value.isUserAuthenticated =
        action.payload.status === 200 ? true : false;
      state.value.user = action.payload.data;
      localStorage.setItem(
        "sessionid",
        JSON.stringify(state?.value?.user?.session?.sessionId)
      );
    },
    doLogout: (state, action) => {
      state.value.isUserAuthenticated = false;
      state.value.user = {};
      localStorage.clear();
    },
    saveSearchedUser: (state, action) => {
      state.value.searchedUser = action.payload.data;
    },
    updateRegisteredWorkshops: (state, action) => {
      state.value.user.registeredMeetings = action.payload.data;
    },
    deleteEnrolledWorkshop: (state, action) => {
      const updatedWorkshops = state.value.user.registeredMeetings.filter(
        (workshop) => workshop.workshopId !== action.payload
      );
      state.value.user.registeredMeetings = updatedWorkshops;
    },
  },
});

export const {
  saveUser,
  doLogout,
  deleteEnrolledWorkshop,
  saveSearchedUser,
  updateRegisteredWorkshops,
} = userSlice.actions;
export default userSlice.reducer;
