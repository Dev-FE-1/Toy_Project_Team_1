import route from "/src/Router/Router";
import styles from "./Mileage.module.css";
import fetchMileageData from "./FetchMileageData";
import renderModal from "../../../Components/Modal/RenderModal";
import {
  showMileageStandardContent,
  showMileageApproveContent,
} from "./Modal/ModalContent";
import handleMileageSubmit from "/src/Pages/User/Mileage/HandleMileageSubmit";

const renderUserMileage = (container) => {
  container.innerHTML = `
      <div class="${styles["mileage-contents"]}">
        <h1 class="${styles.title}">마일리지</h1>
        <div class="${styles["mileage-score"]}">
          <div class="${styles["mileage-score__left"]}">
            <div class="${styles["mileage-icon"]}" id="total-mileage-icon">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L5.24077 18.9999C5.0786 19.912 4.99805 20.907 4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3ZM12.998 5C8.57977 5 4.99805 8.58172 4.99805 13C4.99805 13.3624 5.00125 13.7111 5.00759 14.0459C6.26198 12.0684 8.09902 10.5048 10.5019 9.13176L11.4942 10.8682C8.6393 12.4996 6.74554 14.3535 5.77329 16.9998L8.99805 17C15.0132 17 18.8692 13.0269 18.9949 5.38766C17.6229 5.52113 16.3481 5.436 14.7754 5.20009C13.6243 5.02742 13.3988 5 12.998 5Z"
                ></path>
              </svg>
            </span>
            </div>
            <div class="${styles["mileage-score__detail"]}">
              <h3 class="${styles["mileage-score__total-score"]}">총 <span id="total-mileage-score">100</span> 마일리지</h3>
              <h4 class="${styles["mileage-score__message"]}" >
                <span id="total-mileage-text">새싹단계에요. 조금만 더 힘내보세요 :)</span>
              </h4>
            </div>
          </div>
          <h4
            class="${styles["mileage-score__right"]} open-modal"
            data-modal-target="#modal-mileage_1"
          >
            마일리지 기준 알아보기<svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.78112 8.00047L5.48126 4.70062L6.42408 3.75781L10.6667 8.00047L6.42408 12.2431L5.48126 11.3003L8.78112 8.00047Z"
              />
            </svg>
          </h4>
        </div>
        <div class="${styles["mileage-approve"]}">
          <div data-mileage-tabs class="${styles["mileage-approve__tabs"]}">
            <button
              id = "undetermined"
              data-mileage-tab
              class="${styles["mileage-approve__tab"]} ${styles["mileage-approve__tab--undetermined"]}"
            >
              심사중
            </button>
            <button 
              id = "approved"
              data-mileage-tab
              class="${styles["mileage-approve__tab"]} ${styles["mileage-approve__tab--approved"]}">
              승인
            </button>
            <button 
              id = "rejected"
              data-mileage-tab
              class="${styles["mileage-approve__tab"]} ${styles["mileage-approve__tab--rejected"]}">
              반려
            </button>
          </div>
          <div class="${styles["mileage-approve__btns"]}">
            <button
              data-color="positive"
              data-shape="line"
              class="${styles["mileage-approve__save-list"]}"
            >
              마일리지 적립목록
            </button>
            <button
              class="${styles["mileage-approve__request"]} open-modal"
              data-modal-target="#modal-mileage_2"
              data-color="positive"
              data-shape="block"
            >
              마일리지 신청
            </button>
          </div>
        </div>
        <div class="${styles["mileage__filter"]}">
          <select id="filter">
            <option value="latest">최신순</option>
            <option value="old">오래된순</option>
          </select>
          <h6>총 <span id="total-item"></span>개의 게시글</h6>
        </div>
        <div class="${styles["mileage-list"]}" id="mileage-list"></div>
    </div>
  `;

  fetchMileageData(); // 마일리지 리스트 데이터 요청

  // 마일리기 기준 알아보기 모달: modal-1
  renderModal(
    showMileageStandardContent().modal_id, // 모달 번호
    showMileageStandardContent().header, // 모달 헤더
    showMileageStandardContent().content, //모달 내용
    handleMileageSubmit
  );
  // 마일리지 신청 모달: modal-2
  renderModal(
    showMileageApproveContent().modal_id, // 모달 번호
    showMileageApproveContent().header, // 모달 헤더
    showMileageApproveContent().content, //모달 내용
    handleMileageSubmit
  );

  // 마일리지 적립목록 페이지로 라우팅
  document
    .querySelector(`.${styles["mileage-approve__save-list"]}`)
    .addEventListener("click", () => {
      history.pushState(null, null, "/user/mileage/history");
      route();
    });

  const tabs = document.querySelectorAll("[data-mileage-tab]");
  const tabContainer = document.querySelector("[data-mileage-tabs]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // 모든 탭에서 active 클래스 제거
      tabs.forEach((t) => t.classList.remove("active"));

      // 클릭된 탭에 active 클래스 추가
      tab.classList.add("active");

      // 탭 컨테이너의 클래스 업데이트
      tabContainer.classList.remove(
        styles["active-undetermined"],
        styles["active-approved"],
        styles["active-rejected"]
      );
      tabContainer.classList.add(styles[`active-${tab.id}`]);
    });
  });
};

export default renderUserMileage;
