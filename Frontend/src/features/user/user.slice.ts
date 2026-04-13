import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

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
    const err = error as AxiosError;
    return rejectWithValue(err.response?.statusText ?? 'Login failed');
  }
})

// Signup async thunk
export const signup: any = createAsyncThunk('signup', async (data: { fullname: string, email: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/signup', data);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.statusText ?? 'Signup failed');
  }
})

// Logout async thunk
export const logout: any = createAsyncThunk('logout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/logout', {
      withCredentials: true
    });
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.statusText ?? 'Logout failed');
  }
})

// Send OTP async thunk
export const sendOTP: any = createAsyncThunk('sendOTP', async (data: { email: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/send-otp', data);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.statusText ?? 'Failed to send OTP');
  }
});

// Verify OTP async thunk
export const verifyOTP: any = createAsyncThunk('verifyOTP', async (data: { email: string, otp: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/users/verify-otp', data);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.statusText ?? 'OTP verification failed');
  }
});

// Reset Password async thunk
export const resetPassword: any = createAsyncThunk('resetPassword', async (data: { email: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.patch('/api/users/reset-password', data);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.statusText ?? 'Password reset failed');
  }
});

// Getting User Profile async thunk
export const getUserProfile: any = createAsyncThunk('getUserProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/users/current-user', {
      withCredentials: true
    });
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.response?.statusText ?? 'Failed to get profile');
  }
});


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

    // Send OTP
    builder.addCase(sendOTP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendOTP.fulfilled, (state) => {
      state.loading = false;
      state.userData = {};
    });
    builder.addCase(sendOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Verify OTP
    builder.addCase(verifyOTP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyOTP.fulfilled, (state) => {
      state.loading = false;
      state.userData = {};
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.loading = false;
      state.userData = {};
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Get User Profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

export const { logedUser } = userSlice.actions;
export default userSlice.reducer;



