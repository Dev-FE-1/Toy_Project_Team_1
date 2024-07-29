import styles from "./../Detail/Detail.module.css";

const editNotice = () => {
  const editBtn = document.querySelector("[data-n-edit]");

  editBtn.addEventListener("click", () => {
    const noticeData = getNoticeDataFromDOM();
    console.log(noticeData, "noticeData");

    showEditForm(noticeData);
  });
};

// 현재 웹 페이지에서 공지 사항 데이터를 가져와 객체로 반환
const getNoticeDataFromDOM = () => {
  return {
    id: new URLSearchParams(window.location.search).get("id"),
    title: document.querySelector(`.${styles.noticeTitle}`).textContent,
    author: document.querySelector(`.${styles.writer}`).textContent,
    description: document.querySelector(`.${styles.noticeDetail__description}`)
      .textContent,
    isImportant: document.querySelector(`.${styles.importantTag}`) !== null,
    attachments: document.querySelector(`.${styles.attachedFile}`).innerHTML,
  };
};

const showEditForm = (noticeData) => {
  const container = document.querySelector("[data-edit-dom]");
  console.log(container, "container");
  container.innerHTML = `
    <h2>공지사항 수정</h2>
    <div class="${styles.noticeDetail__btnContainer}">
          <button data-n-edit data-color="positive" data-shape="block" class="${
            styles.noticeDetail__editBtn
          }">수정하기</button>
          <button data-color="neutral" data-shape="line" class="${
            styles.noticeDetail__backBtn
          }">취소</button>
    </div>
    <input type="text" id="editTitle" value="${noticeData.title}" required>
    <ul class="${styles.noticeDetail__info}">
        <li class=${styles.noticeDetail__items}>
            <h5>등록일</h5>
            <h5 class="${styles.registrationDate}"></h5>
        </li>
        <li class=${styles.noticeDetail__items}>
            <h5>작성자</h5>
            <h5>${noticeData.author}</h5>
        </li>
        <label>
          <input type="checkbox" id="editIsImportant" ${
            noticeData.isImportant ? "checked" : ""
          }>
          중요 공지사항
        </label>
        <li class=${styles.noticeDetail__items}>
            <h5>첨부파일</h5>
            <div class="${styles.attachedFile}">${noticeData.attachments}</div>
        </li>
    </ul>
    <textarea id="editDescription" required>${noticeData.description}</textarea>
    `;

  document
    .getElementById("editNoticeForm")
    .addEventListener("submit", (e) => submitEditForm(e, noticeData.id));
  document
    .getElementById("cancelEdit")
    .addEventListener("click", () => window.location.reload());
};

const submitEditForm = async (e, noticeId) => {
  e.preventDefault();

  const editedData = {
    title: document.getElementById("editTitle").value,
    author: document.getElementById("editAuthor").value,
    description: document.getElementById("editDescription").value,
    isImportant: document.getElementById("editIsImportant").checked ? 1 : 0,
  };

  try {
    const response = await fetch(`/api/notices/${noticeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status === "OK") {
      alert("공지사항이 성공적으로 수정되었습니다.");
      window.location.reload(); // 페이지 새로고침
    } else {
      alert("공지사항 수정에 실패했습니다.");
    }
  } catch (error) {
    console.error("Failed to edit notice:", error);
    alert("공지사항 수정 중 오류가 발생했습니다.");
  }
};

export default editNotice;
