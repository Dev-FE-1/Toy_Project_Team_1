import route from "./Router/Router";

const navigate = (event) => {
  const anchor = event.target.closest("a");

  if (anchor?.href) {
    event.preventDefault();
    history.pushState(null, null, anchor.href);
    route();
  }
};

const initApp = () => {
  window.addEventListener("popstate", route);
  document.body.addEventListener("click", navigate);

  route();
};

export default initApp;
