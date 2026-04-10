import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
  urlData: [];
  loading: boolean;
  error: string | null;
} = {
  urlData: [],
  loading: false,
  error: null,
};

// Register URL for logged in users
export const registerURL: any = createAsyncThunk("registerURL", async (data: { longUrl: string, customUrl?: string }, { rejectWithValue }) => {
  try {
    console.log(data)
    const response = await axios.post("/api/urls/generate", { longUrl: data.longUrl, customUrl: data.customUrl }, { withCredentials: true });
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

// Delete URL
export const deleteURL: any = createAsyncThunk("deleteURL", async (id: string, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/api/urls/${id}`, { withCredentials: true });
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

// Redirect URL
export const redirectURL: any = createAsyncThunk("redirectURL", async (urlCode: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/urls/${urlCode}`);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});

// Create URL for Guest users
export const guestURL: any = createAsyncThunk("guestURL", async (data: { longUrl: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/urls/generate-guest", { longUrl: data.longUrl });
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
})

// URL Slice
export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // Register URL for logged in users
    builder.addCase(registerURL.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerURL.fulfilled, (state, action) => {
      state.loading = false;
      state.urlData = action.payload;
    });
    builder.addCase(registerURL.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Delete URL
    builder.addCase(deleteURL.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteURL.fulfilled, (state, action) => {
      state.loading = false;
      state.urlData = action.payload;
    });
    builder.addCase(deleteURL.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Redirect URL
    builder.addCase(redirectURL.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(redirectURL.fulfilled, (state, action) => {
      state.loading = false;
      state.urlData = action.payload;
    });
    builder.addCase(redirectURL.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Guest URL
    builder.addCase(guestURL.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(guestURL.fulfilled, (state, action) => {
      state.loading = false;
      state.urlData = action.payload;
    });
    builder.addCase(guestURL.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
})


export default urlSlice.reducer;
