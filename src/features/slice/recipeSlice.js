import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAll, fetchOne, fetchRelated } from '../apiCalls/APIcalls';

// Initial state
const initialState = {
  loading: false,
  recipes: [],          // array of all recipes
  selectedRecipe: {},   // single recipe details for quick view
  relatedRecipes: [],   // related recipes for selected recipe
  error: '',            // error messages
};

// ----------------------
// Async Thunks
// ----------------------

// Fetch all recipes
export const fetchRecipes = createAsyncThunk(
  'recipe/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchAll();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(error?.message || 'Failed to fetch recipes');
    }
  }
);

// Fetch single recipe for quick view (Home slice version)
// ⚠️ This is separate from recipeSliceById to avoid collisions
export const fetchSelectedRecipe = createAsyncThunk(
  'recipe/fetchSelectedRecipe',
  async (id, { rejectWithValue }) => {
    if (!id) return rejectWithValue('No recipe ID provided');
    try {
      const data = await fetchOne(id);
      return data && typeof data === 'object' ? data : {};
    } catch (error) {
      return rejectWithValue(error?.message || `Failed to fetch recipe with ID ${id}`);
    }
  }
);

// Fetch related recipes
export const fetchRelatedRecipes = createAsyncThunk(
  'recipe/fetchRelatedRecipes',
  async (id, { rejectWithValue }) => {
    if (!id) return rejectWithValue('No recipe ID provided');
    try {
      const data = await fetchRelated(id);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      return rejectWithValue(
        error?.message || `Failed to fetch related recipes for ID ${id}`
      );
    }
  }
);

// ----------------------
// Slice
// ----------------------
const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    clearSelectedRecipe: (state) => {
      state.selectedRecipe = {};
      state.relatedRecipes = [];
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    // ----------------------
    // Fetch all recipes
    // ----------------------
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = action.payload || [];
      state.error = '';
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.recipes = [];
      state.error = action.payload || action.error?.message || 'Failed to fetch recipes';
    });

    // ----------------------
    // Fetch selected recipe (quick view)
    // ----------------------
    builder.addCase(fetchSelectedRecipe.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchSelectedRecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedRecipe = action.payload || {};
      state.error = '';
    });
    builder.addCase(fetchSelectedRecipe.rejected, (state, action) => {
      state.loading = false;
      state.selectedRecipe = {};
      state.error =
        action.payload || action.error?.message || 'Failed to fetch selected recipe';
    });

    // ----------------------
    // Fetch related recipes
    // ----------------------
    builder.addCase(fetchRelatedRecipes.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(fetchRelatedRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.relatedRecipes = action.payload || [];
      state.error = '';
    });
    builder.addCase(fetchRelatedRecipes.rejected, (state, action) => {
      state.loading = false;
      state.relatedRecipes = [];
      state.error =
        action.payload || action.error?.message || 'Failed to fetch related recipes';
    });
  },
});

// Export actions
export const { clearSelectedRecipe } = recipeSlice.actions;

// Export reducer
export default recipeSlice.reducer;
