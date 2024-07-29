import styles from "./../Dashboard.module.css";

// 서버로부터 마일리지 데이터 호출
const mileageData = async () => {
  try {
    const response = await fetch("/api/mileage");
    const data = await response.json();
    if (data.status === "OK") {
      filterMileage(data.data);
    }
  } catch (error) {
    console.error("Failed to fetch mileage data:", error);
  }
};

// 미확인 내용만 필터링 함수
const filterMileage = (data) => {
  const filteredData = data.filter((item) => item.isApprove === null);

  renderMileage(filteredData);
};

// 최신 3개까지 렌더링 함수
const renderMileage = (data) => {
  const mileageList = document.querySelector(`.${styles.mileage__contents}`);

  data.forEach((item, index) => {
    if (index > 2) return;
    const div = document.createElement("li");
    div.className = styles.mileage__header;
    div.innerHTML = `
        <div class="${styles.mileage__title}">${item.category}</div>
        <div class="${styles.mileage__requester}">${item.user}</div>
        <div class="${styles["mileage__request-date"]}">${item.date.replaceAll(
      "-",
      "."
    )}</div>
    `;

    mileageList.appendChild(div);
  });
};

export default mileageData;
