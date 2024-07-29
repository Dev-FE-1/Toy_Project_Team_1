import submitMileageData from "./SubmitMileageData";
import fetchMileageData from "./FetchMileageData";

const handleMileageSubmit = () => {
  const submitButton = document.querySelector(".modal-box__button");
  let isSubmitting = false;

  const submitMileage = async (event) => {
    event.preventDefault();

    if (isSubmitting) return; // 이미 제출 중이면 함수 종료

    isSubmitting = true;
    submitButton.disabled = true;

    const category = document.getElementById("environment-category").value;
    const score = document.getElementById("score").value;
    const date = document.getElementById("mileage-date").value;
    const imageFile = document.getElementById("mileage-image").files[0];

    if (!category || !score || !date || !imageFile) {
      alert("모든 항목을 입력해주세요.");
      isSubmitting = false;
      submitButton.disabled = false;
      return;
    }

    const formData = new FormData();
    formData.append("user", sessionStorage.getItem("userName"));
    formData.append("category", category);
    formData.append("score", score);
    formData.append("date", date);
    formData.append("image", imageFile);

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // } // formData 출력

    try {
      const response = await submitMileageData(formData);
      if (response.status === "OK") {
        alert("마일리지 신청이 완료되었습니다.");

        // 모달 닫기
        document.querySelector(".modal-box.active").classList.remove("active");
        document.querySelector("#modal__background").classList.remove("active");

        fetchMileageData(); // 업데이트된 데이터 호출 후 렌더링
      }
    } catch (error) {
      alert("마일리지 신청 중 오류가 발생했습니다.");
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
    }
  };

  // 이벤트 리스너를 한 번만 추가
  submitButton.removeEventListener("click", submitMileage);
  submitButton.addEventListener("click", submitMileage);
};

export default handleMileageSubmit;
