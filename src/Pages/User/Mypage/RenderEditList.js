import { toastPopUp } from "/src/Components/Toast/Toast"; // 토스트 함수 불러오기
import route from "/src/Router/Router";

const renderEditList = (userdata) => {
  const fileInput = document.querySelector("[data-profile-input]");
  const deleteButton = container.querySelector("[data-profile-delete]"); // 이미지 삭제 버튼

  const formatDate = (dateString) => {
    if (!dateString) return ""; // 입력값이 없는 경우 빈 문자열 반환

    // 날짜 형식이 "yyyy-MM-dd"인 경우를 처리
    if (dateString.includes("-")) {
      return dateString; // 이미 올바른 형식이면 그대로 반환
    }

    // 날짜 형식이 "yyyy.MM.dd"인 경우를 처리
    const parts = dateString.split(".");
    if (parts.length !== 3) {
      console.error("Invalid date format:", dateString);
      return ""; // 잘못된 형식인 경우 빈 문자열 반환
    }

    const [year, month, day] = parts;

    // 월과 일이 한 자리 수인 경우 앞에 0을 붙임
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    console.log("Formatted date:", formattedDate); // 디버깅을 위한 로그

    return formattedDate;
  };

  const name = document.querySelector("[data-profile-name]");
  const positions = document.querySelector("[data-profile-positions]");
  const email = document.querySelector("[data-profile-email]");
  const phone = document.querySelector("[data-profile-phone]");
  const birthday = document.querySelector("[data-profile-birthday]");
  const joinday = document.querySelector("[data-profile-joinday]");
  const password = document.querySelector("[data-profile-password]");
  const imageContainer = document.querySelector("[data-profile-add-img]");

  let selectedFile = null; // 선택된 파일을 저장할 변수

  name.value = userdata.name || name.placeholder;
  positions.value = userdata.position;
  email.value = userdata.email || email.placeholder;
  phone.value = userdata.phone || phone.placeholder;
  birthday.value = formatDate(userdata.birthday);
  joinday.value = formatDate(userdata.startDate);
  password.value = userdata.password;

  // 이미지 설정 함수
  const setImage = (src, file) => {
    imageContainer.innerHTML = `<img src="${src}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover;">`;
    selectedFile = file; // 선택된 파일 저장
  };

  // 기본 이미지 설정 함수
  const setDefaultImage = () => {
    setImage("/public/images/defaultProfile.png");
  };

  // 저장된 이미지 로드 함수
  const loadSavedImage = () => {
    if (userdata.profileImage) {
      setImage(userdata.profileImage);
    } else {
      setDefaultImage();
    }
  };

  // 프로필 이미지 선택 함수
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result, file);
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 처리 함수
  const handleFileDelete = (event) => {
    event.preventDefault();
    setDefaultImage();
    //selectedFile = null; // 선택된 파일 초기화
    selectedFile = "/public/images/defaultProfile.png";
  };

  fileInput.addEventListener("change", handleFileSelect); //프로필 이미지 변경
  deleteButton.addEventListener("click", handleFileDelete); // 이미지 삭제

  loadSavedImage();

  // 변경사항 저장
  document.getElementById("saveButton").addEventListener("click", async () => {
    const userId = sessionStorage.getItem("userId");
    const formData = new FormData();

    formData.append(
      "name",
      document.querySelector("[data-profile-name]").value
    );
    formData.append(
      "email",
      document.querySelector("[data-profile-email]").value
    );
    formData.append(
      "position",
      document.querySelector("[data-profile-positions]").value
    );
    formData.append(
      "phone",
      document.querySelector("[data-profile-phone]").value
    );
    formData.append(
      "birthday",
      document.querySelector("[data-profile-birthday]").value
    );
    formData.append(
      "startDate",
      document.querySelector("[data-profile-joinday]").value
    );
    formData.append(
      "password",
      document.querySelector("[data-profile-password]").value
    );

    // selectedFile이 null이면 현재 이미지 컨테이너의 src 값을 사용
    if (!selectedFile) {
      const currentImage = imageContainer.querySelector("img");
      if (currentImage) {
        selectedFile = currentImage.src;
      }
    }

    if (selectedFile) {
      // selectedFile이 문자열(URL)인 경우와 File 객체인 경우를 구분
      if (typeof selectedFile === "string") {
        formData.append("profileImage", selectedFile);
      } else {
        formData.append("profileImage", selectedFile, selectedFile.name);
      }
      sessionStorage.setItem("userProfileImage", selectedFile);
    }

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const result = await response.json();

      if (result.status === "OK") {
        toastPopUp();
        selectedFile = null; // 파일 선택 초기화
        setTimeout(() => {
          history.pushState(null, null, "/user/mypage");
          route();
        }, 2000);
      } else {
        console.error("직원 추가 오류:", result.error);
        alert("직원 추가 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("사용자 정보 업데이트에 실패했습니다. 다시 시도해 주세요.");
    }
  });
};

export default renderEditList;
