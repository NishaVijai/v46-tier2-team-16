import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from '../../components/Search';
import { Recipe } from '../../components/Recipe';
import { Loader } from '../../components/Loader';
import { fetchRecipes } from '../../features/slice/recipeSlice';
import { Banner } from '../../components/Banner';
import { TopBtn } from '../../components/TopBtn';

const Home = () => {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => state.recipe);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch all recipes on mount
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterByIngredient(term);
  };

  const filterByIngredient = (term) => {
    if (!term) {
      setFilteredRecipes([]);
      return;
    }

    const searchIngredients = term
      .split(/[\s,;]+/)
      .filter(Boolean)
      .map((item) => item.toLowerCase());

    const results = recipes.filter((recipe) => {
      const recipeIngredients =
        recipe.sections?.flatMap((section) =>
          section.components?.map(
            (component) => component.ingredient?.name?.toLowerCase() || ''
          )
        ) || [];

      return searchIngredients.every((searchIng) =>
        recipeIngredients.some((ing) => ing.includes(searchIng))
      );
    });

    setFilteredRecipes(results);
  };

  const recipesToDisplay = useMemo(() => {
    if (!searchTerm) return recipes;
    return filteredRecipes;
  }, [recipes, searchTerm, filteredRecipes]);

  return (
    <>
      <Banner />
      <Search handleSearch={handleSearch} />

      {loading && <Loader />}

      {!loading && recipesToDisplay.length === 0 && recipes.length > 0 && (
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          Sorry, no recipe to satisfy your papilles!
        </p>
      )}

      {!loading && recipesToDisplay.length > 0 && (
        <Recipe recipesToDisplay={recipesToDisplay} />
      )}

      <TopBtn />
    </>
  );
};

export default Home;
