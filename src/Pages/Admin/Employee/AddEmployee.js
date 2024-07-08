import styles from "./AddEmployee.module.css";
import { showEmployeeAddCheck } from "./Modal/AddModalContent";
import route from "/src/Router/Router";

const renderAddEmployeePage = (container) => {
  container.innerHTML = `
  <div class="${styles.page}">
  <h1 class="${styles.page__title}">직원 관리 > 직원 추가</h1>

  <!-- 상단 추가 버튼 부분입니다. -->
  <div class="${styles.page__content}">
    <div class="${styles.page__button}">
    <button id="backButton" data-color='warning' data-shape='block'>뒤로가기</button>
    <button data-color='positive' data-shape='block'>추가하기</button>
  </div>

  <!-- 직원 프로필 이미지 업로드 부분입니다. -->
  <img src="/public/icons/user.svg" alt="profileimg">
  <form method="post" enctype="multipart/form-data">
    <button id="chooseFile"data-color='neutral' data-shape='line'><label for="chooseFile">이미지 등록</label></button>
    <input type="file" id="chooseFile" name="chooseFile" accept="image/*" onchange="loadFile(this)">
      
    <button id="changeFile" data-color='neutral' data-shape='line'><label for="chooseFile">이미지 삭제 </label></button>
    <input type="file" id="chooseFile" name="chooseFile" accept="image/*" onchange="loadFile(this)">
</form>

  <form action="#" method="post">
            <ul class="${styles.user__info}">
              <li class="${styles.info__name}">
                <label for="name"><h5>이름</h5></label>
                <input data-shape="line" type="name" id="name" placeholder="홍길동" required/>
              </li>

              <li class="${styles.info__position}">
                <label for="positions"><h5>직함</h5></label>
                <select name="positions" id="positions" required>
                  <option value="사장">사장</option>
                  <option value="부장">부장</option>
                  <option value="차장">차장</option>
                  <option value="과장">과장</option>
                  <option value="대리">대리</option>
                  <option value="사원">사원</option>
                </select>
              </li>

              <li class="${styles.info__email}">
                <label for="email"><h5>이메일</h5></label>
                <input data-shape="line" type="email" id="email" placeholder="eco@taeco.com" required/>
              </li>

              <li class="${styles.info__phonenumber}">
                <label for="phone"><h5>전화번호</h5></label>
                <input data-shape="line" type="number" id="phone" placeholder="010-0000-0000" required/>
              </li>

              <li class="${styles.info__birthday}">
                <label for="birthday"><h5>생일</h5></label>
                <input data-shape="line" type="date" id="birthday" required/>
              </li>
              
              <li class="${styles.info__joinday}">
                <label for="joinday"><h5>입사일</h5></label>
                <input data-shape="line" type="date" id="joinday" required/>
              </li>
            </ul>
          </form>
  `;

  document.getElementById("backButton").addEventListener("click", () => {
    history.pushState(null, null, "/admin/employee");
    route();
  });

  // 직원 수정 모달
  // renderModel(
  //   showEmployeeAddCheck().modal_id, // 모달 번호
  //   showEmployeeAddCheck().header, // 모달 헤더
  //   showEmployeeAddCheck().content //모달 내용
  // );
};

export default renderAddEmployeePage;
