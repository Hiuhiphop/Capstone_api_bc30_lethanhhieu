document.getElementById("btn-register").onclick = () => {
  let User = new user();
  User.email = document.getElementById("email").value;
  User.password = document.getElementById("password").value;
  User.name = document.getElementById("name").value;
  User.gender = checkGender();
  User.phone = document.getElementById("phone").value;
  checkValidity();
  let check = checkValidity();
  if (check === 0) {
    return alert("Form không hợp lệ");
  }
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: User,
  });
  promise.then((result) => {
    alert(result.data.message);
    window.location.reload();
  });
  promise.catch((err) => {
    alert(err.response.data.message);
  });
};
const checkGender = () => {
  let genders = document.getElementsByName("radiogroup1");
  let genderChecked;
  for (let i = 0; i < genders.length; i++) {
    if (genders[i].checked) {
      genderChecked = genders[i].value;
    }
  }
  return genderChecked;
};
const checkValidity = () => {
  let isValid = document.getElementById("form_Register").checkValidity();
  if (!isValid) {
    // valdate email
    if (document.getElementById("email").validity.valueMissing) {
      document.getElementById("spanEmail").innerHTML =
        "Email không được để trống";
    } else if (document.getElementById("email").validity.patternMismatch) {
      document.getElementById("spanEmail").innerHTML = "Email không hợp lệ";
    } else {
      document.getElementById("spanEmail").innerHTML = "";
    }

    // valdate password
    if (document.getElementById("password").validity.valueMissing) {
      document.getElementById("spanPassword").innerHTML =
        "Mật khẩu không được để trống";
    } else if (document.getElementById("password").validity.patternMismatch) {
      document.getElementById("spanPassword").innerHTML =
        "Mật khẩu chứa ít nhất 1 kí tự số, 1 kí tự in hoa, 1 kí tự đặt biệt, 6-10 kí tự";
    } else {
      document.getElementById("spanPassword").innerHTML = "";
    }

    // valdate re-password
    if (document.getElementById("re-password").validity.valueMissing) {
      document.getElementById("spanRePassword").innerHTML =
        "Mật khẩu lặp lại không được để trống";
    } else if (
      document.getElementById("password").value !==
      document.getElementById("re-password").value
    ) {
      document.getElementById("spanRePassword").innerHTML =
        "Mật khẩu lặp lại không giống nhau";
    } else {
      document.getElementById("spanRePassword").innerHTML = "";
    }

    // valdate name
    if (document.getElementById("name").validity.valueMissing) {
      document.getElementById("spanName").innerHTML = "Tên không được để trống";
    } else if (document.getElementById("name").validity.patternMismatch) {
      document.getElementById("spanName").innerHTML =
        "Tên không được có số hoặc kí tự đặc biệt";
    } else {
      document.getElementById("spanName").innerHTML = "";
    }

    // valdate phone
    if (document.getElementById("phone").validity.valueMissing) {
      document.getElementById("spanPhone").innerHTML =
        "Số điện thoại không được để trống";
    } else if (document.getElementById("phone").validity.patternMismatch) {
      document.getElementById("spanPhone").innerHTML =
        "Số điện thoại không hợp lệ";
    } else {
      document.getElementById("spanPhone").innerHTML = "";
    }

    return 0;
  }
};
