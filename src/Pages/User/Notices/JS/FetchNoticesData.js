import tabFilter from "./Filter";
import spinner from "/src/Components/Spinner/Spinner";

// 로딩 스피너
const loadingSpinner = spinner();

// 서버 데이터 요청 함수
const fetchNoticesData = async () => {
  try {
    loadingSpinner.show();
    const response = await fetch("/api/notices");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "OK") {
      tabFilter(result.data); // 가져온 데이터로 필터링
    } else {
      console.error("Error fetching notices:", result.error);
    }
  } catch (error) {
    console.error("Failed to fetch notices:", error);
  } finally {
    loadingSpinner.hide();
  }
};

export default fetchNoticesData;
