import styles from './dashboardModal.module.css';
import { getTodayDate, getCurrentTime } from '../JS/CurrentDate';

// 출근, 퇴근시간을 확인하는 모달 내용을 반환하는 함수
export const showCheckTimeContent = (type) => {
  const isCheckIn = type === 'in';
  return {
    modal_id: isCheckIn ? 'dashboard_1' : 'dashboard_2',
    header: isCheckIn ? '출근' : '퇴근',
    content: `
      <div class="${styles.checkTimeModal}">
        <h4>${getTodayDate()}</h4>
        <span data-time-element>${getCurrentTime()}</span>
        <h3>${isCheckIn ? '출근' : '퇴근'}하시겠습니까?</h3>
        <button id="${
          isCheckIn ? 'checkInBtn' : 'checkOutBtn'
        }" data-shape="block" data-color="positive">
          ${isCheckIn ? '출근' : '퇴근'}하기
        </button>
      </div>
    `,
  };
};
