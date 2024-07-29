import styles from "./History.module.css";
import { fetchAndRenderUserApprovedMileage } from "./";

const renderUserMileageHistory = (container) => {
  container.innerHTML = `
    <div class="${styles.contents}">
      <h1 class="${styles.title}">마일리지 > 마일리지 적립목록</h1>
      <h2>마일리지 적립목록</h2>

      <ul class="${styles.details} ${styles.h5}">
        <li class="${styles["details__header"]}">
          <div class="${styles["details__title"]}">제목</div>
          <div class="${styles["details__registration-date"]}">등록일</div>
          <div class="${styles["details__mileage"]}">마일리지</div>
        </li>
      </ul>

      <div id="pagination" class="${styles.pagination}"></div>
    </div>
  `;

  fetchAndRenderUserApprovedMileage();
};

export default renderUserMileageHistory;
