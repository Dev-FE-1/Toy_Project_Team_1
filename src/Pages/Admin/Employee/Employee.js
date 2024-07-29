import styles from "./Employee.module.css";
import fetchEmployeeData from "./FetchEmployeeData";
import route from "/src/Router/Router";

const renderAdminEmployee = (container) => {
  container.innerHTML = `
  <h1>직원 관리</h1>
  
  <div class="${styles.pageEvent}">
    <div class="${styles.birthdayInfo}">
    <img src="/public/icons/cake.svg" alt="cake" />
    <h3><span class="${styles.eventBirthday}" id="todayBirthday">금일의 생일자: 로딩 중 ...</span></h3>
    </div>
    <div class="${styles.joindayInfo}">
    <img src="/public/icons/seedling.svg" alt="seedling" />
    <h3><span class="${styles.eventJoinday}" id="todayJoinDay">금일의 입사자: 로딩 중 ...</span></h3>
    </div>
  </div>

  <div class="${styles.pageHeader}">
    <input type="search" id="employeeSearchBox" name="search" placeholder="검색" />
    <button id="addEmployeeButton" data-color="positive" data-shape="block">직원 추가</button>
  </div>

  <h4 class="${styles.totalInfo}" id="totalEmployeeCount">총 인원: 로딩 중 ...</h4>

  <div class="${styles.table}">
    <table class="${styles.tableContainer}">
      <thead class="${styles.tableHead}">
        <tr class="${styles.headUserList}">
          <th class="${styles.headProfileImage}">사진</th>
          <th class="${styles.headName}">이름</th>
          <th class="${styles.headPosition}">직함</th>
          <th class="${styles.headEmail}">이메일</th>
          <th class="${styles.headBirthday}">생일</th>
          <th class="${styles.headJoinday}">입사일</th>
          <th class="${styles.headContact}">핸드폰 번호</th>
        </tr>
      </thead>
      <tbody class="${styles.employeeTableBody}" id="employeeTableBody"></tbody>    
    </table>
    
    <!-- 모바일 버전 -->
    <div class="${styles.employeeList}"></div>

  </div> 
  `;
  setupAddEmployeeButton();
  fetchAndDisplayEmployeeData();
};

// 총인원 기능 구현
// refactoring: 함수 분리
const fetchAndDisplayEmployeeData = async () => {
  const data = await fetchEmployeeData();
  if (data && data.length) {
    displayTotalEmployeeCount(data.length);
    displayTodayEvents(data);
  }
};
const displayTotalEmployeeCount = (count) => {
  document.getElementById(
    "totalEmployeeCount"
  ).innerText = `총 인원: ${count}명`;
};

// const fetchAndDisplayEmployeeData = async () => {
//   const data = await fetchEmployeeData();
//   if (data && data.length) {
//     document.getElementById(
//       "totalEmployeeCount"
//     ).innerText = `총 인원: ${data.length}명`;
//     displayTodayEvents(data);
//   }
// };

// 오늘의 입사자/생일자 기능 구현
const displayTodayEvents = (data) => {
  const today = new Date();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  const todayDate = today.getDate().toString().padStart(2, "0");

  const birthdayPeople = data.filter((employee) => {
    const [year, month, day] = employee.birthday.split(/[-.]/);
    const isBirthday = month === todayMonth && day === todayDate;
    return isBirthday;
  });

  const joinDayPeople = data.filter((employee) => {
    const [year, month, day] = employee.startDate.split(/[-.]/);
    const isJoinDay = month === todayMonth && day === todayDate;
    return isJoinDay;
  });

  const birthdayNames = birthdayPeople.map((person) => person.name).join(", ");
  const joinDayNames = joinDayPeople.map((person) => person.name).join(", ");

  document.getElementById("todayBirthday").innerText = `금일의 생일자: ${
    birthdayNames || "없음"
  }`;
  document.getElementById("todayJoinDay").innerText = `금일의 입사자: ${
    joinDayNames || "없음"
  }`;
};

// refactoring: 함수 분리
const setupAddEmployeeButton = () => {
  const addEmployeeButton = document.getElementById("addEmployeeButton");
  if (addEmployeeButton) {
    addEmployeeButton.addEventListener("click", handleAddEmployeeClick);
  }
};
const handleAddEmployeeClick = () => {
  history.pushState(null, null, "/admin/employee/add");
  route();
};

// const addEmployee = () => {
//   const addEmployeeButton = document.getElementById("addEmployeeButton");
//   if (addEmployeeButton) {
//     addEmployeeButton.addEventListener("click", () => {
//       history.pushState(null, null, "/admin/employee/add");
//       route();
//     });
//   }
// };

export default renderAdminEmployee;
