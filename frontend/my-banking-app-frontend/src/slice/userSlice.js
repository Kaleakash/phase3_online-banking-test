import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import SERVICE_IP from '../IpFile';
const userState = {
  updateState: false,
  loading: false,
  user: {},
  error: "",
  response: "",
};

export const loginSignIn = createAsyncThunk(
  "login/signIn",
  async (login) => {
 
    const response = await axios.post(`${SERVICE_IP}/api/signin_account/`,login);
    console.log(response.data)
    return response.data;
  }
);




const userSlice = createSlice({
  name: "bank",
  initialState: userState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSignIn.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginSignIn.rejected, (state, action) => {
        state.error = action.error.message;
      });



  },
});

export default userSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } = userSlice.actions;
