const renderUserList = (data) => {
  // const profile = document.querySelector("[data-nav-img]");
  const name = document.querySelector("[data-nav-name]");
  const position = document.querySelector("[data-nav-position]");

  name.textContent = data.name;
  position.textContent = data.position;

  sessionStorage.setItem("userPosition", data.position);
};

export default renderUserList;
