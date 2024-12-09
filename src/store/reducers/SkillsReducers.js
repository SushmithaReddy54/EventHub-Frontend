import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSkills: undefined,
};

export const skillsSlice = createSlice({
  name: "skills",
  initialState: { value: initialState },
  reducers: {
    saveAllSkills: (state, action) => {
      state.value.allSkills = action.payload.data;
    },

    clearAllSkills: (state, action) => {
      state.value.allSkills = undefined;
      localStorage.clear();
    },
  },
});

export const { saveAllSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
