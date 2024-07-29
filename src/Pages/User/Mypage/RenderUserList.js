const renderUserList = (userData) => {
  const profileName = document.querySelector("[data-m-name]");
  const profilePosition = document.querySelector("[data-m-position]");
  const profileEmail = document.querySelector("[data-m-email]");
  const profilePhone = document.querySelector("[data-m-phone]");
  const profileImage = document.querySelector("[data-m-img]");

  profileName.innerHTML = userData.name;
  profilePosition.innerHTML = userData.position;
  profileEmail.innerHTML = userData.email;
  profilePhone.innerHTML = userData.phone;
  profileImage.src = userData.profileImage;

  const cleanedPhoneNumber = userData.phone.replace(/\D/g, ""); // 입력된 문자열에서 숫자만 추출
  profilePhone.innerHTML = cleanedPhoneNumber.replace(
    /(\d{3})(\d{4})(\d{4})/,
    "$1-$2-$3"
  ); // 전화번호 형식으로 변환
};

export default renderUserList;
