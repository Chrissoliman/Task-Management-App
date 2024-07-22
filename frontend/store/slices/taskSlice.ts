import { Task } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface TaskState {
  task: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  task: [],
  isLoading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks/all");

      return res.data;
    } catch (error: any) {
      console.log("Error in fetchTasks action: ", error.message);
      return rejectWithValue(error.res.data.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "_id">, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks/create",
        task
      );

      return res.data;
    } catch (error: any) {
      console.log("Error in addTask action: ", error.message);
      return rejectWithValue(error.res.data.message);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
          state.isLoading = false;
          state.task = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      }).addCase(addTask.fulfilled, (state, action) => {
        state.task.push(action.payload)
      })
  },
});

export default taskSlice.reducer
