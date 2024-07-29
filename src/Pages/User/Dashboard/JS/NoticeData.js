import styles from "./../Dashboard.module.css";

// 서버 데이터 요청 함수
const noticesData = async () => {
  try {
    const response = await fetch("/api/notices");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "OK") {
      filter(result.data); // 가져온 데이터로 필터링
    } else {
      console.error("Error fetching notices:", result.error);
    }
  } catch (error) {
    console.error("Failed to fetch notices:", error);
  }
};

export default noticesData;

const filter = (data) => {
  // 원본 데이터 복사 및 날짜 기준 내림차순 정렬
  const sortedData = data
    .slice()
    .sort((pre, sub) => new Date(sub.date) - new Date(pre.date));
  // 정렬된 데이터에서 상위 3개의 항목 추출
  const topThreeItems = sortedData.slice(0, 3);
  const tableBody = document.querySelector(`.${styles.noticeTable__tbody}`);
  // 테이블 본문 초기화
  tableBody.innerHTML = "";

  if (data.length === 0) {
    // 테이블에 데이터가 없을 때
    const noticeTableRow = document.createElement("tr");
    const noticeTableCell = document.createElement("td");
    noticeTableCell.colSpan = 6;
    noticeTableCell.textContent = "공지사항이 없습니다.";
    noticeTableCell.style.textAlign = "center";
    noticeTableCell.style.padding = "20px";
    noticeTableRow.appendChild(noticeTableCell);
    tableBody.appendChild(noticeTableRow);
  } else {
    topThreeItems.forEach((item) => {
      const noticerow = document.createElement("tr");
      const hasAttachments = item.attachments !== null;

      const category = item.category;
      let categoryContent = "";

      switch (category) {
        case "event":
          categoryContent = "이벤트";
          break;
        case "mileage":
          categoryContent = "마일리지";
          break;
        case "education":
          categoryContent = "교육";
          break;
        case "approval":
          categoryContent = "전자결재";
          break;
        case "etc":
          categoryContent = "기타";
          break;
        case "human-resource":
          categoryContent = "인사행정";
          break;
        default:
          categoryContent = "Unknown category.";
          break;
      }

      noticerow.innerHTML = `
          <td>${categoryContent}</td>
          <td>${item.title}</td>
          <td>${item.author}</td>
          <td>${item.createdAt}</td>
          <td>${
            hasAttachments
              ? `<img src="/public/icons/textfile.svg" alt="file-icon" width="20" height="20" />`
              : `없음`
          }</td>
          <td>${item.views}</td>
          <td>
              <p>[${categoryContent}] ${item.title}</p>
                <div class="${styles.noticeResponsive}">
                    <p>작성자:${item.author} / </p>
                    <p>작성일:${item.createdAt} / </p>
                    <p class="${styles.dashboard__attachments}">첨부파일:
                    ${
                      hasAttachments
                        ? `<img src="/public/icons/textfile.svg" alt="file-icon" width="20" height="20" />`
                        : `없음`
                    }
                    </p>
                </div>
          </td>
    `;
      tableBody.appendChild(noticerow);
    });
  }
};
