const approvalType = () => {
  const select = document.getElementById("category");
  const approvalDataContainer = document.querySelector(
    ".approval-data__container"
  );

  select.addEventListener("change", function () {
    const selectedValue = this.value;

    if (selectedValue === "반차" || selectedValue === "조퇴") {
      approvalDataContainer.innerHTML = `
      <input data-approvalstart-day type="date" id="startDate"/>
        <select data-a-select name="ampm" id="ampm" required>
          <option value="am">am</option>
          <option value="pm">pm</option>
        </select>
        <select data-a-select name="time" id="detailtime" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>          
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>          
          <option value="11">11</option>
          <option value="12">12</option>
        </select>`;
    } else {
      approvalDataContainer.innerHTML = `
          <input data-approvalstart-day type="date" id="startDate"/>
          <span> - </span>
          <input data-approvalend-day type="date" id="endDate"/>`;
    }
  });
};

export default approvalType;
