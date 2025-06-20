// src/redux/applicationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    applicants: {
      applications: [] // fallback to avoid errors on first render
    }
  },
  reducers: {
    setAllApplicants: (state, action) => {
      // Save the full job object including applications
      state.applicants = action.payload || { applications: [] };
    }
  }
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
