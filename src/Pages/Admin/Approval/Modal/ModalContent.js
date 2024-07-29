export const showApprovalDetailAdminContentNull = (item) => {
  return {
    modal_id: `approvaladminnull_${item.id}`,
    header: `${item.title}`,
    content: `
    <div class="modal-box__form">
      <input data-a-id
        data-shape="line"
        type="text"
        value='${item.id}'
        readonly
        style="display: none;"/>
      <div class="form-group">
        <h5>카테고리</h5>
        <input data-a-category
          data-shape="line"
          type="text"
          value='${item.category}'
          readonly/>
      </div>

      <div class="form-group">
        <h5>신청날짜</h5>
        <input data-shape="line" type="text" value='${item.startdate} - ${item.enddate}' readonly />
      </div>

      <div class="form-group">
        <h5>신청자</h5>
        <input data-a-user data-shape="line" type="text" value='${item.user}' readonly />
      </div>

      <div class="form-group">
        <h5>신청일자</h5>
        <input data-a-submitdate
          data-shape="line"
          type="text"
          value='${item.submitdate}'
          readonly/>
      </div>

      <div class="form-group">
        <h5>신청사유</h5>
        <input data-a-submitreason
          data-shape="line"
          type="text"
          value='${item.submitreason}'
          readonly/>
      </div>
            
      <div class="form-group">
        <h5>거절사유</h5>
        <textarea data-a-refusereason placeholder="내용을 입력해 주세요" maxlength="100"></textarea>
      </div>
    </div>

    <div class="modal-box__review-btns">
      <button data-approvalreject-btn
        id="reject-btn"
        class="modal-box__button"
        data-color="positive"
        data-shape="line">
        거절하기
      </button>
      <button data-approvalapproval-btn
        id="approve-btn"
        class="modal-box__button"
        data-color="positive"
        data-shape="block">
          수락하기
      </button>
    </div>
  `,
  };
};

export const showApprovalDetailAdminContent0 = (item) => {
  return {
    modal_id: `approvaladmin0_${item.id}`,
    header: `${item.title}`,
    content: `
    <div class="modal-box__form">
      <input data-a-id
        data-shape="line"
        type="text"
        value='${item.id}'
        readonly
        style="display: none;"/>
      <div class="form-group">
        <h5>카테고리</h5>
        <input data-a-category
          data-shape="line"
          type="text"
          value='${item.category}'
          readonly/>
      </div>

      <div class="form-group">
        <h5>신청날짜</h5>
        <input data-shape="line" type="text" value='${item.startdate} - ${item.enddate}' readonly />
      </div>

      <div class="form-group">
        <h5>신청자</h5>
        <input data-a-user data-shape="line" type="text" value='${item.user}' readonly />
      </div>

      <div class="form-group">
        <h5>신청일자</h5>
        <input data-a-submitdate
          data-shape="line"
          type="text"
          value='${item.submitdate}'
          readonly/>
      </div>

      <div class="form-group">
        <h5>신청사유</h5>
        <input data-a-submitreason
          data-shape="line"
          type="text"
          value='${item.submitreason}'
          readonly/>
      </div>
            
      <div class="form-group">
        <h5>거절사유</h5>
        <input data-a-refusereason
          data-shape="line"
          type="text"
          value='${item.refusereason}'
          readonly/>
      </div>
    </div>
        `,
  };
};

export const showApprovalDetailAdminContent1 = (item) => {
  return {
    modal_id: `approvaladmin1_${item.id}`,
    header: `${item.title}`,
    content: `
    <div class="modal-box__form">
      <input data-a-id
        data-shape="line"
        type="text"
        value='${item.id}'
        readonly
        style="display: none;"/>
      <div class="form-group">
        <h5>카테고리</h5>
        <input data-a-category
          data-shape="line"
          type="text"
          value='${item.category}'
          readonly/>
      </div>

      <div class="form-group">
        <h5>신청날짜</h5>
        <input data-shape="line" type="text" value='${item.startdate} - ${item.enddate}' readonly />
      </div>

      <div class="form-group">
        <h5>신청자</h5>
        <input data-a-user data-shape="line" type="text" value='${item.user}' readonly />
      </div>

      <div class="form-group">
        <h5>신청일자</h5>
        <input data-a-submitdate
          data-shape="line"
          type="text"
          value='${item.submitdate}'
          readonly/>
      </div>

      <div class="form-group">
        <h5>신청사유</h5>
        <input data-a-submitreason
          data-shape="line"
          type="text"
          value='${item.submitreason}'
          readonly/>
      </div>
    </div>
        `,
  };
};
