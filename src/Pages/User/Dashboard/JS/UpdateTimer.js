import { getCurrentTime } from '../JS/CurrentDate';

// 모달 시간을 1초마다 현재시간을 업데이트하는 함수
export const startTimeUpdate = () => {
  const updateTime = () => {
    const modalTimeElements = document.querySelectorAll('[data-time-element]');
    if (modalTimeElements) {
      modalTimeElements.forEach(
        (element) => (element.textContent = getCurrentTime())
      );
    }
  };

  updateTime(); // 즉시 한 번 실행: 현재시간을 넣어줌
  const intervalId = setInterval(updateTime, 1000); // 1초마다 업데이트

  return intervalId; // intervalId를 반환하여 나중에 정지할 수 있게 함
};

// 현재시간 업데이트를 멈추는 함수
export const stopTimeUpdate = (intervalId) => {
  if (intervalId) clearInterval(intervalId);
};
