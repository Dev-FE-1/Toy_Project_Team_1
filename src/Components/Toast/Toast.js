import styles from "../../Pages/User/Mypage/Editpage.module.css";

export function toastPopUp() {
  const toast = document.querySelector(`.${styles.toastMessage}`);
  if (toast) {
    toast.classList.add(styles.active);
    setTimeout(() => {
      toast.classList.remove(styles.active);
    }, 2000); // 2초 후에 토스트 메시지를 숨깁니다.
  } else {
    console.error("toastMessage 요소를 찾을 수 없습니다.");
  }
}
