import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import wishlistService from '@services/wishlistService';
import { SUCCESS_MESSAGES } from '@utils/constants';
import toast from 'react-hot-toast';

const initialState = {
  wishlist: null,
  loading: false,
  error: null,
};

// Get wishlist
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.getWishlist();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Toggle wishlist
export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistService.toggleWishlist(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistService.removeFromWishlist(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Clear wishlist
export const clearWishlist = createAsyncThunk(
  'wishlist/clearWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.clearWishlist();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Toggle Wishlist
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
        toast.success(action.payload.message);
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
        toast.success(SUCCESS_MESSAGES.REMOVED_FROM_WISHLIST);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Clear Wishlist
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload.data;
        toast.success('Wishlist cleared');
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;