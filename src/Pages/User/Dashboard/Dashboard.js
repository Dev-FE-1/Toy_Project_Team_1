import styles from "./Dashboard.module.css";
import noticesData from "./JS/NoticeData";
import approvalData from "./JS/ApprovalData";
import renderModal from "../../../Components/Modal/RenderModal";
import { showCheckTimeContent } from "./Modal/TimerModalContent";
import renderTime from "./JS/RenderTime";
import fetchUserData from "/src/Pages/User/Mypage/FetchUserData";

const renderUserDashboard = (container) => {
  container.innerHTML = `
    <div class="${styles.dashboardCon}">
        <!-- 페이지 타이틀 -->
        <h1>대시보드</h1>
        <div class="${styles.userDashboard}">
          <div class="${styles.userDashboard__profileCard}  ${styles.card}">
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
          <div class="${styles.userDashboard__attendance}">

            <div class="${styles.userDashboard__todayAttendance} ${styles.card}">
              <div class="${styles.userDashboard__state}">
                <h2>오늘의 출근</h2>
                <h4 class="${styles.userDashboard__todayTag}">출근 전</h4>
              </div>
              <div class="${styles.userDashboard__todayAttendanceWrap}">
                <h3 class="${styles.userDashboard__today}"></h3>
                <div class="${styles.userDashboard__stamp}">
                  <button class="${styles.recordStartTimeBtn} open-modal"
                    data-modal-target="#modal-dashboard_1"
                  >
                    <h3>출근하기</h3>
                    <h2 id="userDashboard__startTime">-</h2>
                  </button>
                  <button class="${styles.recordEndTimeBtn} open-modal"
                    data-modal-target="#modal-dashboard_2"
                  >
                    <h3>퇴근하기</h3>
                    <h2 id="userDashboard__endTime">-</h2>
                  </button>
                </div>
              </div>
            </div>

            <div class="${styles.userDashboard__attendanceHistory} ${styles.card}">
              <h2>금주 근무 현황</h2>
              <div class="${styles.userDashboard__attendanceTime}">
                  <h3>총 4시간 근무</h3>
              </div>
            </div>
          </div>
          <div class="${styles.userDashboard__approval} ${styles.card}">
            <div class="${styles.userDashboard__approvalContainer}">
              <div class="${styles.userDashboard__approvalTitle}">
                <h2>전자결재</h2>
                <h4>최근 3개만 보여집니다.</h4>
              </div>
              <h4 class="${styles["userDashboard__approval-title--right"]}">
                <a href="/user/approval">전자결재페이지로 이동</a>
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
            <div class="${styles.userDashboard__approvalFilter}">
              <select id="approvalFilter">
                <option value="진행중">진행중</option>
                <option value="승인">승인</option>
                <option value="반려">반려</option>
              </select>
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
          <div class="${styles.userDashboard__notice} ${styles.card}">
            <div class="${styles.userDashboard__noticeContainer}">
              <div class="${styles.userDashboard__noticeTitle}">
                <h2>공지사항</h2>
                <h4>최근 3개만 보여집니다.</h4>
              </div>
              <h4 class=${styles.userDashboard__noticeRight}>
                <a href="/user/notices">공지사항페이지로 이동</a>
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
                  <th>카테고리</th>
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
      </div>
  `;

  noticesData();
  approvalData();
  renderTime();
  fetchUserData();

  // 출근 체크 모달 id: dashboard_1
  renderModal(
    showCheckTimeContent("in").modal_id, // 모달 번호
    showCheckTimeContent("in").header, // 모달 헤더
    showCheckTimeContent("in").content, //모달 내용
    renderTime
  );

  // 퇴근 체크 모달 id: dashboard_2
  renderModal(
    showCheckTimeContent("out").modal_id, // 모달 번호
    showCheckTimeContent("out").header, // 모달 헤더
    showCheckTimeContent("out").content, //모달 내용
    renderTime
  );
};

export default renderUserDashboard;
