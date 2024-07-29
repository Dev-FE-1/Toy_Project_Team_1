import styles from "./EditEmployee.module.css";
import route from "/src/Router/Router";

// URL 쿼리 파라미터를 읽는 함수
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
    name: params.get("name"),
    position: params.get("position"),
    email: params.get("email"),
    birthday: params.get("birthday"),
    startDate: params.get("startDate"),
    phone: params.get("phone"),
    profileImage: params.get("profileImage"),
  };
};

// 폼을 채우는 함수
const fillEditForm = () => {
  const employeeData = getQueryParams();

  if (employeeData.id) {
    document.getElementById("name").textContent = employeeData.name;
    document.getElementById("positions").textContent = employeeData.position;
    document.getElementById("email").textContent = employeeData.email;
    document.getElementById("phone").textContent = employeeData.phone;
    // 날짜 형식 설정
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    document.getElementById("birthday").textContent = formatDate(
      employeeData.birthday
    );
    document.getElementById("joinday").textContent = formatDate(
      employeeData.startDate
    );
    document.querySelector('img[alt="profileimg"]').src =
      employeeData.profileImage;
  }
};

const renderEditEmployeePage = (container) => {
  container.innerHTML = `
  <div class="${styles.page}">
  <h1 class="${styles.page__title}">직원 관리 > 직원 상세</h1>

  <!-- 상단 추가 버튼 부분입니다. -->
  <div class="${styles.page__content}">
    <div class="${styles.page__button}">
    <button id="backButton" data-color='neutral' data-shape='block'>뒤로가기</button>
  </div>

  <!-- 직원 프로필 이미지 업로드 부분입니다. -->
  <div class="${styles.page__edit}">
    <img src="/public/images/_Avatar_.png" alt="profileimg">
  </div>

  <form class="infoform"action="#" method="post">
            <ul class="${styles.user__info}">
              <li class="${styles.info__name}">
                <label for="name"><h5>이름</h5></label>
                <div id="name" class="${styles.info__value}"></div>
              </li>

              <li class="${styles.info__position}">
                <label for="positions"><h5>직함</h5></label>
                <div id="positions" class="${styles.info__value}"></div>
              </li>

              <li class="${styles.info__email}">
                <label for="email"><h5>이메일</h5></label>
                <div id="email" class="${styles.info__value}"></div>
              </li>

              <li class="${styles.info__phonenumber}">
                <label for="phone"><h5>전화번호</h5></label>
                <div id="phone" class="${styles.info__value}"></div>
              </li>

              <li class="${styles.info__birthday}">
                <label for="birthday"><h5>생일</h5></label>
                <div id="birthday" class="${styles.info__value}"></div>
              </li>
              
              <li class="${styles.info__joinday}">
                <label for="joinday"><h5>입사일</h5></label>
                <div id="joinday" class="${styles.info__value}"></div>
              </li>
            </ul>
          </form>
  `;

  document.getElementById("backButton").addEventListener("click", () => {
    history.pushState(null, null, "/admin/employee");
    route();
  });

  // 페이지 로드 시 폼 채우기
  fillEditForm();
};

export default renderEditEmployeePage;
