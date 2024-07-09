import styles from "./../Dashboard.module.css";

// 서버 데이터 요청 함수
const approvalData = async () => {
  try {
    const response = await fetch("/api/approval");
    const data = await response.json();
    console.log("Fetched approval data:", data);
    if (data.status === "OK") {
      ApprovalDashBoardFilter(data.data);

      // select 박스에 change 이벤트 리스너 추가
      const selectFilter = document.querySelector("#approvalFilter");
      selectFilter.addEventListener("change", () => {
        ApprovalDashBoardFilter(data.data);
      });
    } else {
      console.error("Error in Approval DashBoard data:", data.error);
    }
  } catch (error) {
    console.error("Failed to fetch Approval DashBoard data:", error);
  }
};
export default approvalData;

const ApprovalDashBoardFilter = (data) => {
  const selectFilter = document.querySelector("#approvalFilter");
  const filterValue = selectFilter.value;

  let filteredData;

  switch (filterValue) {
    case "진행중":
      filteredData = data.filter(
        (item) =>
          item.isApprove !== 0 &&
          item.isApprove !== 1 &&
          item.user === sessionStorage.getItem("userName")
      );
      break;
    case "승인":
      filteredData = data.filter(
        (item) =>
          item.isApprove === 1 &&
          item.user === sessionStorage.getItem("userName")
      );
      break;
    case "반려":
      filteredData = data.filter(
        (item) =>
          item.isApprove === 0 &&
          item.user === sessionStorage.getItem("userName")
      );
      break;
    default:
      filteredData = data;
  }

  // 상위 3개의 항목 추출
  const topThreeItems = filteredData.slice(0, 3);
  const tableBody = document.querySelector(`.${styles.approvalTable__tbody}`);

  // 테이블 본문 초기화
  tableBody.innerHTML = "";

  topThreeItems.forEach((item) => {
    const approvalRow = document.createElement("tr");

    approvalRow.innerHTML = `
        <td>${item.category}</td>
        <td>${item.title}</td>
        <td>${item.submitdate}</td>
        <td>
            <p>${item.title}</p><br>
            <p>거절사유 : ${item.refusereason}</p><br>
            <p>${item.submitdate}</p>
        </td>
    `;
    tableBody.appendChild(approvalRow);
  });
};
