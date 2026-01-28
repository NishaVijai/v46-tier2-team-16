import axios from 'axios';

const TASTY_RAPID_API_URL = import.meta.env.VITE_TASTY_RAPID_API_URL;
const TASTY_RAPID_API_KEY = import.meta.env.VITE_TASTY_RAPID_API_KEY;
const TASTY_RAPID_API_HOST = import.meta.env.VITE_TASTY_RAPID_API_HOST;
const TASTY_RAPID_API_URL_SIMILARITIES =
  import.meta.env.VITE_TASTY_RAPID_API_URL_SIMILARITIES;
const TASTY_RAPID_API_URL_MORE_INFO =
  import.meta.env.VITE_TASTY_RAPID_API_URL_MORE_INFO;

/* -----------------------------
   Fetch ALL recipes
----------------------------- */
const fetchAll = async () => {
  if (!TASTY_RAPID_API_URL) {
    console.error('❌ Missing TASTY_RAPID_API_URL');
    return [];
  }

  try {
    const response = await axios.get(TASTY_RAPID_API_URL, {
      params: {
        from: '0',
        size: '20',
        tags: 'under_30_minutes',
      },
      headers: {
        'X-RapidAPI-Key': TASTY_RAPID_API_KEY,
        'X-RapidAPI-Host': TASTY_RAPID_API_HOST,
      },
    });

    return Array.isArray(response?.data?.results)
      ? response.data.results
      : [];
  } catch (error) {
    console.error('fetchAll error:', error?.message || error);
    return [];
  }
};

/* -----------------------------
   Fetch ONE recipe by ID
----------------------------- */
const fetchOne = async (id) => {
  if (!id) {
    console.warn('⚠️ fetchOne called without id');
    return {};
  }

  if (!TASTY_RAPID_API_URL_MORE_INFO) {
    console.error('❌ Missing TASTY_RAPID_API_URL_MORE_INFO');
    return {};
  }

  try {
    const response = await axios.get(TASTY_RAPID_API_URL_MORE_INFO, {
      params: { id: String(id) }, // ensure string
      headers: {
        'X-RapidAPI-Key': TASTY_RAPID_API_KEY,
        'X-RapidAPI-Host': TASTY_RAPID_API_HOST,
      },
    });

    return response?.data && typeof response.data === 'object'
      ? response.data
      : {};
  } catch (error) {
    console.error(`fetchOne error for ID ${id}:`, error?.message || error);
    return {};
  }
};

/* -----------------------------
   Fetch RELATED recipes
----------------------------- */
const fetchRelated = async (id) => {
  if (!id) {
    console.warn('⚠️ fetchRelated called without id');
    return [];
  }

  if (!TASTY_RAPID_API_URL_SIMILARITIES) {
    console.error('❌ Missing TASTY_RAPID_API_URL_SIMILARITIES');
    return [];
  }

  try {
    const response = await axios.get(
      TASTY_RAPID_API_URL_SIMILARITIES,
      {
        params: { recipe_id: String(id) },
        headers: {
          'X-RapidAPI-Key': TASTY_RAPID_API_KEY,
          'X-RapidAPI-Host': TASTY_RAPID_API_HOST,
        },
      }
    );

    return Array.isArray(response?.data?.results)
      ? response.data.results
      : [];
  } catch (error) {
    console.error(
      `fetchRelated error for ID ${id}:`,
      error?.message || error
    );
    return [];
  }
};

export { fetchAll, fetchOne, fetchRelated };
