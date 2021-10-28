window.onload = function () {
  document.getElementById("login-button").addEventListener("click", register);
};

async function register(event) {
  event.preventDefault();
  console.log("start");
  let firstName = document.getElementById("Input-FristName").value;
  let lastName = document.getElementById("Input-LastName").value;
  let email = document.getElementById("Input-Email-Register").value;
  let pwd = document.getElementById("Input-Password-Register").value;

  if (firstName.length === 0 || lastName.length === 0) {
    alert("First Name and Last Name cannot be null");
    return;
  }
  if (email.length === 0) {
    alert("Email address cannot be null");
    return;
  }
  if (pwd.length < 6) {
    alert("Password should not less than 6 characters");
    return;
  }

  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    pwd: pwd,
  };
  console.log(data);

  const registerData = async (data) => {
    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  if (!registerData.ok) {
    alert("Somgthing's wrong");
  } else {
    window.location.assign("/logIn.html");
  }
}
