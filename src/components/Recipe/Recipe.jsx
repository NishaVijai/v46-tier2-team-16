import PropTypes from 'prop-types';
import { RecipeCard } from '../../components/RecipeCard';
import { useGlobalContext } from '../../contexts/DarkModeContext';
import styles from './Recipe.module.css';

const Recipe = ({ recipesToDisplay }) => {
  const { isDarkTheme } = useGlobalContext();

  const listToDisplay = Array.isArray(recipesToDisplay)
    ? recipesToDisplay
    : [];

  if (listToDisplay.length === 0) {
    return (
      <section
        className={`${styles.section} ${isDarkTheme ? styles['dark-theme'] : ''
          }`}
      >
        <p
          className={`${styles.noRecipe} ${isDarkTheme ? styles['dark-noRecipe'] : ''
            }`}
        >
          Sorry, no recipe to satisfy your papilles!
        </p>
      </section>
    );
  }

  return (
    <section
      className={`${styles.section} ${isDarkTheme ? styles['dark-theme'] : ''
        }`}
    >
      <div
        className={`${styles.container} ${isDarkTheme ? styles['dark-theme'] : ''
          }`}
      >
        {listToDisplay.map((oneRecipe) => (
          <RecipeCard
            key={oneRecipe.id ?? oneRecipe.slug}
            oneRecipe={oneRecipe}
          />
        ))}
      </div>
    </section>
  );
};

/* --------------------------------
   PropTypes
--------------------------------- */

const recipeShape = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  slug: PropTypes.string,
  thumbnail_url: PropTypes.string,
  total_time_tier: PropTypes.shape({
    display_tier: PropTypes.string,
  }),
});

Recipe.propTypes = {
  recipesToDisplay: PropTypes.arrayOf(recipeShape),
};

Recipe.defaultProps = {
  recipesToDisplay: [],
};

export default Recipe;
