import renderEditList from "./RenderEditList";
import spinner from "/src/Components/Spinner/Spinner";

const loadingSpinner = spinner();

const fetchUserList = async () => {
  const userId = sessionStorage.getItem("userId");

  try {
    loadingSpinner.show();
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const userData = await response.json();
    const user = userData.data.find((u) => u.id.toString() === userId);
    renderEditList(user);

    if (!user) {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    container.innerHTML = "<p>사용자 정보를 불러오는 데 실패했습니다.</p>";
  } finally {
    loadingSpinner.hide();
  }
};

export default fetchUserList;
