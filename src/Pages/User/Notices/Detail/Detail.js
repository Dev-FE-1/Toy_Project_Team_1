import detailList from "../JS/DetailList.js";
import styles from "../Detail/Detail.module.css";

const renderUserNoticesDetail = (container) => {
  container.innerHTML = `
        <div class="${styles.noticeDetail}">
        <div class="${styles.noticeDetail__btnContainer}">
          <button data-color="neutral" data-shape="line" class="${styles.noticeDetail__backBtn}">뒤로가기</button>
        </div>
        <h2 class="${styles.noticeTitle}"></h2>
          <ul class="${styles.noticeDetail__info}">
            <li class=${styles.noticeDetail__items}>
              <h5>등록일</h5>
              <h5 class="${styles.registrationDate}"></h5>
            </li>
            <li class=${styles.noticeDetail__items}>
              <h5>작성자</h5>
              <h5 class="${styles.writer}"></h5>
            </li>
            <li class=${styles.noticeDetail__items}>
              <h5>조회수</h5>
              <h5 class="${styles.views}"></h5>
            </li>
            <li class=${styles.noticeDetail__items}>
              <h5>첨부파일</h5>
              <div class="${styles.attachedFile}"></div>
            </li>
          </ul>
          <h4 class="${styles.noticeDetail__description}"></h4>
        </div>
  `;
  moveBack();
  detailList();
};

const moveBack = () => {
  const backBtn = document.querySelector(`.${styles.noticeDetail__backBtn}`);
  backBtn.addEventListener("click", () => {
    history.back();
  });
};

export default renderUserNoticesDetail;
