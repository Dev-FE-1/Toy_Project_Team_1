import styles from "./Dashboard.module.css";
import approvalData from "./JS/ApprovalData";
import noticesData from "./JS/NoticeData";
import mileageData from "./JS/MileageData";
import fetchUserData from "/src/Pages/User/Mypage/FetchUserData";
import { getTodayDate } from "/src/Pages/User/Dashboard/JS/CurrentDate";

const renderAdminDashboard = (container) => {
  if (!container) {
    console.error("container element not found");
    return;
  }
  container.innerHTML = `
  <div class="${styles.contents}">
      <h1 class="${styles.title}">대시보드</h1>
      <div class="${styles.adminDashboard}">
        <div class="${styles.adminDashboard__profileCard} ${styles.card}">
          <div class="${styles.profileImg}">
              <img data-m-img alt="profileimg" />
          </div>
          <div class="${styles.info}">
          <h2>Welcome Back,</h2>
          <div class="${styles.infoFirst}">
            <h2 data-m-name class="${styles.infoFirst__name}"></h2>
            <h4 data-m-position class="${styles.infoFirst__position}"></h4>
          </div>
          <div class="${styles.infoSecond}">
              <div class="${styles.emailInfo}">
              <img src="/public/icons/email.svg" alt="email" />
              <h4 data-m-email class="${styles.email}"></h4>
              </div>
              <div class="${styles.callInfo}">
              <img src="/public/icons/call.svg" alt="call" />
              <h4 data-m-phone class="${styles.call}"></h4>
            </div>
          </div>
        </div>
      </div>
      <div class="${styles.adminDashboard}">
      <div class="${styles.adminDashboard__time}">
        <h3 class="${styles.adminDashboard__today}">c</h3>
      </div>

        <div class="${styles.adminDashboard__container}">
          <div class="${styles.adminDashboard__approval} ${styles.card}">
            <div class="${styles.userDashboard__approvalContainer}">
              
              <div class="${styles["adminDashboard__approval-title"]}">
                <div class="${styles["adminDashboard__approval-title--left"]}">
                  <h2>전자결재</h2>
                  <h4>미처리 결재만 보여집니다.</h4>
                </div>
                <h4 class="${styles["adminDashboard__approval-title--right"]}">
                  <a href="/admin/approval">전자결재 페이지로 이동</a>
                  <svg
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

            </div>
            <table class="${styles.approvalTable}">
              <thead>
                <tr>
                  <th>종류</th>
                  <th>제목</th>
                  <th>신청일</th>
                  <th>내용</th>
                </tr>
              </thead>
              <tbody class="${styles.approvalTable__tbody}"></tbody>
            </table>
          </div>
        </div>


        <div class="${styles.adminDashboard__mileage} ${styles.card}">
          <div class="${styles["adminDashboard__mileage-title"]}">
            <div class="${styles["adminDashboard__mileage-title--left"]}">
              <h2>마일리지</h2>
              <h4>미확인 신청 내역만 보여집니다.</h4>
            </div>
            <h4 class="${styles["adminDashboard__mileage-title--right"]}">
              <a href="/admin/mileage">마일리지 페이지로 이동</a>
              <svg
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
          <ul class="${styles.mileage__contents} ${styles.h5}">
            <li class="${styles.mileage__header}">
              <div class="${styles.mileage__title}">제목</div>
              <div class="${styles.mileage__requester}">요청자</div>
              <div class="${styles["mileage__request-date"]}">요청일</div>
            </li>
          </ul>
        </div>


        <div class="${styles.adminDashboard__notice} ${styles.card}">
          <div class="${styles["adminDashboard__notice-title"]}">
              <div class="${styles["adminDashboard__notice-title--left"]}">
                <h2>공지사항</h2>
                <h4>최근 3개만 보여집니다.</h4>
              </div>
              <h4 class="${styles["adminDashboard__notice-title--right"]}">
                <a href="/admin/notices">공지사항 페이지로 이동</a>
                <svg
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
            <table class="${styles.noticeTable}">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                  <th>첨부파일</th>
                  <th>조회수</th>
                </tr>
              </thead>
              <tbody class="${styles.noticeTable__tbody}"></tbody>
            </table>  
        </div>
      </div>
    </div>`;

  mileageData();
  approvalData();
  noticesData();
  fetchUserData();

  const currentDate = getTodayDate();
  document.querySelector(`.${styles.adminDashboard__today}`).textContent =
    currentDate;
};

export default renderAdminDashboard;
