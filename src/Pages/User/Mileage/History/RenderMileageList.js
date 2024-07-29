import styles from "./History.module.css";

export const renderMileageList = (data) => {
  const container = document.querySelector(`.${styles.details}`);
  container.innerHTML = "";

  const historyList = document.querySelector(`.${styles.details}`);

  // 필터링된 데이터 렌더링
  data.forEach((item) => {
    const div = document.createElement("li");
    div.className = styles["details__row"];
    div.innerHTML = `
          <div class="${styles["details__title"]}">${item.category}</div>
          <div class="${
            styles["details__registration-date"]
          }">${item.date.replaceAll("-", ".")}</div>
          <div class="${styles["details__mileage"]}">${item.score}</div>
          `;

    historyList.appendChild(div);
  });
};

