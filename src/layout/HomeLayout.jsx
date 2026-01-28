import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styles from "./HomeLayout.module.css";
import { useGlobalContext } from '../contexts/DarkModeContext';

const HomeLayout = () => {
  const { isDarkTheme } = useGlobalContext();

  return (
    <>
      <Header />
      <main
        className={`${styles.main} ${isDarkTheme ? styles['dark-theme'] : styles['light-theme']
          }`}
      >
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomeLayout;
