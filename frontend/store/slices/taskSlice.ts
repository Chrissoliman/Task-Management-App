import { Task } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

interface TaskState {
  tasks: Task[];
  task: Task | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  task: null,
  isLoading: false,
  error: null,
};

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks/all", {withCredentials: true});
      return res.data;
    } catch (error: any) {
      console.log("Error in fetchTasks action: ", error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch completed tasks
export const fetchCompletedTasks = createAsyncThunk(
  "tasks/fetchCompletedTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks/completed", {withCredentials: true});
      return res.data;
    } catch (error: any) {
      console.log("Error in fetchCompletedTasks action: ", error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch incomplete tasks
export const fetchIncompletedTasks = createAsyncThunk(
  "tasks/fetchIncompletedTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks/incompleted", {withCredentials: true});
      return res.data;
    } catch (error: any) {
      console.log("Error in fetchIncompletedTasks action: ", error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Fetch tasks by category
export const fetchCategoryTasks = createAsyncThunk(
  "tasks/fetchCategoryTasks",
  async (category: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/tasks/${category}`, {withCredentials: true});
      return res.data;
    } catch (error: any) {
      console.log("Error in fetchCategoryTasks action: ", error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Add new task
export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task: Omit<Task, "_id" | "completed">, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks/create", task, {withCredentials: true});
      return res.data;
    } catch (error: any) {
      console.log("Error in addTask action: ", error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Edit task
export const editTask = createAsyncThunk(
  "tasks/editTask",
  async ({ id, updatedTask }: { id: string | undefined; updatedTask: Partial<Task> }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/edit/${id}`, updatedTask, {withCredentials: true});
      return res.data;
    } catch (error: any) {
      console.log("Error in editTask action: ", error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {withCredentials: true});
      return id;
    } catch (error: any) {
      console.log("Error in deleteTask action: ", error.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Complete/Incomplete task
export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleTaskCompletion",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/tasks/complete/${id}`, {withCredentials: true});
      return res.data;
    } catch (error: any) {
      console.log("Error in toggleTaskCompletion action: ", error.message);
      return rejectWithValue(error.response.data.message);
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
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCompletedTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompletedTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchCompletedTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchIncompletedTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIncompletedTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchIncompletedTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategoryTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchCategoryTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
