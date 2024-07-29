import renderPageNotFound from "../Pages/PageNotFound/PageNotFound";
import renderLayout from "../Layout/Layout";
import renderLogin from "../Pages/Login/Login";
import { isLoggedIn, getUserRole } from "../Pages/Login/ValidateLogin";
import renderAdminResponsiveNavBar from "../Components/ResponsiveNavBar/Admin/ResponsiveNavBar";
import renderUserResponsiveNavBar from "../Components/ResponsiveNavBar/User/ResponsiveNavBar";
import renderAdminNavBar from "../Components/NavBar/Admin/NavBar";
import renderUserNavBar from "../Components/NavBar/User/NavBar";
import renderAdminDashboard from "../Pages/Admin/Dashboard/Dashboard";
import renderUserDashboard from "../Pages/User/Dashboard/Dashboard";
import renderAdminMileage from "../Pages/Admin/Mileage/Mileage";
import renderUserMileage from "../Pages/User/Mileage/Mileage";
import renderUserMileageHistory from "../Pages/User/Mileage/History/History";
import renderAdminEmployee from "../Pages/Admin/Employee/Employee";
import renderAddEmployeePage from "../Pages/Admin/Employee/AddEmployee";
import renderEditEmployeePage from "../Pages/Admin/Employee/EditEmployee";
import renderUserMypage from "../Pages/User/Mypage/Mypage";
import renderUserEditpage from "../Pages/User/Mypage/Editpage";
import renderAdminNotices from "../Pages/Admin/Notices/Notices";
import renderUserNotices from "../Pages/User/Notices/Notices";
import renderAdminApproval from "../Pages/Admin/Approval/Approval";
import renderUserApproval from "../Pages/User/Approval/Approval";
import renderAdminNoticesDetail from "../Pages/Admin/Notices/Detail/Detail";
import renderUserNoticesDetail from "../Pages/User/Notices/Detail/Detail";
import renderAdminAddNotices from "../Pages/Admin/Notices/Add/Add";

const route = () => {
  let path = window.location.pathname;
  // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isLoggedIn()) {
    history.pushState(null, null, "/");
    path = window.location.pathname;
  }
  // url을 통한 페이지 이동 시, 사용자 검증 함수
  if (!path.includes(getUserRole()) && path !== "/") {
    history.pushState(null, null, "/unauthorized");
    path = window.location.pathname;
  }

  const root = document.querySelector("#root");
  // App.js에서 renderLogin(root)로 renderLayout이 사라짐
  // layout이 있어야 #nav, #contents가 생성
  renderLayout(root);

  const responseNavBar = document.querySelector("#responsive-nav");
  const navBar = document.querySelector("#nav");
  const contents = document.querySelector("#contents");

  // 현재 url에 user/admin 포함 여부에 따른 NavBar 렌더링
  if (path.includes("user")) {
    // 네비게이션 바
    // [input] 삽입할 요소, 내용
    renderUserNavBar(navBar, [
      { path: "/user/dashboard", label: "대시보드" },
      { path: "/user/approval", label: "전자결재" },
      { path: "/user/notices", label: "공지사항" },
      { path: "/user/mileage", label: "마일리지" },
      { path: "/user/mypage", label: "마이페이지" },
    ]);
    renderUserResponsiveNavBar(responseNavBar);
    // 모바일 버전 반응형 헤더
  } else if (path.includes("admin")) {
    renderAdminNavBar(navBar, [
      { path: "/admin/dashboard", label: "대시보드" },
      { path: "/admin/approval", label: "전자결재 관리" },
      { path: "/admin/employee", label: "직원 관리" },
      { path: "/admin/mileage", label: "마일리지 관리" },
      { path: "/admin/notices", label: "공지사항 관리" },
    ]);
    // 모바일 버전 반응형 헤더
    renderAdminResponsiveNavBar(responseNavBar);
  }

  switch (path) {
    case "/":
      renderLogin(root);
      // hamburger();
      break;
    case "/user/dashboard":
      renderUserDashboard(contents);
      break;
    case "/user/approval":
      renderUserApproval(contents);
      break;
    case "/user/notices":
      renderUserNotices(contents);
      break;
    case "/user/notices/detail":
      renderUserNoticesDetail(contents);
      break;
    case "/user/mileage":
      renderUserMileage(contents);
      break;
    case "/user/mileage/history":
      renderUserMileageHistory(contents);
      break;
    case "/user/mypage":
      renderUserMypage(contents);
      break;
    case "/user/mypage/editpage":
      renderUserEditpage(contents);
      break;
    //admin
    case "/admin/dashboard":
      renderAdminDashboard(contents);
      break;
    case "/admin/approval":
      renderAdminApproval(contents);
      break;
    case "/admin/employee":
      renderAdminEmployee(contents);
      break;
    case "/admin/employee/add":
      renderAddEmployeePage(contents);
      break;
    case "/admin/employee/edit":
      renderEditEmployeePage(contents);
      break;
    case "/admin/mileage":
      renderAdminMileage(contents);
      break;
    case "/admin/notices":
      renderAdminNotices(contents);
      break;
    case "/admin/notices/detail":
      renderAdminNoticesDetail(contents);
      break;
    case "/admin/notices/add":
      renderAdminAddNotices(contents);
      break;
    case "/unauthorized":
      renderPageNotFound(root);
    default:
      renderPageNotFound(root);
      break;
  }
};

export default route;
