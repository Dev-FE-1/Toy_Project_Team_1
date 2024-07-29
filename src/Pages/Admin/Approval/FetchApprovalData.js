import filterByTabs from "./Filters";
import spinner from "/src/Components/Spinner/Spinner";

// 로딩 스피너
const loadingSpinner = spinner();

// 서버 데이터 요청 함수
const fetchApprovalData = async () => {
  try {
    loadingSpinner.show();
    const response = await fetch("/api/approval");
    const data = await response.json();
    if (data.status === "OK") {
      filterByTabs(data.data);
    } else {
      console.error("Error in Approval data:", data.error);
    }
  } catch (error) {
    console.error("Failed to fetch Approval data:", error);
  } finally {
    loadingSpinner.hide();
  }
};

export default fetchApprovalData;
