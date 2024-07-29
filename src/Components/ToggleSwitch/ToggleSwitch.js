const toggleSwitch = (text1, text2) => {
  const toggleSwitch = document.querySelector('#toggleSwitch');
  const toggleText = document.querySelector('#toggleText');

  toggleSwitch.addEventListener('click', () => {
    // this.checked
    toggleSwitch.checked
      ? (toggleText.textContent = text1)
      : (toggleText.textContent = text2);
  });
};

export default toggleSwitch;
