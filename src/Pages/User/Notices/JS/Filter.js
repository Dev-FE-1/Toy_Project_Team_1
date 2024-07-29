import renderNoticesList from "./RenderNoticesList.js";
import initPagination, {
  resetCurrentPage,
} from "/src/Components/Pagination/Pagination";
import styles from "../Notice.module.css";

let noticesData = []; // 원본 데이터 저장
let selectedCategory = "event"; // 현재 선택된 카테고리
let selectedSortType = "latest"; // 현재 정렬 방식
let currentSearchQuery = ""; // 현재 검색어

const tabFilter = (data) => {
  noticesData = data; // 원본 데이터 저장
  const tabContainer = document.querySelector(`.${styles["notices__tabs"]}`);
  const selectFilter = document.querySelector("#noticeFilter");
  const searchInput = document.querySelector("#noticeSearchBox");

  // 초기 상태 설정
  document.getElementById("event").classList.add(styles.active);
  selectFilter.value = selectedSortType;

  // 필터링 및 렌더링 함수
  const applyFiltersAndRender = () => {
    let filteredData = noticesData.filter(
      (item) => item.category === selectedCategory
    );

    // 검색 필터 적용
    if (currentSearchQuery) {
      filteredData = filteredData.filter(
        (item) =>
          item.title.toLowerCase().includes(currentSearchQuery) ||
          item.author.toLowerCase().includes(currentSearchQuery)
      );
    }

    // 날짜 정렬 적용 및 중요 데이터를 상단으로
    filteredData = sortNoticesWithPriority(filteredData, selectedSortType);

    updateTotalNoticeCount(filteredData);
    resetCurrentPage();
    renderNoticesList(filteredData);
    initPagination(filteredData, renderNoticesList);
  };

  // 탭 필터 이벤트 리스너
  tabContainer.addEventListener("click", (event) => {
    const targetId = event.target.id;
    if (targetId) {
      document.querySelectorAll(`.${styles["notices__tab"]}`).forEach((tab) => {
        tab.classList.remove(styles.active);
      });
      event.target.classList.add(styles.active);
      selectedCategory = targetId;
      applyFiltersAndRender();
    }
  });

  // 정렬 옵션 변경 이벤트 리스너
  selectFilter.addEventListener("change", () => {
    selectedSortType = selectFilter.value;
    applyFiltersAndRender();
  });

  // 검색 이벤트 리스너
  searchInput.addEventListener("input", () => {
    currentSearchQuery = searchInput.value.trim().toLowerCase();
    applyFiltersAndRender();
  });

  // 초기 렌더링
  applyFiltersAndRender();
};

// 총 게시글 수 업데이트 함수
const updateTotalNoticeCount = (data) => {
  const totalPostsNum = document.querySelector("#noticeTotalPostsNum");
  totalPostsNum.innerText = `총 게시글 수 ${data.length}개`;
  totalPostsNum.style.color = `var(--gray-07)`;
};

// 중요 태그가 있는 데이터를 상단으로 올리고 날짜순 정렬을 적용하는 함수
const sortNoticesWithPriority = (data, sortType) => {
  const importantData = data.filter((item) => item.isImportant === 1);
  const normalData = data.filter((item) => item.isImportant === 0);

  const sortFunction =
    sortType === "latest"
      ? (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      : (a, b) => new Date(a.createdAt) - new Date(b.createdAt);

  importantData.sort(sortFunction);
  normalData.sort(sortFunction);

  return [...importantData, ...normalData];
};

export default tabFilter;
