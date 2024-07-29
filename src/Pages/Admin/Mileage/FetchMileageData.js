import filterByToggle from "./FilterByToggle";
import spinner from "/src/Components/Spinner/Spinner";

// 로딩 스피너
const loadingSpinner = spinner();

const fetchMileageData = async () => {
  try {
    loadingSpinner.show();
    const response = await fetch("/api/mileage");
    const data = await response.json();
    if (data.status === "OK") {
      filterByToggle(data.data);
    }
  } catch (error) {
    console.error("Failed to fetch mileage data:", error);
  } finally {
    loadingSpinner.hide();
  }
};

export default fetchMileageData;
