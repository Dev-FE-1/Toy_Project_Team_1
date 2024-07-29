import fetchApprovalData from "./../FetchApprovalData";

const modalApprovalDenied = (modal) => {
  //이미 함수가 호출되었으면 종료한다.
  if (modal.hasAttribute("data-event-attached")) {
    return;
  }
  const closeModal = () => {
    const modalBackground = document.querySelector("#modal__background");
    modal.classList.remove("active");
    modalBackground?.classList.remove("active");
    // 모달이 닫힐 때 이벤트 리스너 제거
    document.removeEventListener("click", handleClick);
  };

  const sendRequest = async (isApprove, approvalID, refuseReason) => {
    const formData = new FormData();
    formData.append("id", approvalID);
    formData.append("isApprove", isApprove.toString());
    if (!isApprove) {
      formData.append("refusereason", refuseReason);
    }

    try {
      const response = await fetch(`/api/approval/${approvalID}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);
      if (isApprove) {
        alert("전자결재가 승인되었습니다.");
      } else {
        alert("전자결재가 거절되었습니다.");
      }
      // 여기에 UI 업데이트 로직을 추가할 수 있습니다.
      closeModal();
      fetchApprovalData();
    } catch (error) {
      console.error("Error updating approval:", error);
      alert("승인/거절 처리 중 오류가 발생했습니다.");
    }
  };

  const handleClick = async (event) => {
    const target = event.target;

    if (target.matches("[data-approvalapproval-btn]")) {
      event.preventDefault();
      const approvalID = modal.querySelector("[data-a-id]").value;
      await sendRequest(true, approvalID);
    } else if (target.matches("[data-approvalreject-btn]")) {
      event.preventDefault();
      const approvalID = modal.querySelector("[data-a-id]").value;
      const refuseReason = modal.querySelector("[data-a-refusereason]").value;
      await sendRequest(false, approvalID, refuseReason);
    }
  };

  // 모달에 이벤트 리스너 추가
  modal.addEventListener("click", handleClick);

  // 모달 닫기 버튼에 이벤트 리스너 추가
  const closeButton = modal.querySelector(".close-modal");
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  // 모달 배경에 이벤트 리스너 추가
  const modalBackground = document.querySelector("#modal__background");
  if (modalBackground) {
    modalBackground.addEventListener("click", closeModal);
  }
  // 함수가 호출되었음을 표시
  modal.setAttribute("data-event-attached", "true");
};

export default modalApprovalDenied;
