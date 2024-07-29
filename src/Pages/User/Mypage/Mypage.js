import styles from "./Mypage.module.css";
import route from "/src/Router/Router";
import fetchUserData from "./FetchUserData";

const renderUserMypage = (container) => {
  container.innerHTML = `
  <h1>마이페이지</h1>
  <div class="${styles.page__header}">
    <h2>내정보</h2>
    <button id="editButton" data-color="positive" data-shape="block">정보 수정</button>
  </div>
  <div class="${styles.page__body}">
    <div class="page__body-img">
      <img class="${styles.page__bodyProfile}" data-m-img alt="profileimg">
    </div>
    <div class="${styles.info}">
      <div class="${styles.info__first}">
        <h2 data-m-name class="${styles.info__name}"></h2> 
        <h4 data-m-position class="${styles.info__position}"></h4>
      </div>
      <div class="${styles.info__second}">
        <div class="${styles.section1}">
          <img src="/public/icons/email.svg" alt="email">
          <h4 data-m-email class="${styles.email}"></h4>
        </div>
        <div class="${styles.section2}">
          <img src="/public/icons/call.svg" alt="call">
          <h4 data-m-phone class="${styles.phone}"></h4>
        </div>
      </div>
  </div>
  `;
  fetchUserData(); //사용자에 따라 다른 정보 랜더링

  document.getElementById("editButton").addEventListener("click", () => {
    history.pushState(null, null, "/user/mypage/editpage");
    route();
  });
};

export default renderUserMypage;
