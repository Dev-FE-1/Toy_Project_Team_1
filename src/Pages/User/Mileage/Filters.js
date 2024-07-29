import renderMileageList from "./RenderMileageList";
import styles from "./Mileage.module.css";

// 탭(심사중, 승인, 반려) 필터 [input: 서버로부터 불러온 데이터]
const filterByTabs = (data) => {
  const tabsFilter = document.querySelector(
    `.${styles["mileage-approve__tabs"]}`
  );
  let state = null; // 초기 상태는 심사중
  let filteredData = data.filter(
    (item) =>
      item.user === sessionStorage.getItem("userName") && // 로그인한 유저에 대한 정보만 보여줌
      item.isApprove === state
  );

  document.getElementById("undetermined").classList.add(styles.active); // 초기 상태에서 심사중 탭 활성화
  renderMileageList(filteredData); // 초기 렌더링
  filterBySelect(filteredData); // 초기 탭 필터 후 날짜 필터 적용

  tabsFilter.addEventListener("click", (event) => {
    const targetId = event.target.id;

    // 모든 탭의 활성화 클래스 제거
    document
      .querySelectorAll(`.${styles["mileage-approve__tab"]}`)
      .forEach((tab) => {
        tab.classList.remove(styles.active);
      });

    // 탭 클릭에 따른 조건 렌더링
    if (targetId === "undetermined") {
      // 활성화 탭만 스타일 부여
      event.target.classList.add(styles.active);
      state = null;
    } else if (targetId === "approved") {
      event.target.classList.add(styles.active);
      state = 1;
    } else if (targetId === "rejected") {
      event.target.classList.add(styles.active);
      state = 0;
    } else return;

    filteredData = data.filter(
      (item) =>
        item.isApprove === state &&
        item.user === sessionStorage.getItem("userName")
    ); // isApprove: null, 0, 1

    renderMileageList(filteredData);
    filterBySelect(filteredData); // 탭 필터 후 날짜 필터 적용
  });
};

// 날짜별(최신순, 오래된순) 필터 [input: 탭에 따른 필터링된 데이터, 현재 렌더링된 상태(심사중, 승인, 반려)]
const filterBySelect = (filteredData) => {
  const selectFilter = document.querySelector("#filter");

  selectFilter.addEventListener("change", () => {
    // .slice()를 사용해 원본 데이터 변경하지 않고 복사본 사용
    let sortedData = filteredData.slice();

    if (selectFilter.value === "latest") {
      sortedData.sort((pre, sub) => new Date(sub.date) - new Date(pre.date));
    } else if (selectFilter.value === "old") {
      sortedData.sort((pre, sub) => new Date(pre.date) - new Date(sub.date));
    }

    renderMileageList(sortedData);
  });
};

export default filterByTabs;
