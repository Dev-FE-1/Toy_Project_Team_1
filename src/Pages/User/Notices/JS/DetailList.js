import styles from "../Detail/Detail.module.css";

const detailList = () => {
  //window.location.search: 현재 페이지의 URL에서 쿼리 문자열(URL에서 물음표(?) 뒤에 오는 부분)을 반환
  const urlParams = new URLSearchParams(window.location.search);
  // 쿼리 파라미터에서 데이터 추출
  const noticeData = {
    id: urlParams.get("id"),
    title: urlParams.get("title"),
    author: urlParams.get("author"),
    createdAt: urlParams.get("createdAt"),
    attachments: urlParams.get("attachments"),
    views: urlParams.get("views"),
    description: urlParams.get("description"),
  };

  const noticeTitle = document.querySelector(`.${styles.noticeTitle}`);
  const registrationDate = document.querySelector(
    `.${styles.registrationDate}`
  );
  const writer = document.querySelector(`.${styles.writer}`);
  const views = document.querySelector(`.${styles.views}`);
  const attachedFile = document.querySelector(`.${styles.attachedFile}`);
  const description = document.querySelector(
    `.${styles.noticeDetail__description}`
  );

  //불러온 데이터 삽입
  noticeTitle.textContent = noticeData.title;
  registrationDate.textContent = noticeData.createdAt;
  writer.textContent = noticeData.author;
  views.textContent = noticeData.views;
  description.textContent = noticeData.description;
  if (noticeData.attachments === "true") {
    attachedFile.innerHTML = `
    <img
      src="/public/icons/textfile.svg"
      alt="file-icon"
      width="20"
      height="20"
    />
    `;
  } else {
    attachedFile.innerHTML = `("없음")`;
  }
};

export default detailList;
