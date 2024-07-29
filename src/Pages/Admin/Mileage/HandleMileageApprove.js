import approveMileageRequest from "./ApproveMileage";
import rejectMileageRequest from "./RejectMileage";
import fetchMileageData from "./FetchMileageData";

const handleMileageApprove = (item) => {
  const approveBtn = document.getElementById(`approve-btn-${item.id}`);
  const rejectBtn = document.getElementById(`reject-btn-${item.id}`);

  const approveHandler = async () => {
    try {
      const success = await approveMileageRequest(item.id);
      if (success) {
        document.querySelector(".modal-box.active").classList.remove("active");
        document.querySelector("#modal__background").classList.remove("active");
        await fetchMileageData();
      }
    } catch (error) {
      console.error("승인 처리 중 오류 발생:", error);
      alert("승인 처리 중 오류가 발생했습니다.");
    }
  };

  const rejectHandler = async () => {
    const reasonSelect = document.querySelector("#rejection-reason");
    const reason = reasonSelect.value;

    // if (reason === "none") {
    //   alert("거절 사유를 선택해주세요.");
    //   return;
    // }

    try {
      const success = await rejectMileageRequest(item.id, reason);
      if (success) {
        document.querySelector(".modal-box.active").classList.remove("active");
        document.querySelector("#modal__background").classList.remove("active");
        await fetchMileageData();
      }
    } catch (error) {
      console.error("거절 처리 중 오류 발생:", error);
      alert("거절 처리 중 오류가 발생했습니다.");
    }
  };

  if (approveBtn) {
    approveBtn.removeEventListener("click", approveHandler);
    approveBtn.addEventListener("click", approveHandler);
  }

  if (rejectBtn) {
    rejectBtn.removeEventListener("click", rejectHandler);
    rejectBtn.addEventListener("click", rejectHandler);
  }
};

export default handleMileageApprove;
