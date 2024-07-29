const initNoticeDeleteHandler = () => {
  const noticeDeleteButton = document.querySelector("[data-n-delete]");

  noticeDeleteButton.addEventListener("click", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const noticeId = urlParams.get("id");

    if (!noticeId) {
      console.error("Notice ID not found");
      return;
    }

    if (confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
      try {
        const response = await fetch(`/api/notices/${noticeId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === "OK") {
          alert("공지사항이 성공적으로 삭제되었습니다.");
          window.location.href = "/admin/notices"; // 공지사항 목록 페이지로 이동
        } else {
          alert("공지사항 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Failed to delete notice:", error);
        alert("공지사항 삭제 중 오류가 발생했습니다.");
      }
    }
  });
};

export default initNoticeDeleteHandler;
