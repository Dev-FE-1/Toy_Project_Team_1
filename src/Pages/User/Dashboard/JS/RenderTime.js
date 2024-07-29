
import styles from '../Dashboard.module.css';
import { getTodayDate, getCurrentTime } from '../JS/CurrentDate';
import { startTimeUpdate, stopTimeUpdate } from '../JS/UpdateTimer';


const renderTime = () => {
  const recordStartTimeBtn = document.querySelector(
    `.${styles.recordStartTimeBtn}`
  );
  const recordEndTimeBtn = document.querySelector(
    `.${styles.recordEndTimeBtn}`
  );
  const todayElement = document.querySelector(
    `.${styles.userDashboard__today}`
  );
  const statusElement = document.querySelector(
    `.${styles.userDashboard__todayTag}`
  );
  const weeklyWorkHoursElement = document.querySelector(
    `.${styles.userDashboard__attendanceTime} h3`
  );

  const Storage = {
    get: (key) => localStorage.getItem(key),
    set: (key, value) => localStorage.setItem(key, value),
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear(),
  };

  const ButtonManager = {
    disable: (button, time) => {
      button.disabled = true;
      button.style.pointerEvents = "none";
      button.style.opacity = "0.5";
      button.removeAttribute("data-modal-target");
      button.querySelector("h2").textContent = time || "-";
    },
    enable: (button, modalTarget) => {
      button.disabled = false;
      button.style.pointerEvents = "auto";
      button.style.opacity = "1";
      button.setAttribute("data-modal-target", modalTarget);
      button.querySelector("h2").textContent = "-";
    },
  };

  const updateStatus = () => {
    const isCheckedIn = Storage.get('isCheckedIn') === 'true';
    const isCheckedOut = Storage.get('isCheckedOut') === 'true';

    if (isCheckedIn && !isCheckedOut) {
      statusElement.textContent = '근무 중';
      statusElement.style.backgroundColor = '#40b883';
    } else if (isCheckedOut) {
      statusElement.textContent = '퇴근';
      statusElement.style.backgroundColor = '#212635';
    } else {
      statusElement.textContent = '출근 전';
    }
  };

  const updateButtonStates = () => {

    const isCheckedIn = Storage.get('isCheckedIn') === 'true';
    const isCheckedOut = Storage.get('isCheckedOut') === 'true';

    if (isCheckedIn && !isCheckedOut) {
      ButtonManager.disable(recordStartTimeBtn, Storage.get('checkInTime'));
      ButtonManager.enable(recordEndTimeBtn, '#modal-dashboard_2');
    } else if (!isCheckedIn) {
      ButtonManager.enable(recordStartTimeBtn, '#modal-dashboard_1');
      ButtonManager.disable(recordEndTimeBtn);
    } else if (isCheckedOut) {
      ButtonManager.disable(recordStartTimeBtn, Storage.get('checkInTime'));
      ButtonManager.disable(recordEndTimeBtn, Storage.get('checkOutTime'));
    }
    updateStatus();
  };


  const calculateWorkHours = () => {
    const checkInTime = Storage.get('checkInTime');
    const checkOutTime = Storage.get('checkOutTime');
    if (checkInTime && checkOutTime) {
      const start = new Date(`1970-01-01T${checkInTime}`);
      const end = new Date(`1970-01-01T${checkOutTime}`);
      return (end - start) / (1000 * 60 * 60); // 시간 단위로 반환
    }
    return 0;
  };

  const updateWeeklyWorkHours = () => {
    let weeklyHours = parseInt(Storage.get('weeklyWorkHours') || '8'); // 기본값을 8시간으로 설정
    weeklyHours += Math.round(calculateWorkHours()); // 소수점 반올림
    Storage.set('weeklyWorkHours', weeklyHours.toString());
    weeklyWorkHoursElement.textContent = `총 ${weeklyHours}시간 근무`;
  };

  const recordTime = (isCheckIn) => {
    const currentTime = getCurrentTime();
    if (isCheckIn) {

      Storage.set('checkInTime', currentTime);
      Storage.set('isCheckedIn', 'true');
      startTimeUpdate();
    } else {
      Storage.set('checkOutTime', currentTime);
      Storage.set('isCheckedOut', 'true');
      stopTimeUpdate();
      updateWeeklyWorkHours();
    }
    updateButtonStates();
  };

  const addModalEventListeners = () => {

    document
      .querySelector('#checkInBtn')
      ?.addEventListener('click', () => recordTime(true));
    document
      .querySelector("#checkOutBtn")
      ?.addEventListener("click", () => recordTime(false));
  };

  const resetTimes = () => {

    updateWeeklyWorkHours(); // 자정에 총 근무 시간 업데이트
    Storage.remove('checkInTime');
    Storage.remove('checkOutTime');
    Storage.remove('isCheckedIn');
    Storage.remove('isCheckedOut');
    stopTimeUpdate();
    updateButtonStates();
  };

  const checkDateChanged = () => {
    const currentDate = getTodayDate();
    const storedDate = Storage.get('currentDate');

    if (currentDate !== storedDate) {
      todayElement.textContent = currentDate;
      Storage.set('currentDate', currentDate);
      resetTimes();

      // 월요일이면 주간 근무 시간 초기화 (8시간으로)
      const today = new Date();
      if (today.getDay() === 1) {
        // 0은 일요일, 1은 월요일
        Storage.set('weeklyWorkHours', '8');
        weeklyWorkHoursElement.textContent = '총 8시간 근무';
      }
    }
  };

  const initialize = () => {
    const currentDate = getTodayDate();
    todayElement.textContent = currentDate;
    Storage.set('currentDate', currentDate);

    checkDateChanged();
    updateButtonStates();
    addModalEventListeners();

    // 주간 근무 시간 초기 표시
    const weeklyHours = parseInt(Storage.get('weeklyWorkHours') || '8');
    weeklyWorkHoursElement.textContent = `총 ${weeklyHours}시간 근무`;

    setInterval(checkDateChanged, 60000);
  };

  initialize();
  // localStorage.clear(); //출근, 퇴근버튼 다시 활성화시키기
};

export default renderTime;
