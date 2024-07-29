import { renderMileageList } from "./index";
import initPagination from "/src/Components/Pagination/Pagination";
import createLoadingSpinner from "/src/Components/Spinner/Spinner";

const loadingSpinner = createLoadingSpinner();

export const fetchAndRenderUserApprovedMileage = async () => {
  try {
    loadingSpinner.show();
    const mileageData = await fetchMileageDataFromServer();
    const approvedMileage = filterUserApprovedMileage(mileageData);
    initPagination(approvedMileage, renderMileageList);
  } catch (error) {
    console.error("마일리지 데이터 조회 중 오류 발생:", error);
  } finally {
    loadingSpinner.hide();
  }
};

const fetchMileageDataFromServer = async () => {
  const response = await fetch("/api/mileage");
  if (!response.ok) {
    throw new Error("서버 응답이 정상적이지 않습니다");
  }
  const data = await response.json();
  if (data.status !== "OK") {
    throw new Error(data.error || "마일리지 데이터 조회 실패");
  }
  return data.data;
};

const filterUserApprovedMileage = (mileageData) => {
  const userName = sessionStorage.getItem("userName");
  return mileageData.filter(
    (item) => item.user === userName && item.isApprove === 1
  );
};
