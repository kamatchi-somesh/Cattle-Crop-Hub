import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSlideReducer from "./productSlide";
import orderSlideReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    user : userSliceReducer,
    product : productSlideReducer,
    order: orderSlideReducer,
  },
});