import renderUserList from "./RenderUserList";
import { getUserId } from "/src/Pages/Login/ValidateLogin";
import spinner from "/src/Components/Spinner/Spinner";

// 로딩 스피너
const loadingSpinner = spinner();

const fetchUserData = async () => {
  try {
    loadingSpinner.show();
    const userId = getUserId();
    if (!userId) {
      throw new Error("User not logged in");
    }

    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userData = await response.json();

    const currentUser = userData.data.find(
      (user) => user.id.toString() === userId
    );
    if (currentUser) {
      renderUserList(currentUser);
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    renderUserList(null);
  } finally {
    loadingSpinner.hide();
  }
};

export default fetchUserData;
