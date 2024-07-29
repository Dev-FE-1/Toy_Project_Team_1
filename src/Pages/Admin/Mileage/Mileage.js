import styles from './Mileage.module.css';
import fetchMileageData from './FetchMileageData';
import toggle_styles from '/src/Components/ToggleSwitch/ToggleSwitch.module.css';
import toggleSwitch from '/src/Components/ToggleSwitch/ToggleSwitch';

const renderAdminMileage = (container) => {
  container.innerHTML = `
     <div class="${styles['mileage-contents']}">
      <h1 class="${styles.title}">마일리지 관리</h1>

      <div class="${styles.header}">
        <div class="${toggle_styles.header__toggle}">
          <!-- input checkbox의 토글 속성을 label로 연결시켜 활용 -->
          <label class="${toggle_styles.switch}">
            <input type="checkbox" id="toggleSwitch" />
            <span class="${toggle_styles.slider}"></span>
          </label>
          <h4 id="toggleText">미확인</h4>
        </div>

        <h6>총 <span id="total-item"></span>개의 게시글</h6>
      </div>

      <div class="${styles['mileage-list']}"></div>
    </div>
  `;

  toggleSwitch('확인', '미확인');
  fetchMileageData();
};

export default renderAdminMileage;
