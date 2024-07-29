import styles from './ResponsiveNavBar.module.css';
import navStyles from '../../NavBar/User/NavBar.module.css';

const hamburger = () => {
  const hamburgerElement = document.querySelector(`.${styles.hamburger}`);
  const layoutElement = document.querySelector(`.${navStyles.layout}`);

  if (hamburgerElement && layoutElement) {
    hamburgerElement.addEventListener('click', () => {
      layoutElement.classList.toggle(`${navStyles.open}`);
    });
  } else {
    console.error('Element not found:', { hamburgerElement, layoutElement });
  }
};

export default hamburger;
