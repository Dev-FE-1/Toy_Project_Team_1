import handleModal from "./HandleModal";

const renderModal = (id, header, content, event = null) => {

  const contents = document.querySelector('#contents');

  const modalHTML = `
    <div id="modal-${id}" class="modal-box">
      <div class="modal-box__container">
        <div class="modal-box__header">
          <h2>${header}</h2>
          <img
            class="close-modal"
            src="/public/icons/close.svg"
            alt="close-modal"
            width="24"
            height="24"
          />
        </div>
        <div class="modal-box__content">${content}</div>
      </div>
    </div>
    <div id="modal__background"></div>
  `;

  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = modalHTML;

  contents.appendChild(tempContainer);

  handleModal(event); // 모달 이벤트 전달 함수
};

export default renderModal;

