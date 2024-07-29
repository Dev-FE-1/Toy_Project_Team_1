import styles from "../Admin/ResponsiveNavBar.module.css";
import hamburger from "./Hamburger";

const renderResponsiveNavBar = (container) => {
  container.innerHTML = `
          <div class=${styles["responsive-nav__container"]}>
            <a href="/admin/dashboard" class=${styles.logo}>
                <img src="/public/images/company_logo_admin.png" />
            </a>
            <button class=${styles.hamburger}>&#9776;</button>
          </div>
            `;
  hamburger();
};
export default renderResponsiveNavBar;
