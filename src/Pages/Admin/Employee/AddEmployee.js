import styles from "./AddEmployee.module.css";
import AddEmployee from "./HandleAddEmployee";

const renderAddEmployeePage = (container) => {
  container.innerHTML = `
  <div class="${styles.page}">
  <h1 class="${styles.page__title}">직원 관리 >직원 추가</h1>

  <!-- 상단 추가 버튼 부분입니다. -->
  <div class="${styles.page__content}">
    <div class="${styles.page__button}">
    <button data-e-back data-color='warning' data-shape='block'>뒤로가기</button>
    <button data-e-add data-color='positive' data-shape='block'>추가하기</button>
  </div>
  <form id="employeeForm" enctype="multipart/form-data">
    <div class="${styles.imageContainer}">
      <span data-e-add-img class="${styles.imageContainer__image}"></span>
    </div>

      <div data-e-form>
        <div class="${styles.imgBtnContainer}">
            <button data-e-delete data-shape="line" data-color="neutral" class="${styles.info__fileDelete}">이미지 삭제</button>
            <label for="fileInput" class="${styles.info__fileLabel}">이미지 등록</label>
        </div>
        <input data-e-input id="fileInput" class="${styles.info__fileInput}" type="file" name="profileImage" accept="image/*">
        <button class="${styles.uploadProfile}" type="submit">이미지 업로드</button>
      </div>
            <ul class="${styles.user__info}">
              <li class="${styles.info__name}">
                <label for="name"><h5>이름</h5></label>
                <input  data-e-name data-shape="line" type="name" id="name" placeholder="홍길동" required/>
              </li>

              <li class="${styles.info__position}">
                <label for="positions"><h5>직함</h5></label>
                <select data-e-positions name="positions" id="positions" required>
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
                <input data-e-email data-shape="line" type="email" name="email" id="email" placeholder="eco@taeco.com" required/>
              </li>

              <li class="${styles.info__phonenumber}">
                <label for="phone"><h5>전화번호</h5></label>
                <input data-e-phone data-shape="line" name="phone" type="tel" id="phone" placeholder="010-0000-0000" required/>
              </li>

              <li class="${styles.info__birthday}">
                <label for="birthday"><h5>생일</h5></label>
                <input data-e-birthday data-shape="line"name="birthday"  type="date" id="birthday" required/>
              </li>
              
              <li class="${styles.info__joinday}">
                <label for="joinday"><h5>입사일</h5></label>
                <input data-e-joinday data-shape="line" name="startDate" type="date" id="joinday" required/>
              </li>
            </ul>
          </form>
  `;

  AddEmployee(); //직원추가
};

export default renderAddEmployeePage;
