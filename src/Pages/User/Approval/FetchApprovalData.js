import filterByTabs from "./Filters";

// 서버 데이터 요청 함수
const fetchApprovalData = async () => {
  try {
    const response = await fetch("/api/approval");
    const data = await response.json();
    console.log("Fetched approval data:", data);
    if (data.status === "OK") {
      filterByTabs(data.data);
    } else {
      console.error("Error in Approval data:", data.error);
    }
  } catch (error) {
    console.error("Failed to fetch Approval data:", error);
  }
};

export default fetchApprovalData;
