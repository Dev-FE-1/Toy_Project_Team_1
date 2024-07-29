// Pagination.js
import styles from "./Pagination.module.css";

const ITEMS_PER_PAGE = 5; // 페이지네이션 버튼 개수
const PAGE_COUNT = 5; // 한 페이지에 표시할 항목 수
export let currentPage = 1; // 현재 페이지 번호
let totalPages = 0; // 총 페이지 수

// 현재 페이지를 설정하고 페이지네이션과 현재 페이지 데이터를 렌더링하는 함수
const setCurrentPage = (page, data, renderFn) => {
  if (page < 1) page = 1; // 페이지가 1보다 작으면 1로 설정
  else if (page > totalPages)
    page = totalPages; // 페이지가 총 페이지 수보다 크면 총 페이지 수로 설정
  else currentPage = page; // 유효한 페이지일 경우 해당 페이지로 설정

  initPagination(data, renderFn);
};

// 현재 페이지의 데이터를 계산하고 렌더링하는 함수
const renderCurrentPageData = (data, renderFn) => {
  const start = (currentPage - 1) * ITEMS_PER_PAGE; // 시작 인덱스 계산
  const end = start + ITEMS_PER_PAGE; // 끝 인덱스 계산
  const currentPageData = data.slice(start, end); // 현재 페이지에 해당하는 데이터 추출

  renderFn(currentPageData); // 데이터 렌더링 함수 호출
};

// 페이지네이션 버튼 렌더링 함수
const renderPagination = (data, renderFn) => {
  totalPages = Math.ceil(data.length / ITEMS_PER_PAGE); // 총 페이지 수 계산
  const paginationContainer = document.getElementById("pagination"); // 페이지네이션 컨테이너 요소 가져오기
  paginationContainer.className = `${styles.pagination}`;
  paginationContainer.innerHTML = ""; // 기존 버튼 초기화

  // 페이지네이션 버튼 생성 함수
  const createPaginationBtn = (innerHTML, onClick, className = "") => {
    const button = document.createElement("button");
    button.innerHTML = innerHTML;
    button.className = `${styles.pageNumber__btn} ${className}`;
    button.onclick = onClick;
    return button;
  };

  // 처음 페이지 버튼 생성
  paginationContainer.appendChild(
    createPaginationBtn("&laquo;", () => setCurrentPage(1, data, renderFn))
  );
  // 이전 페이지 버튼 생성
  paginationContainer.appendChild(
    createPaginationBtn("&lt;", () =>
      setCurrentPage(currentPage - 1, data, renderFn)
    )
  );

  // 페이지 버튼 범위 계산
  const startPage = Math.max(1, currentPage - Math.floor(PAGE_COUNT / 2));
  const endPage = Math.min(totalPages, startPage + PAGE_COUNT - 1);

  // 페이지 번호 버튼 생성
  for (let i = startPage; i <= endPage; i++) {
    const className = i === currentPage ? styles.active : "";
    paginationContainer.appendChild(
      createPaginationBtn(i, () => setCurrentPage(i, data, renderFn), className)
    );
  }

  // 다음 페이지 버튼 생성
  paginationContainer.appendChild(
    createPaginationBtn("&gt;", () =>
      setCurrentPage(currentPage + 1, data, renderFn)
    )
  );
  // 마지막 페이지 버튼 생성
  paginationContainer.appendChild(
    createPaginationBtn("&raquo;", () =>
      setCurrentPage(totalPages, data, renderFn)
    )
  );
};

const initPagination = (data, renderFn) => {
  renderCurrentPageData(data, renderFn); // 페이지네이션 버튼 렌더링
  renderPagination(data, renderFn); // 현재 페이지의 데이터 렌더링
};

export const resetCurrentPage = () => {
  currentPage = 1;
};

export default initPagination;
