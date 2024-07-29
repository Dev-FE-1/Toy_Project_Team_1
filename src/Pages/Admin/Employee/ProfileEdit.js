const defaultImagePath = "/public/images/_Avatar_.png"; // 디폴트 이미지, 이미지 삭제되었을 때 이 이미지로 돌아갑니다.

export function loadFile(input) {
  const file = input.files[0]; // 선택한 첫 번째 파일을 가져옵니다.
  if (file) {
    // 파일 유형 확인
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"]; // 허용되는 이미지 파일 형식을 배열로 정의합니다.
    if (!validImageTypes.includes(file.type)) {
      alert("이미지 파일만 업로드 가능합니다."); // 파일의 유형이 허용된 형식에 포함되지 않으면 경고메세지를 표시하고 함수를 종료합니다.
      return;
    }

    // 이미지 미리보기
    const reader = new FileReader();
    reader.onload = function (e) {
      // 파일이 성공적으로 읽히면 실행할 함수를 정의합니다.
      const previewImage = document.getElementById("previewImage"); // id가 previewImage인 이미지 요소를 가져옵니다.
      previewImage.src = e.target.result; // 읽혀진 파일의 데이터를 미리보기 이미지의 scr 속성에 설정합니다.
    };
    reader.readAsDataURL(file); // 파일을 읽어서 데이터 URL로 변환합니다. 이 데이터 URL은 이미지의 미리보기를 생성하는 데 사용됩니다.
  }
}

export function resetToDefaultImage() {
  const previewImage = document.getElementById("previewImage"); // id가 previewImage인 이미지 요소를 가져옵니다.
  previewImage.src = defaultImagePath; // 이미지 요소의 src 속성을 기본 이미지 경로 (defaultImagePath)로 설정합니다. 이를 통해 미리보기 이미지를 기본 이미지로 되돌립니다.
}
