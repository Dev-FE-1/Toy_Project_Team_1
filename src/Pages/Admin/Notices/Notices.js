import fetchNoticesData from "./JS/FetchNoticesData";
import paginationStyle from "/src/Components/Pagination/Pagination.module.css";
import route from "./../../../Router/Router";
import styles from "../Notices/Notice.module.css";

const renderAdminNotices = (container) => {
  container.innerHTML = `
    <div class="${styles.contents__notice}">
        <h1>공지사항</h1>
        <div class="${styles.noticeContainer}">
        <div class="${styles.contents__newBtnWrap}">
          <button id="moveNewNoticeBtn" data-color="secondary" data-shape="block">
                새 공지 등록
          </button>
        </div>
          <div class="${styles["notices__tabs"]}">
            <button
              id = "event"
              class="${styles["notices__tab"]} ${styles["notices-tab-event"]}"
            >
              이벤트
            </button>
            <button
              id = "mileage"
              class="${styles["notices__tab"]} ${styles["notices-tab-mileage"]}"
            >
              마일리지
            </button>
            <button
              id = "approval"
              class="${styles["notices__tab"]} ${styles["notices-tab-approval"]}"
            >
              전자결재
            </button>
            <button
              id = "human-resource"
              class="${styles["notices__tab"]} ${styles["notices-tab-human-resource"]}"
            >
              인사행정
            </button>
            <button
              id = "education"
              class="${styles["notices__tab"]} ${styles["notices-tab-education"]}"
            >
              교육
            </button>
            <button
              id = "etc"
              class="${styles["notices__tab"]} ${styles["notices-tab-etc"]}"
            >
              기타
            </button>
          </div>
          <div class="${styles.noticeContainer__filterWrap}">
            <div class="${styles.noticeContainer__filter}">
              <input
                type="search"
                id="noticeSearchBox"
                name="q"
                placeholder="제목 또는 작성자를 입력해주세요."
                data-shape="line"
              />
            <select name="noticeFilter" id="noticeFilter">
              <option value="latest">최신순</option>
              <option value="old">오래된순</option>
            </select>
            </div>
            <h5 id="noticeTotalPostsNum"></h5>
          </div>
          <div class="${styles["adminNoticeTable"]}">
              <table>
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
                <tbody data-n-table-body></tbody>
              </table>
              <!-- 페이지네이션 구현하기 -->
              <div id="pagination" class="${paginationStyle.pagination}"></div>     
          </div>
        </div>
      </div>
  `;
  fetchNoticesData();
  moveAddNoticePage();
};

const moveAddNoticePage = () => {
  const movePageBtn = document.querySelector("#moveNewNoticeBtn");

  if (movePageBtn) {
    movePageBtn.addEventListener("click", (event) => {
      history.pushState(null, null, "/admin/notices/add");
      route();
    });
  }
};

export default renderAdminNotices;
