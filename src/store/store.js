import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from '../features/slice/recipeSlice';
import recipeSliceByIdReducer from '../features/slice/recipeSliceById';

const store = configureStore({
  reducer: {
    recipe: recipeReducer,
    recipeById: recipeSliceByIdReducer,
  },
});

export default store;
