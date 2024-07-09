import approvalType from "./../../Pages/User/Approval/Modal/ModalContentDetail";
import renderTime from "./../../Pages/User/Dashboard/JS/RenderTime";
import {
  startTimeUpdate,
  stopTimeUpdate,
} from "./../../Pages/User/Dashboard/JS/UpdateTimer";
import registerApproval from "./../../Pages/User/Approval/Modal/RegisterApproval";

const handleModal = (fn) => {
  const contents = document.querySelector("#contents");
  // console.log(event);

  const modalBackground =
    document.querySelector("#modal__background") ||
    document.createElement("div");

  // 이벤트 위임을 사용한 모달 제어
  contents.addEventListener("click", (event) => {
    if (event.target.closest(".open-modal")) {
      const button = event.target.closest(".open-modal");
      const modalId = button.dataset.modalTarget;
      const modal = document.querySelector(modalId);
      if (modal && !modal.classList.contains("active")) {
        modal.classList.add("active");
        modalBackground.classList.add("active");

        switch (fn.name) {
          case "approvalType":
            approvalType();
            registerApproval();
            break;
          case "renderTime":
            startTimeUpdate();
            renderTime();
            break;
          default:
            break;
        }
      }
    } else if (
      event.target.closest(".close-modal") ||
      event.target === modalBackground ||
      event.target.closest("#checkInBtn") ||
      event.target.closest("#checkOutBtn")
    ) {
      const modal = document.querySelector(".modal-box.active");
      if (modal && modal.classList.contains("active")) {
        modal.classList.remove("active");
        modalBackground.classList.remove("active");
        stopTimeUpdate();
      }
    }
  });
};

export default handleModal;

// import { initializeModalManager, setOpenCallback, setCloseCallback } from './ModalManager';

// const handleModal = (events = {}) => {
//   initializeModalManager();

//   if (events.renderTime) {
//     setOpenCallback(events.renderTime);
//   }

//   if (events.stopTimeUpdate) {
//     setCloseCallback(events.stopTimeUpdate);
//   }
// };

// export default handleModal;
