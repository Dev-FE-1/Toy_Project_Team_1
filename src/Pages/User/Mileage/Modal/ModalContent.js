// 마일리기 기준 알아보기 모달: modal-1
export const showMileageStandardContent = () => {
  return {
    modal_id: `mileage_1`,
    header: `마일리지 기준`,
    content: `
            <div class="mileage-standard">
            <div class="mileage-standard__icon seed">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 3.09723L7.05025 8.04697C4.31658 10.7806 4.31658 15.2128 7.05025 17.9465C9.78392 20.6801 14.2161 20.6801 16.9497 17.9465C19.6834 15.2128 19.6834 10.7806 16.9497 8.04697L12 3.09723ZM12 0.268799L18.364 6.63276C21.8787 10.1475 21.8787 15.846 18.364 19.3607C14.8492 22.8754 9.15076 22.8754 5.63604 19.3607C2.12132 15.846 2.12132 10.1475 5.63604 6.63276L12 0.268799Z"
                />
              </svg>
            </div>
            <div class="mileage-standard__description h5">
              [씨앗 단계] 0~10 마일리지
            </div>
          </div>

          <div class="mileage-standard">
            <div class="mileage-standard__icon sprout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.99805 3C9.48787 3 12.3812 5.55379 12.9112 8.8945C14.0863 7.72389 15.7076 7 17.498 7H21.998V9.5C21.998 13.0899 19.0879 16 15.498 16H12.998V21H10.998V13H8.99805C5.13205 13 1.99805 9.86599 1.99805 6V3H5.99805ZM19.998 9H17.498C15.0128 9 12.998 11.0147 12.998 13.5V14H15.498C17.9833 14 19.998 11.9853 19.998 9.5V9ZM5.99805 5H3.99805V6C3.99805 8.76142 6.23662 11 8.99805 11H10.998V10C10.998 7.23858 8.75947 5 5.99805 5Z"
                />
              </svg>
            </div>
            <div class="mileage-standard__description h5">
              [새싹 단계] 11~30 마일리지
            </div>
          </div>

          <div class="mileage-standard">
            <div  class="mileage-standard__icon leaf">
              <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L5.24077 18.9999C5.0786 19.912 4.99805 20.907 4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3ZM12.998 5C8.57977 5 4.99805 8.58172 4.99805 13C4.99805 13.3624 5.00125 13.7111 5.00759 14.0459C6.26198 12.0684 8.09902 10.5048 10.5019 9.13176L11.4942 10.8682C8.6393 12.4996 6.74554 14.3535 5.77329 16.9998L8.99805 17C15.0132 17 18.8692 13.0269 18.9949 5.38766C17.6229 5.52113 16.3481 5.436 14.7754 5.20009C13.6243 5.02742 13.3988 5 12.998 5Z"
                >
              </svg>
            </div>
            <div class="mileage-standard__description h5">
              [잎새 단계] 31~50 마일리지
            </div>
          </div>

          <div class="mileage-standard">
            <div class="mileage-standard__icon tree">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 7.26214 17.9831 7.5207 17.9504 7.77457C19.77 8.80413 21 10.7575 21 13C21 16.3137 18.3137 19 15 19H13V22H11V19H8.5C5.46243 19 3 16.5376 3 13.5C3 11.2863 4.30712 9.37966 6.19098 8.50704C6.06635 8.02551 6 7.52039 6 7ZM7.00964 10.3319C5.82176 10.8918 5 12.1008 5 13.5C5 15.433 6.567 17 8.5 17H15C17.2091 17 19 15.2091 19 13C19 11.3056 17.9461 9.85488 16.4544 9.27234L15.6129 8.94372C15.7907 8.30337 16 7.67183 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 8.30783 8.6266 9.46903 9.60019 10.2005L8.39884 11.7995C7.85767 11.3929 7.38716 10.8963 7.00964 10.3319Z"
                />
              </svg>
            </div>
            <div class="mileage-standard__description h5">
              [나무 단계] 50 마일리지 달성!
            </div>
          </div>
          `,
  };
};

// 마일리지 신청 모달: modal-2
export const showMileageApproveContent = () => {
  return {
    modal_id: `mileage_2`,
    header: `마일리지 신청`,
    content: `
          <div class="modal-box__form">
            <div class="form-group">
              <h5>카테고리</h5>
              <select id="environment-category">
                <option disabled selected value="">카테고리를 선택하세요.</option>
                <option>재활용 및 분리수거</option>
                <option>대중교통 및 자전거 이용</option>
                <option>에너지 절약</option>
                <option>재사용 및 업사이클링</option>
                <option>친환경 제품 구매</option>
              </select>
            </div>

            <div class="form-group">
              <h5>점수</h5>
              <select id="score">
                <option value="" disabled selected>점수를 선택하세요.</option>
                <option value="1">1점</option>
                <option value="2">2점</option>
                <option value="3">3점</option>
              </select>
            </div>

            <div class="form-group">
              <h5>신청일자</h5>
              <input id="mileage-date" data-shape="line" type="date" />
            </div>

            <div class="form-group">
              <h5>증빙자료</h5>
              <input
                data-shape="line"
                type="file"
                id="mileage-image"
                name=""
                accept="image/png, image/jpeg"
                multiple
              />
            </div>
          </div>

          <button
            class="modal-box__button"
            data-color="positive"
            data-shape="block"
          >
            신청하기
          </button>
          </div>`,
  };
};
