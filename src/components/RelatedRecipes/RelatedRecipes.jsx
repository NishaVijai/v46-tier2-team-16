import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { fetchRelatedRecipes } from '../../features/slice/recipeSlice';
import { useGlobalContext } from '../../contexts/DarkModeContext';
import styles from './RelatedRecipes.module.css';

const RelatedRecipes = ({ recipeId }) => {
  const dispatch = useDispatch();
  const { isDarkTheme } = useGlobalContext();

  const relatedRecipes = useSelector(
    (state) => state.recipe.relatedRecipes
  );

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRelatedRecipes(recipeId));
    }
  }, [dispatch, recipeId]);

  if (!Array.isArray(relatedRecipes) || relatedRecipes.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Related Recipes</h3>

      <ul className={styles.list}>
        {relatedRecipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipe/${recipe.id}`}>
            <li
              className={`${styles.recipe} ${isDarkTheme ? styles['dark-recipe'] : ''
                }`}
            >
              <img
                className={styles.image}
                src={recipe.thumbnail_url || '/placeholder.jpg'}
                alt={recipe.name || 'Recipe'}
              />
              <p
                className={`${styles.recipeName} ${isDarkTheme ? styles['dark-recipeName'] : ''
                  }`}
              >
                {recipe.name || 'Unnamed Recipe'}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  );
};

RelatedRecipes.propTypes = {
  recipeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default RelatedRecipes;
