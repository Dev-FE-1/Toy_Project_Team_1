import filter from "./Filter";
import spinner from "/src/Components/Spinner/Spinner";

// 로딩 스피너
const loadingSpinner = spinner();

const fetchEmployeeData = async () => {
  try {
    loadingSpinner.show();
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "OK") {
      filter(result.data);
      return result.data; // 데이터를 반환
    } else {
      console.error("Error fetching notices:", result.error);
    }
  } catch (error) {
    console.error("Failed to fetch notices:", error);
  } finally {
    loadingSpinner.hide();
  }
  return []; // 에러 발생 시 빈 배열 반환
};

export default fetchEmployeeData;
