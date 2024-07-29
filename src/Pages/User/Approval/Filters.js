import styles from "./Approval.module.css";
import initPagination, {
  resetCurrentPage,
} from "/src/Components/Pagination/Pagination";
import renderApprovalList from "./RenderApprovalList";

// 탭(심사중, 승인, 반려) 필터 [input: 서버로부터 불러온 데이터]
const filterByTabs = (data) => {
  const tabsFilter = document.querySelector(
    `.${styles["approval-approve__tabs"]}`
  );
  const selectFilter = document.querySelector("#filter");
  const selectFilterDate = document.querySelector("#filter_date");

  let state = null; // 초기 상태는 심사중
  let category = "all"; // 초기 상태는 전체 카테고리
  let categoryDate = "latest"; //

  let filteredData = data.filter((item) => {
    if (state === null) {
      // item.isApprove가 0이나 1이 아니고, 사용자 이름이 일치하는 경우
      return (
        item.isApprove !== 0 &&
        item.isApprove !== 1 &&
        item.user === sessionStorage.getItem("userName")
      );
    }
    // state가 null이 아닌 경우, isApprove 상태와 사용자 이름 모두 확인
    return (
      item.isApprove === (state ? 1 : 0) &&
      item.user === sessionStorage.getItem("userName")
    );
  });
  document.getElementById("undetermined").classList.add(styles.active); // 초기 상태에서 심사중 탭 활성화

  initPagination(filteredData, renderApprovalList); // Pagination 렌더링

  // 탭 필터링
  tabsFilter.addEventListener("click", (event) => {
    const targetId = event.target.id;

    // 모든 탭의 활성화 클래스 제거
    document
      .querySelectorAll(`.${styles["approval-approve__tab"]}`)
      .forEach((tab) => {
        tab.classList.remove(styles.active);
      });

    // 탭 클릭에 따른 조건 렌더링
    if (targetId === "undetermined") {
      event.target.classList.add(styles.active);
      state = null;
    } else if (targetId === "approved") {
      event.target.classList.add(styles.active);
      state = true;
    } else if (targetId === "rejected") {
      event.target.classList.add(styles.active);
      state = false;
    } else return;

    resetCurrentPage();
    applyFilters(data, state, category, categoryDate);
  });

  // 카테고리 필터링
  selectFilter.addEventListener("change", (event) => {
    category = event.target.value;
    applyFilters(data, state, category, categoryDate);
  });
  selectFilterDate.addEventListener("change", (event) => {
    categoryDate = event.target.value;
    applyFilters(data, state, category, categoryDate);
  });
};

// 필터링 로직
const applyFilters = (data, state, category, categoryDate) => {
  //let filteredData = data.filter((item) => item.isApprove === state);
  let filteredData = data.filter((item) => {
    if (state === null) {
      // item.isApprove가 0이나 1이 아니고, 사용자 이름이 일치하는 경우
      return (
        item.isApprove !== 0 &&
        item.isApprove !== 1 &&
        item.user === sessionStorage.getItem("userName")
      );
    }
    // state가 null이 아닌 경우, isApprove 상태와 사용자 이름 모두 확인
    return (
      item.isApprove === (state ? 1 : 0) &&
      item.user === sessionStorage.getItem("userName")
    );
  });

  if (category !== "all") {
    filteredData = filteredData.filter((item) => item.category === category);
  }
  if (categoryDate === "latest") {
    filteredData.sort(
      (pre, sub) => new Date(sub.submitdate) - new Date(pre.submitdate)
    );
  } else if (categoryDate === "old") {
    filteredData.sort(
      (pre, sub) => new Date(pre.submitdate) - new Date(sub.submitdate)
    );
  }

  initPagination(filteredData, renderApprovalList); // Pagination 렌더링
};

export default filterByTabs;
