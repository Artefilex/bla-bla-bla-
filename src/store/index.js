import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import userReducer from './usersSlice';
const store = configureStore({
reducer:{
    todos:todoReducer,
    user: userReducer,
}
})


export default store 