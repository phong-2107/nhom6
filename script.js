// Chuyển đổi giữa form đăng nhập và đăng ký
function switchForm() {
  const container = document.querySelector(".container");
  container.classList.toggle("active");
}

// Xử lý form đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.querySelector('input[type="password"]');
  const showPasswordIcon = document.querySelector(".show-password");

  // Xử lý hiện/ẩn mật khẩu
  showPasswordIcon.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
    } else {
      passwordInput.type = "password";
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash");
    }
  });

  // Xử lý đăng nhập
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    if (validateLogin(email, password)) {
      // Thêm hiệu ứng loading khi đăng nhập
      const button = this.querySelector("button");
      button.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Đang đăng nhập...';
      button.disabled = true;

      // Giả lập đăng nhập (thay thế bằng API thực tế)
      setTimeout(() => {
        alert("Đăng nhập thành công!");
        button.innerHTML = "Đăng nhập";
        button.disabled = false;
      }, 1500);
    }
  });

  // Kiểm tra form
  function validateLogin(email, password) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showError("email");
      isValid = false;
    }

    if (password.length < 6) {
      showError("password");
      isValid = false;
    }

    return isValid;
  }

  // Hiển thị lỗi
  function showError(inputType) {
    const input = document.querySelector(`input[type="${inputType}"]`);
    input.classList.add("error");

    setTimeout(() => {
      input.classList.remove("error");
    }, 500);
  }

  // Xóa class error khi người dùng nhập lại
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("error");
    });
  });
});

// Xử lý form đăng ký
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1]
      .value;

    // Kiểm tra đăng ký
    if (validateForm(name, email, password, confirmPassword)) {
      alert("Đăng ký thành công!");
      // Thêm code xử lý đăng ký ở đây
    }
  });

// Hàm kiểm tra email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Hàm kiểm tra form đăng ký
function validateForm(name, email, password, confirmPassword) {
  if (name.length < 2) {
    alert("Tên phải có ít nhất 2 ký tự!");
    return false;
  }

  if (!validateEmail(email)) {
    alert("Email không hợp lệ!");
    return false;
  }

  if (password.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự!");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp!");
    return false;
  }

  return true;
}
