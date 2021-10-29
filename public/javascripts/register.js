/*
const firstName = document.getElementById("Input-FristName");
const lastName = document.getElementById("Input-LastName");
const email = document.getElementById("Input-Email-Register");
const pwd = document.getElementById("Input-Password-Register");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an e-mail address!");
  } else {
    email.setCustomValidity("");
  }
});

async function register(event) {
  console.log("start");
  
  if (firstName.value.length === 0 || lastName.value.length === 0) {
    event.preventDefault();
    alert("First Name and Last Name cannot be null");
    return;
  }
  if(!email.validity.valid ||email.value.length === 0) {
    event.preventDefault();
    return;
  }
  if (pwd.value.length < 6) {
    event.preventDefault();
    alert("Password should not less than 6 characters");
    return;
  }

  const data = {
    firstName: firstName.value,
    lastName: lastName.vlaue,
    email: email.value,
    pwd: pwd.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  };

  try {
    await fetch("/register", options);
  } catch(e) {
    console.log(e);
  };
}
*/