import route from "../../Router/Router";

const validateLogin = async () => {
  const email = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();

    const user = userData.data.find(
      (user) => user.email === email && user.password === password.toString()
    );

    if (user) {
      if (user.position === "사장") {
        sessionStorage.setItem("userRole", "admin");
        sessionStorage.setItem("isLoggedIn", "true");
        window.history.pushState(null, null, "/admin/dashboard");
      } else {
        sessionStorage.setItem("userRole", "user");
        sessionStorage.setItem("isLoggedIn", "true");
        window.history.pushState(null, null, "/user/dashboard");
      }
      sessionStorage.setItem("userId", user.id);
      sessionStorage.setItem("userName", user.name);
      route();
      return;
    } else {
      alert("잘못된 이메일 또는 비밀번호입니다.");
      return;
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    return;
  }
};

export const logout = () => {
  sessionStorage.removeItem("userRole");
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("userPosition");
  window.history.pushState(null, null, "/");
  route();
};

export const getUserRole = () => sessionStorage.getItem("userRole");

export const isLoggedIn = () => sessionStorage.getItem("isLoggedIn") === "true";

export const getUserId = () => sessionStorage.getItem("userId");

export default validateLogin;
