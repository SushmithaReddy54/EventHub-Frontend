import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  venues: [
    { venueId: "1", venueName: "College" },
    { venueId: "2", venueName: "Library" },
    { venueId: "3", venueName: "Auditorium" },
    { venueId: "4", venueName: "Online" },
    { venueId: "5", venueName: "Zoom Meeting" },
  ],
  allUser: [],
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: { value: initialState },
  reducers: {
    saveVenues: (state, action) => {
      state.value.venues = action.payload.data;
    },
    saveAllUsers: (state, action) => {
      state.value.allUsers = action.payload.data;
    },
    clearAdminAll: (state, action) => {
      state.value.allUsers = {};
      localStorage.clear();
    },
  },
});

export const { saveVenues, saveAllUsers } = adminSlice.actions;
export default adminSlice.reducer;
