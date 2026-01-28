import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';
import { useGlobalContext } from '../../contexts/DarkModeContext';

const RecipeCard = ({ oneRecipe }) => {
  const { isDarkTheme } = useGlobalContext();

  // Return null if no valid recipe is provided
  if (!oneRecipe || Object.keys(oneRecipe).length === 0) return null;

  const { id, name, thumbnail_url } = oneRecipe;

  return (
    <div className={`${styles.container} ${isDarkTheme ? styles['dark-theme'] : ''}`}>
      <figure className={styles.figure}>
        <img
          src={thumbnail_url || '/placeholder.jpg'}
          alt={name || 'Recipe'}
          className={styles.image}
        />
      </figure>
      <div className={styles.cardContent}>
        <h3 className={`${styles.name} ${isDarkTheme ? styles['dark-name'] : ''}`}>
          {name || 'Unnamed Recipe'}
        </h3>
        <div className={styles.btnCtn}>
          <Link
            to={id ? `/recipe/${id}` : '#'}
            className={`${styles.btn} ${isDarkTheme ? styles['dark-btn'] : ''}`}
          >
            Get Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
RecipeCard.propTypes = {
  oneRecipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    thumbnail_url: PropTypes.string,
  }),
};

// Default props
RecipeCard.defaultProps = {
  oneRecipe: {},
};

export default RecipeCard;
