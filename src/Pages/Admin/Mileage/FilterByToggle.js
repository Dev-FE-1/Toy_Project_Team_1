import renderMileageList from './RenderMileageList';

const filterByToggle = (data) => {
  const undetermined = data.filter((item) => item.isApprove === null);
  renderMileageList(undetermined);

  const toggleSwitch = document.querySelector(`#toggleSwitch`);

  let filteredData = data.slice();

  toggleSwitch.addEventListener('click', () => {
    const toggleState = document.querySelector('#toggleText').textContent;
    if (toggleState === '미확인')
      filteredData = data.filter((item) => item.isApprove === null);
    else if (toggleState === '확인')
      filteredData = data.filter((item) => item.isApprove !== null);
    else return;

    renderMileageList(filteredData);
  });
};

export default filterByToggle;
