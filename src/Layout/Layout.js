const renderLayout = (container) => {
  container.innerHTML = `
      <div id="responsive-nav"></div>
      <div id="container">
        <nav id="nav"></nav>
        <div id="contents"></div>
      </div>
      `;
};

export default renderLayout;
