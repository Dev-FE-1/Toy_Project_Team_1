import registerNotice from "../JS/RegisterNotice";
import toggleSwitch from "/src/Components/ToggleSwitch/ToggleSwitch";
import toggle_styles from "/src/Components/ToggleSwitch/ToggleSwitch.module.css";
import styles from "../Add/Add.module.css";

const renderAdminAddNotices = (container) => {
  if (!container) {
    console.error("container element not found");
    return;
  }
  container.innerHTML = `
        <h1>새 공지사항 등록</h1>
            <div class="${styles.btnWrap}">
                <button data-cancel-btn class="${styles.btnWrap__cancel}" data-color="secondary" data-shape='line'>작성취소</button>
                <button data-add-btn class="${styles.btnWrap__add}" data-color="secondary" data-shape='block'>등록</button>
            </div>
        <section class="${styles.contents}">
            <input data-n-title data-shape='underline' type="text" placeholder="제목을 입력해주세요." style="width: 100%;"></input>
            <ul class="${styles.info}">
                <li class="${styles.info__items}">
                    <h5>카테고리</h5>
                    <select data-n-select name="category" required>
                        <option value="event">이벤트</option>
                        <option value="mileage">마일리지</option>
                        <option value="approval">전자결재</option>
                        <option value="hr">인사행정</option>
                        <option value="education">교육</option>
                        <option value="etc">기타</option>
                    </select>
                </li>
                <li class="${styles.info__items}">
                    <h5>필수공지로 등록</h5>
                    <div class="${toggle_styles.header__toggle}">
                        <label class="${toggle_styles.switch}">
                            <input data-n-toggle type="checkbox" id="toggleSwitch" />
                            <span class="${toggle_styles.slider}"></span>
                        </label>
                        <h4 id="toggleText">필수</h4>
                    </div>
                </li>
                <li class="${styles.info__items}">
                    <h5>첨부파일</h5>
                    <div class="${styles.info__addFile}">
                        <button class="${styles.uploadButton}">파일선택</button>
                        <input data-n-file type="file" class="${styles.fileInput}" class="hidden">
                        <div data-n-file-info></div>
                        <button data-n-remove-file class="${styles.removeFileButton}" style="display:none;">파일 삭제
                            <img src="/public/icons/close.svg" />
                        </button>
                    </div>
                </li>
            </ul>
            <textarea data-n-description data-shape='transparent'placeholder="내용을 입력해주세요."></textarea>
        </section>
  `;
  moveBack();
  toggleSwitch();
  registerNotice();
};

const moveBack = () => {
  const cancel = document.querySelector("[data-cancel-btn]");
  cancel.addEventListener("click", () => {
    history.back();
  });
};
export default renderAdminAddNotices;
