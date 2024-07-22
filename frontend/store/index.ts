import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/store/slices/authSlice'
import taskReducer from '@/store/slices/taskSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: taskReducer
    }
})