import styles from "./Approval.module.css";

import {
  showApprovalDetailContent,
  showApprovalDetailContentFalse,
} from "./Modal/ModalContent";
import renderModal from "../../../Components/Modal/RenderModal";

const renderApprovalList = (data) => {
  const container = document.querySelector(`.${styles["approval-list"]}`);

  // Clear existing content
  container.innerHTML = "";
  if (data.length === 0) {
    const noDataMessage = document.createElement("p");
    noDataMessage.textContent = "전자결재 내역이 없습니다";
    noDataMessage.className = styles["no-data-message"];
    container.appendChild(noDataMessage);
  } else {
    // Create a table element
    const table = document.createElement("table");
    table.className = styles["approval-list__table"];

    // Create table body
    const tbody = document.createElement("tbody");
    tbody.className = styles["approval-list__tbody"];

    // Append table body to table
    table.appendChild(tbody);

    // Render each item in the data array
    data.forEach((item) => {
      const tr = document.createElement("tr");
      tr.className = styles["approval-list__row"];
      tr.classList.add(`open-modal`);
      if (item.isApprove === 0) {
        tr.setAttribute("data-modal-target", `#modal-approvaluser_${item.id}`);
      } else {
        tr.setAttribute(
          "data-modal-target",
          `#modal-approvaluserfalse_${item.id}`
        );
      }
      tr.innerHTML = `
      <td class="${styles["approval-list__category"]}">${item.category}</td>
      <td class="${styles["approval-list__title"]}">${item.title}</td>
      <td class="${styles["approval-list__submitdate"]}">${item.submitdate}</td>
      <td class="${styles["approval-list__meida"]}">
        <p>[${item.startdate} ~ ${item.enddate}] ${item.title}</p><br>
        <p>반려사유:${item.refusereason}</p><br>
        <p class="${styles["approval-tr__date"]}">${item.submitdate}</p>
      </td>
    `;
      // Add click event listener to show detail modal
      //tr.addEventListener("click", () => showDetailModal(item));
      tbody.appendChild(tr);
    });

    // Append table to container
    container.appendChild(table);

    data.forEach((item) => {
      const modalContent = showApprovalDetailContent(item);
      renderModal(
        modalContent.modal_id,
        modalContent.header,
        modalContent.content
      );
    });
    data.forEach((item) => {
      const modalContent = showApprovalDetailContentFalse(item);
      renderModal(
        modalContent.modal_id,
        modalContent.header,
        modalContent.content
      );
    });
  }
};

export default renderApprovalList;
