import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import SERVICE_IP from '../IpFile';
const customerState = {
  updateState: false,
  loading: false,
  customerList:[],
  customer:{},
  error: "",
  response: "",
  depositeInfo:[],
  withdrawnInfo:[],
  transferInfo:[],
  bankList:[]
};
export const customerSignUp = createAsyncThunk(
  "customer/signUp",
  async (customer) => {
    const response = await axios.post(`${SERVICE_IP}/api/create_account/`,customer);
    console.log(response);
    return response.data;
  }
);

export const findBankDetails = createAsyncThunk(
  "customer/bankDetails",
  async (customer) => {
    console.log(customer);
    const response = await axios.get(`${SERVICE_IP}/api/banks`);
    console.log(response);
    return response.data;
  }
);


export const findCustomer = createAsyncThunk(
    "customer/findById",
    async (id) => {
      console.log(id)
      const response = await axios.get(`${SERVICE_IP}/api/account/${id}`);
      console.log(response.data);
      return response.data;
    }
);

export const changeCustomerPassword = createAsyncThunk(
  "customer/changePassword",
  async (customer) => {
    const response = await axios.put(`${SERVICE_IP}/api/customer/changePassword/`,customer);
    console.log(response.data);
    return response.data;
  }
);

export const withDrawAmount = createAsyncThunk(
    "customer/withdraw",
    async (account) => {
     
      const response = await axios.post(`${SERVICE_IP}/api/withdrawals/`,account);
      console.log(response.data);
      return response.data;
    }
);

export const depositeAmount = createAsyncThunk(
    "customer/deposite",
    async (account) => {
      const response = await axios.post(`${SERVICE_IP}/api/deposits/`,account);
      console.log(response.data);
      return response.data;
    }
);

export const findAllCustomer = createAsyncThunk(
  "customer/findAll",
  async (id) => {
    const response = await axios.get(`${SERVICE_IP}/api/account/`+id);
    console.log(response.data);
    return response.data;
  }
);


export const transferAmount = createAsyncThunk(
  "customer/transfer",
  async (account) => {
    const response = await axios.post(`${SERVICE_IP}/api/transfer_amount/`,account);
    console.log(response.data);
    return response.data;
  }
);

export const bankService = createAsyncThunk(
  "customer/service",
  async (service) => {
   
    const response = await axios.post(`${SERVICE_IP}/api/customer_request/`,service);
    console.log(response.data);
    return response.data;
  }
)


export const viewDeposit = createAsyncThunk(
  "customer/viewDeposit",
  async () => {
    const response = await axios.get(`${SERVICE_IP}/api/deposits`);
    console.log(response.data);
    return response.data;
  }
);


export const viewWithdrawn = createAsyncThunk(
  "customer/viewWithdrawn",
  async () => {
   
    const response = await axios.get(`${SERVICE_IP}/api/withdrawals/`);
    console.log(response.data);
    return response.data;
  }
);

export const viewTransfer = createAsyncThunk(
  "customer/viewTransfer",
  async () => {
   
    const response = await axios.get(`${SERVICE_IP}/api/transfer_amount/`);
    console.log(response.data);
    return response.data;
  }
);


const customerSlice = createSlice({
  name: "customer",
  initialState: customerState,
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
      .addCase(customerSignUp.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(customerSignUp.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(bankService.fulfilled, (state, action) => {
        //state.userList = action.payload;
        state.loading = false;
      })
      .addCase(bankService.rejected, (state, action) => {
        state.error = action.error.message;
      });


      builder
      .addCase(findCustomer.fulfilled, (state, action) => {
        state.loading = false;
        //state.userList.push(action.payload);
        state.customer=action.payload;
        state.response = "added";
      })
      .addCase(findCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(transferAmount.fulfilled, (state, action) => {
        state.loading = false;
        //state.userList.push(action.payload);
        state.customer=action.payload;
        state.response = "transfered successfully";
      })
      .addCase(transferAmount.rejected, (state, action) => {
        state.error = action.error.message;
      });


      builder
      .addCase(findAllCustomer.fulfilled, (state, action) => {
        console.log("in builder")
        state.customerList = action.payload;
        state.loading=true;
        console.log(state.customerList)
      })
      .addCase(findAllCustomer.rejected, (state, action) => {
        state.error = action.error.message;
      });


      builder
      .addCase(findBankDetails.fulfilled, (state, action) => {
        console.log("in builder")
        state.bankList = action.payload;
        state.loading=true;
        console.log(state.customerList)
      })
      .addCase(findBankDetails.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(viewDeposit.fulfilled, (state, action) => {
        console.log("in builder")
        state.depositeInfo = action.payload;
        state.loading=true;
        console.log(state.depositeInfo)
      })
      .addCase(viewDeposit.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(viewWithdrawn.fulfilled, (state, action) => {
        console.log("in builder")
        state.withdrawnInfo = action.payload;
        state.loading=true;
        console.log(state.withdrawnInfo)
      })
      .addCase(viewWithdrawn.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(viewTransfer.fulfilled, (state, action) => {
        console.log("in builder")
        state.transferInfo = action.payload;
        state.loading=true;
        console.log( state.transferInfo)
      })
      .addCase(viewTransfer.rejected, (state, action) => {
        state.error = action.error.message;
      });



      builder
      .addCase(withDrawAmount.fulfilled, (state, action) => {
        state.loading = false;
        //state.userList.push(action.payload);
        state.response = "added";
      })
      .addCase(withDrawAmount.rejected, (state, action) => {
        state.error = action.error.message;
      });

      builder
      .addCase(depositeAmount.fulfilled, (state, action) => {
        state.loading = false;
        //state.userList.push(action.payload);
        state.response = "added";
      })
      .addCase(depositeAmount.rejected, (state, action) => {
        state.error = action.error.message;
      });

   
  },
});

export default customerSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } = customerSlice.actions;
