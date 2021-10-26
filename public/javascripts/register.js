window.onload = function () {
  document.getElementById("login-button").addEventListener("click", register);
};

function register() {
  console.log("start");
  let firstName = document.getElementById("Input-FristName").value;
  let lastName = document.getElementById("Input-LastName").value;
  let email = document.getElementById("Input-Email-Register").value;
  let pwd = document.getElementById("Input-Password-Register").value;

  if (firstName.length == 0 || lastName.length == 0) {
    alert("First Name and Last Name cannot be null");
    return;
  }
  if (email.length == 0) {
    alert("Email address cannot be null");
    return;
  }
  if (pwd.length < 6) {
    alert("Password should not less than 6 characters");
    return;
  }

  let data = {
    firstName, lastName, email, pwd,
  };
  console.log(data);
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/register",
    data: data,
    success: (res) => {
      console.log(res);
      if (res.code == 200) {
        alert(res.msg);
        document.location.href = "index.html";
      } else if (res.code == 201) {
        alert(res.msg);
        document.location.href = "register.html";
      } else {
        alert(res.msg);
        document.location.href = "register.html";
      }
    },
    error: (err) => {
      console.log(err);
    },
  });
}