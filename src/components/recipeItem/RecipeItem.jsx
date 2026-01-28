import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './RecipeItem.module.css';
import { useGlobalContext } from '../../contexts/DarkModeContext';
import { BiBowlHot } from 'react-icons/bi';

const RecipeItem = ({ selectedRecipe }) => {
  const { isDarkTheme } = useGlobalContext();

  // Guard against null or empty object
  if (!selectedRecipe || Object.keys(selectedRecipe).length === 0) {
    return null;
  }

  const {
    id,
    name,
    thumbnail_url,
    original_video_url,
    prep_time_minutes,
    cook_time_minutes,
    num_servings,
    total_time_tier,
    sections = [],
    instructions = [],
    nutrition = {},
  } = selectedRecipe;

  const ingredients = sections.flatMap(
    (section) => section.components ?? []
  );

  return (
    <section
      className={`${styles.containerDetails} ${isDarkTheme ? styles['dark-containerDetails'] : ''
        }`}
    >
      <div key={id} className={styles.insideContainerDetails}>
        <div className={styles.mainCtn} id="top">
          <div className={styles.containerTitle}>
            <h3 className={styles.itemName}>
              {name ?? 'Unnamed Recipe'}
            </h3>
            <p
              className={`${styles.itemCategory} ${isDarkTheme ? styles['dark-itemCategory'] : ''
                }`}
            >
              Category: {total_time_tier?.display_tier ?? 'N/A'}
            </p>
          </div>

          <div className={styles.containerInfo}>
            <span className={styles.insideInfo}>
              <h6 className={styles.itemPrep}>Prep Time:</h6>
              <p className={styles.itemsResult}>
                {prep_time_minutes ?? 'N/A'} minutes
              </p>
            </span>

            <span className={styles.insideInfo}>
              <h6 className={styles.itemCook}>Cook Time:</h6>
              <p className={styles.itemsResult}>
                {cook_time_minutes ?? 'N/A'} minutes
              </p>
            </span>

            <span className={styles.insideInfo}>
              <h6 className={styles.itemServ}>
                <BiBowlHot /> Serves:
              </h6>
              <p className={styles.itemsResult}>
                {num_servings ?? 'N/A'} servings
              </p>
            </span>
          </div>
        </div>

        <div className={styles.secondContainer}>
          <div className={styles.containerIngr}>
            <h4>Ingredients:</h4>
            <ul>
              {ingredients.length > 0 ? (
                ingredients.map((item) => (
                  <li key={item.id ?? item.raw_text}>
                    {item.raw_text ?? 'N/A'}
                  </li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div className={styles.containerDirec}>
            <h4>Directions:</h4>
            <ul>
              {instructions.length > 0 ? (
                instructions.map((step, idx) => (
                  <li key={step.id ?? idx}>
                    {step.position ?? idx + 1}.{' '}
                    {step.display_text ?? 'N/A'}
                  </li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>

          <div className={styles.containerImage}>
            <img
              src={thumbnail_url ?? '/placeholder.jpg'}
              alt={name ?? 'Recipe'}
              className={styles.selectedImage}
            />
          </div>
        </div>

        {/* <div className={styles.facts}>
          {original_video_url && (
            <video controls width="450">
              <source src={original_video_url} type="video/mp4" />
            </video>
          )}

          <table className={styles.table}>
            <tbody>
              {Object.entries(nutrition).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}

        <div className={styles.facts}>
          {original_video_url && (
            <div className={styles.videoWrapper}>
              <video controls className={styles.video}>
                <source src={original_video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          <div className="tableWrapper">
            <table className={styles.table}>
              <tbody>
                {Object.entries(nutrition).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value ?? 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className={`${styles.btn} ${isDarkTheme ? styles['dark-btn'] : ''
          }`}
      >
        Go Back
      </Link>
    </section>
  );
};

RecipeItem.propTypes = {
  selectedRecipe: PropTypes.object,
};

export default RecipeItem;
