const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyO2Q4UPVQKHS_Ts0Lu2WrucZSujH23Zxy4KtHXLVlq_5Qs9pCY-si3SknlQg058mIFhw/exec";

async function submitHomework() {
  const name = document.getElementById("name")?.value.trim() || "";
  const key = document.getElementById("key")?.value.trim() || "";
  const title = document.getElementById("title")?.value.trim() || "";
  const content = document.getElementById("content")?.value.trim() || "";
  const result = document.getElementById("result");

  if (!name || !key || !title || !content) {
    alert("Vui lòng nhập đầy đủ họ tên, KEY, tên bài và nội dung bài tập.");
    return;
  }

  const data = new URLSearchParams({
    action: "submit_order",
    key: key,
    name: name,
    phone: "Không cung cấp",
    address: "Bài tập Tin học",
    order: "Tên bài: " + title + "\nNội dung: " + content
  });

  if (result) result.textContent = "Đang gửi bài...";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: data
    });

    if (result) {
      result.textContent = "Đã gửi yêu cầu. Vui lòng chờ xác nhận.";
    }
    alert("Đã gửi yêu cầu. Hãy chờ xác nhận.");
  } catch (error) {
    if (result) result.textContent = "Lỗi kết nối. Vui lòng thử lại.";
    alert("Không gửi được bài. Hãy kiểm tra mạng.");
  }
}
