const approveMileageRequest = async (id) => {
  try {
    const response = await fetch(`/api/mileage/${id}/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isApprove: true }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.status === "OK") {
      alert("마일리지가 승인되었습니다.");
      return true;
    } else {
      throw new Error(data.message || "알 수 없는 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error("마일리지 승인 중 오류 발생:", error);
    alert("마일리지 승인 중 오류가 발생했습니다: " + error.message);
    return false;
  }
};

export default approveMileageRequest;
