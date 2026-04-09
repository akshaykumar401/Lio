import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  userData: {};
  loading: boolean;
  error: string | null;
} = {
  userData: {},
  loading: false,
  error: null,
};

// Login async thunk
export const login: any = createAsyncThunk('login', async (data: { email: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/signin', data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
})

// Signup async thunk
export const signup: any = createAsyncThunk('signup', async (data: { fullname: string, email: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/signup', data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
})

// Logout async thunk
export const logout: any = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/logout', {
      withCredentials: true
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
})

// User slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logedUser: (state, action) => {
      state.userData = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Signup
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { logedUser } = userSlice.actions;
export default userSlice.reducer;



