// Dán URL Web App Apps Script vào giữa hai dấu nháy sau khi triển khai.
const APPS_SCRIPT_URL = "DAN_LINK_APPS_SCRIPT_CUA_BAN_VAO_DAY";

async function sendForm(form, action, statusElement) {
  if (!APPS_SCRIPT_URL.startsWith("https://script.google.com/")) {
    statusElement.textContent = "Bạn cần thêm link Apps Script vào script.js trước.";
    return;
  }

  const data = Object.fromEntries(new FormData(form).entries());
  data.action = action;

  const button = form.querySelector("button");
  button.disabled = true;
  button.textContent = "Đang gửi...";

  try {
    // no-cors không cho trang web đọc phản hồi từ Google.
    // Vì vậy, dòng báo dưới đây chỉ xác nhận đã gửi yêu cầu từ trình duyệt,
    // không đảm bảo email đã vào hộp thư.
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    statusElement.textContent =
      "Đã gửi yêu cầu từ trình duyệt. Vui lòng chờ quản trị viên xác nhận.";
    form.reset();
  } catch (error) {
    statusElement.textContent =
      "Chưa gửi được. Kiểm tra kết nối mạng hoặc thử lại sau.";
  } finally {
    button.disabled = false;
    button.textContent =
      action === "order" ? "Gửi yêu cầu" : "Gửi yêu cầu KEY";
  }
}

document.getElementById("orderForm").addEventListener("submit", function (event) {
  event.preventDefault();
  sendForm(this, "order", document.getElementById("orderStatus"));
});

document.getElementById("keyForm").addEventListener("submit", function (event) {
  event.preventDefault();
  sendForm(this, "key_order", document.getElementById("keyStatus"));
});
