import styles from "./Login.module.css";
import validateLogin from "./ValidateLogin";

const login = (container) => {
  // return으로 하면, 바로 종료가 되므로 추가 로직 구현 불가능
  container.innerHTML = `
      <section class="${styles.loginLayout}">
      <div class="${styles.loginContainer}">
        <img src="/public/images/company_logo_user.png" alt="logo img" />
        <form class="${styles.loginContainer__form}">
        <h5>아이디</h5>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="아이디를 입력해주세요."
            data-shape="line"
            autocomplete="off"
            required
          />
        <h5>비밀번호</h5>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            data-shape="line"
            autocomplete="off"
            required
          />
          <button
            id="login__button"
            class="${styles.loginBtn}"
            type="button"
            data-shape="block"
            data-color="positive"
          >
            로그인
          </button>
        </form>
      </div>
    </section>
  `;

  document
    .querySelector("#login__button")
    .addEventListener("click", validateLogin);

  const form = document.querySelector(`.${styles.loginContainer__form}`);
  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      validateLogin();
    }
  });
};

export default login;
