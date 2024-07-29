import loadEmployees from "./LoadEmployees";

const filter = (data) => {
  loadEmployees(data); // 초기 전체 목록 렌더링

  // 검색 필터
  const initializeSearch = (data) => {
    const searchInput = document.querySelector("#employeeSearchBox");

    searchInput.addEventListener("input", () => {
      const searchQuery = searchInput.value.trim().toLowerCase();
      const filteredList = data.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(searchQuery) ||
          employee.position.toLowerCase().includes(searchQuery)
        );
      });

      loadEmployees(filteredList);
    });
  };

  initializeSearch(data);
};

export default filter;
