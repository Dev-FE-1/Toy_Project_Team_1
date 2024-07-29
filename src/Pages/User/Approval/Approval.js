import styles from "./Approval.module.css";
import fetchApprovalData from "./FetchApprovalData";
import renderModal from "../../../Components/Modal/RenderModal";
import { showApprovalContent } from "./Modal/ModalContent";
import approvalType from "./Modal/ModalContentDetail";

const renderUserApproval = (container) => {
  container.innerHTML = `
  <div class="${styles.contents}">
        <!-- 페이지 타이틀 -->
        <h1>전자결재</h1>
        <div class="${styles.content__row}">
          <!-- tap형식 버튼 -->
          <div data-approve-tabs class="${styles["approval-approve__tabs"]}">
            <button
              id="undetermined"
              data-approve-tab
              class="${styles["approval-approve__tab"]} ${styles["approval-approve__tab--undetermined"]}"
            >
              심사중
            </button>
            <button 
              id="approved"
              data-approve-tab
              class="${styles["approval-approve__tab"]} ${styles["approval-approve__tab--approved"]}">
              승인
            </button>
            <button 
              id="rejected"
              data-approve-tab
              class="${styles["approval-approve__tab"]} ${styles["approval-approve__tab--rejected"]}">
              반려
            </button>
          </div>
          <!-- 결제신청 모달 버튼 -->
          <button class="${styles.paymentRequest} open-modal" data-modal-target="#modal-approval_1" >
            결재 신청
          </button>
        </div>        

        <!-- 카테고리 selectbox -->
        <div class="${styles.content__selectboxrow}">
          <div class="${styles["approval-category__filter"]}">
            <select id="filter">
              <option value="all">카테고리 전체</option>
              <option value="반차">반차</option>
              <option value="연차">연차</option>
              <option value="조퇴">조퇴</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div class="${styles["approval-date__filter"]}">
            <select id="filter_date">
              <option value="latest">최신순</option>
              <option value="old">오래된순</option>
            </select>
          </div>
        </div>

        <table class="${styles["approval-table"]}">
          <thead class="${styles["approval-table__thead"]}">
            <tr class="${styles["approval-table__tr"]}">
              <th class="${styles["approval-th__category"]}">종류</th>
              <th class="${styles["approval-th__title"]}">제목</th>
              <th class="${styles["approval-th__submitdate"]}">신청일</th>
            </tr>
          </thead>
        </table>
        
        <div class="${styles["approval-list"]}" id="approval-list"></div>
        
        <!-- 페이지네이션 구현하기 -->
        <div id="pagination" class="${styles.pagination}"></div>
  </div>`;

  fetchApprovalData();

  // 결제 신청 모달
  renderModal(
    showApprovalContent().modal_id, // 모달 번호
    showApprovalContent().header, // 모달 헤더
    showApprovalContent().content, //모달 내용,
    approvalType
  );

  const tabs = document.querySelectorAll("[data-approve-tab]");
  const tabContainer = document.querySelector("[data-approve-tabs]");

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

export default renderUserApproval;
