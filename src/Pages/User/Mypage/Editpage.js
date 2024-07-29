import route from "/src/Router/Router";
import styles from "./Editpage.module.css";
import fetchUserList from "./FetchUserList";

const renderUserEditPage = (container) => {
  container.innerHTML = `
  <!-- 페이지 타이틀 -->
<h1 class=${styles.page__title}">마이페이지</h1>

<div class="${styles.page}">
<div class="${styles.page__header}">
  <h2>내정보</h2>
  <div>
  <button class="${styles.backButton}" data-color='warning' data-shape='block' id="backButton">뒤로가기</button>
  <button class="${styles.saveButton}" data-color='positive' data-shape='block' id="saveButton">변경사항 저장</button>
  </div>
</div>

<!-- 내 정보 사진 수정 부분입니다. -->
<div class="${styles.page__body}">
  <!-- 내 정보 입력 부분입니다. -->
  <div class="${styles.imageContainer}">
      <span data-profile-add-img class="${styles.imageContainer__image}"></span>
    </div>
    <div data-e-form>
      <div class="${styles.imgBtnContainer}">
        <button data-profile-delete data-shape="line" data-color="neutral" class="${styles.info__fileDelete}">이미지 삭제</button>
        <label for="fileInput" class="${styles.info__fileLabel}">이미지 등록</label>
      </div>
    <input data-profile-input id="fileInput" class="${styles.info__fileInput}" type="file" name="profileImage" accept="image/*">
  <button class="${styles.uploadProfile}" type="submit">이미지 업로드</button>
  </div>
  <form action="/submit-user-info" method="post">
    <ul class="${styles.user__info}">
      <li class="${styles.info__name}">
        <label for="name"><span>이름</span></label>
        <input data-profile-name data-shape="line" type="name" id="name" placeholder=""/>
      </li>
      
      <li class="${styles.info__position}">
        <label for="positions"><span>직함</span></label>
        <select data-profile-positions name="positions" id="positions" required>
          <option value="사장">사장</option>
          <option value="부장">부장</option>
          <option value="차장">차장</option>
          <option value="과장">과장</option>
          <option value="대리">대리</option>
          <option value="사원">사원</option>
        </select>
      </li>
      
      <li class="${styles.info__email}">
        <label for="email"><span>이메일</span></label>
        <input data-profile-email data-shape="line" type="email" id="email" placeholder="taeco@gmail.com"/>
      </li>
      
      <li class="${styles.info__password}">
        <label for="password"><span>비밀번호</span></label>
        <input data-profile-password data-shape="line" type="password" id="password" placeholder=""/>
      </li>

      <li class="${styles.info__number}">
        <label for="phone"><span>전화 번호</span></label>
        <input data-profile-phone data-shape="line" type="text" id="phone" placeholder="010-0000-0000"/>
      </li>

      <li class="${styles.info__birthday}">
        <label for="birthday"><span>생일</span></label>
        <input data-profile-birthday data-shape="line" type="date" id="birthday" required/>
      </li>
      
      <li class="${styles.info__joinday}">
        <label for="joinday"><span>입사일</span></label>
        <input data-profile-joinday data-shape="line" type="date" id="joinday" required/>
      </li>
    </ul>
  </form>
</div>

<!-- 정보 수정 완료 토스트 부분입니다. -->
<div class="${styles.pageFooter}">
    <div class="${styles.toastMessage}" id="toastMessage">
      <img src="/public/icons/check.svg" alt="check">
      <div class="${styles.toastText}" id="toastText">
        <h4>정보 수정</h4>
        <h5>수정이 완료되었습니다.</h5>
      </div>
    </div>
    </div>
</div>
  `;

  fetchUserList();

  document
    .querySelector(`.${styles.backButton}`)
    .addEventListener("click", () => {
      history.pushState(null, null, "/user/mypage");
      route();
    });
};

export default renderUserEditPage;
