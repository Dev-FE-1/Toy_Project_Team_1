// 마일리지 심사
export const showMileageListContent = (item) => {
  return {
    modal_id: `mileage_${item.id}`,
    header: `마일리지 심사`,
    content: `
    <div class="modal-box__form">
            <div class="form-group">
              <h5>카테고리</h5>
                <input
                id="mileage-approve-category_${item.id}"
                data-shape="line"
                type="text"
                value='${item.category}'
                readonly
                autocomplete="off"
              />
            </div>

            <div class="form-group">
              <h5>점수</h5>
              <input id="mileage-approve-score_${item.id}" data-shape="line" type="text" value='${item.score}' readonly autocomplete="off"/>
            </div>

            <div class="form-group">
              <h5>신청자</h5>
              <input id="mileage-approve-employee_${item.id}" data-shape="line" type="text" value='${item.user}' readonly autocomplete="off"/>
            </div>

            <div class="form-group">
              <h5>신청일자</h5>
              <input
                id="mileage-approve-date_${item.id}"
                data-shape="line"
                type="text"
                value='${item.date}'
                readonly
                autocomplete="off"
              />
            </div>

            <div class="form-group">
              <h5>거절사유</h5>
              <select id="rejection-reason">
                <option disabled selected value="none">거절사유 선택</option>
                <option value="점수 작성 오류">점수 작성 오류</option>
                <option value="카테고리 작성 오류">카테고리 작성 오류</option>
                <option value="증빙자료 누락">증빙자료 누락</option>
              </select>
            </div>
          </div>

          <div class="modal-box__review-btns">
            <button
              id="reject-btn-${item.id}"
              class="modal-box__button"
              data-color="positive"
              data-shape="line"
              data-id="${item.id}"
            >
              거절하기
            </button>
            <button
              id="approve-btn-${item.id}"
              class="modal-box__button"
              data-color="positive"
              data-shape="block"
              data-id="${item.id}"
              >
              수락하기
            </button>
          </div>
    `,
  };
};
