import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '@services/productService';
import toast from 'react-hot-toast';

const initialState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  relatedProducts: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,
  filters: {
    search: '',
    category: '',
    artist: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
  },
};

// Get all products
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await productService.getProducts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get featured products
export const fetchFeaturedProducts = createAsyncThunk(
  'product/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.getFeaturedProducts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get product by slug
export const fetchProductBySlug = createAsyncThunk(
  'product/fetchProductBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await productService.getProductBySlug(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get related products
export const fetchRelatedProducts = createAsyncThunk(
  'product/fetchRelatedProducts',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await productService.getRelatedProducts(productId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add review
export const addProductReview = createAsyncThunk(
  'product/addReview',
  async ({ productId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await productService.addReview(productId, reviewData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
      state.relatedProducts = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Fetch Featured Products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = action.payload.data;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Product by Slug
      .addCase(fetchProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.data;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      // Fetch Related Products
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload.data;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Review
      .addCase(addProductReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductReview.fulfilled, (state) => {
        state.loading = false;
        toast.success('Review added successfully');
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setFilters, clearFilters, clearCurrentProduct, clearError } =
  productSlice.actions;
export default productSlice.reducer;