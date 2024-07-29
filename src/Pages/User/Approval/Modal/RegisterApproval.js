import fetchApprovalData from "./../FetchApprovalData";

const registerApproval = () => {
  const addButton = document.querySelector("[data-approvaladd-btn]");
  const modal = document.querySelector(".modal-box.active");
  const modalBackground = document.querySelector("#modal__background");

  const eventListener = async (event) => {
    event.preventDefault();

    const titleInput = document.querySelector("[data-a-title]");
    const categorySelect = document.querySelector(
      "select[name='approvalcategory']"
    );
    const submitReasonInput = document.querySelector("[data-a-reason]");
    const startDateInput = document.querySelector("[data-approvalstart-day]");

    let endDate;
    if (categorySelect.value === "반차" || categorySelect.value === "조퇴") {
      const ampmSelect = document.querySelector("select[name='ampm']");
      const timeSelect = document.querySelector("select[name='time']");
      endDate = `${timeSelect.value}:00 ${ampmSelect.value}`;
    } else {
      const endDateInput = document.querySelector("[data-approvalend-day]");
      endDate = endDateInput.value;
    }

    const formData = new FormData();
    formData.append("user", sessionStorage.getItem("userName"));
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);
    formData.append("startdate", startDateInput.value);
    formData.append("enddate", endDate);
    formData.append("submitreason", submitReasonInput.value);

    try {
      const response = await fetch("/api/approval", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const result = await response.json();

      if (result.status === "OK") {
        alert("전자결재가 성공적으로 등록되었습니다.");
        // 모달 닫기
        if (modal && modal.classList.contains("active")) {
          modal.classList.remove("active");
        }
        if (modalBackground && modalBackground.classList.contains("active")) {
          modalBackground.classList.remove("active");
        }
        // 이벤트 리스너 제거
        addButton.removeEventListener("click", eventListener);
        // 필요한 경우 페이지 새로고침 또는 다른 작업 수행
        fetchApprovalData();
      } else {
        alert(
          `전자결재 등록에 실패했습니다: ${result.error || "알 수 없는 오류"}`
        );
      }
    } catch (error) {
      console.error("Failed to register approval:", error);
      alert(`전자결재 등록 중 오류가 발생했습니다: ${error.message}`);
    }
  };

  addButton.addEventListener("click", eventListener);
};

export default registerApproval;
