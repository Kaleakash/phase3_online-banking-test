import { configureStore } from "@reduxjs/toolkit";
import userSlice from '../slice/userSlice';

import customerSlice from "../slice/customerSlice";


const store = configureStore({
  reducer: {
    userKey: userSlice,
    customerKey:customerSlice
  },
});

export default store;