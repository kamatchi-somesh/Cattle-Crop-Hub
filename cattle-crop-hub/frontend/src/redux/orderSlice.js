// ordersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  orders: [],
  status: "idle", // or "loading", "succeeded", "failed"
  error: null,
};

// Define the async thunk for fetching orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (userId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/orders`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const data = await response.json();
    return data.orders;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Create a slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
