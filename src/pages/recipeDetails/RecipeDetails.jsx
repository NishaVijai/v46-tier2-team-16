import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RecipeItem from '../../components/recipeItem/RecipeItem';
import RelatedRecipes from '../../components/RelatedRecipes/RelatedRecipes';
import { Loader } from '../../components/Loader';
import { TopBtn } from '../../components/TopBtn';

import {
  fetchRecipeById,
  clearRecipeById,
} from '../../features/slice/recipeSliceById';

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { recipeById, loading, error } = useSelector(
    (state) => state.recipeById
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRecipeById(id));
    }

    return () => {
      dispatch(clearRecipeById());
    };
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (error) return <p style={{ textAlign: 'center' }}>{error}</p>;
  if (!recipeById) return null;

  return (
    <>
      <RecipeItem selectedRecipe={recipeById} />
      <RelatedRecipes recipeId={id} />
      <TopBtn />
    </>
  );
};

export default RecipeDetails;
