import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOne } from '../apiCalls/APIcalls';

// Initial state: recipeById is null until data is fetched
const initialState = {
  loading: false,
  recipeById: null, // null = not fetched yet
  error: '',
};

// ✅ UNIQUE thunk name (NO collision with recipeSlice)
export const fetchRecipeById = createAsyncThunk(
  'recipeById/fetchRecipeById',
  async (id, { rejectWithValue }) => {
    if (!id) {
      return rejectWithValue('No recipe ID provided');
    }

    try {
      const data = await fetchOne(id);

      // 🔒 Always return a plain object
      if (data && typeof data === 'object') {
        return data;
      }

      return {};
    } catch (error) {
      return rejectWithValue(
        error?.message || `Failed to fetch recipe with ID ${id}`
      );
    }
  }
);

const recipeSliceById = createSlice({
  name: 'recipeById',
  initialState,
  reducers: {
    clearRecipeById: (state) => {
      state.recipeById = null;
      state.loading = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = '';
      })

      // Fulfilled
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeById = action.payload || {};
        state.error = '';
      })

      // Rejected
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.recipeById = null;
        state.error =
          action.payload ||
          action.error?.message ||
          'Failed to fetch recipe';
      });
  },
});

// Export actions
export const { clearRecipeById } = recipeSliceById.actions;

// Export reducer
export default recipeSliceById.reducer;
