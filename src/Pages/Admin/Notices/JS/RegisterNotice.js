import styles from "../Add/Add.module.css";

const registerNotice = () => {
  const currentUserName = sessionStorage.getItem("userName") || "";

  const addButton = document.querySelector("[data-add-btn]");
  const fileInput = document.querySelector("[data-n-file]");
  const fileInfo = document.querySelector("[data-n-file-info]");
  const uploadButton = document.querySelector(`.${styles.uploadButton}`);
  const removeFileButton = document.querySelector("[data-n-remove-file]");
  const titleInput = document.querySelector("[data-n-title]");
  const isImportantToggle = document.querySelector("[data-n-toggle]");
  const descriptionTextarea = document.querySelector("[data-n-description]");
  const categorySelect = document.querySelector("select[name='category']");

  // 페이지 로드 시 저장된 파일 정보 복원
  const restoreFileInfo = () => {
    const storedFileName = localStorage.getItem("selectedFileName");

    if (storedFileName) {
      fileInfo.textContent = storedFileName;
      removeFileButton.style.display = "flex";

      // // File 객체 생성 및 FileList에 추가
      // const file = new File([new Blob()], storedFileName, {
      //   lastModified: new Date().getTime(),
      // });
      // const dataTransfer = new DataTransfer();
      // dataTransfer.items.add(file);
      // fileInput.files = dataTransfer.files;
    } else {
      fileInfo.textContent = "";
      removeFileButton.style.display = "none";
    }
  };

  restoreFileInfo();

  const validateInputs = () => {
    if (!titleInput.value.trim()) {
      alert("제목을 입력해주세요.");
      return false;
    }
    if (!descriptionTextarea.value.trim()) {
      alert("내용을 입력해주세요.");
      return false;
    }
    return true;
  };

  //파일 선택 버튼을 누르면 모달창이 열림
  uploadButton.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.click();
  });

  // 파일 선택 후 파일명을 표시 및 삭제 버튼 표시
  fileInput.addEventListener("change", () => {
    console.log("ddd");
    if (fileInput.files.length > 0) {
      const fileName = fileInput.files[0].name;
      fileInfo.textContent = `선택된 파일: ${fileName}`;
      removeFileButton.style.display = "flex"; // 파일 삭제 버튼 표시
      localStorage.setItem("selectedFileName", fileName); // 파일 이름을 로컬 스토리지에 저장
    } else {
      fileInfo.textContent = ""; // 파일 정보 초기화
      removeFileButton.style.display = "none"; // 파일 삭제 버튼 숨기기
      localStorage.removeItem("selectedFileName"); // 로컬 스토리지에서 파일 이름 제거
    }
  });

  // 파일 삭제 버튼 클릭 시
  removeFileButton.addEventListener("click", (e) => {
    e.preventDefault();
    fileInput.value = ""; // 파일 입력 필드 초기화
    fileInfo.textContent = ""; // 파일 정보 초기화
    removeFileButton.style.display = "none"; // 파일 삭제 버튼 숨기기
    localStorage.removeItem("selectedFileName"); // 로컬 스토리지에서 파일 이름 제거
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("author", currentUserName);
    formData.append("isImportant", isImportantToggle.checked ? "0" : "1");
    formData.append("description", descriptionTextarea.value);
    formData.append("category", categorySelect.value);

    // 파일 존재 여부에 따라 1 또는 0을 반환
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append("attachments", fileInput.files[0]);
      formData.append("hasAttachment", 1);
    } else {
      formData.append("hasAttachment", 0);
    }

    try {
      const response = await fetch("/api/notices", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === "OK") {
        alert("공지사항이 성공적으로 등록되었습니다.");
        localStorage.removeItem("selectedFileName"); // 공지사항 등록 후 로컬 스토리지 초기화
        window.location.href = "/admin/notices";
      } else {
        alert("공지사항 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to register notice:", error);
      alert("공지사항 등록 중 오류가 발생했습니다.");
    }
  };

  addButton.addEventListener("click", handleSubmit);
};

export default registerNotice;
