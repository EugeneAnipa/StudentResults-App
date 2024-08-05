function passwordValidtion(event) {
  const password1 = document.getElementById("password1").value;

  const password2 = document.getElementById("password2").value;

  const errorMessage = document.getElementById("errorMessage");

  const passMessage = document.getElementById("passMessage");

  if (!(password1 === password2)) {
    errorMessage.innerHTML = "passwords do not match";
    passMessage.classList.add("passMessageClass");
    event.preventDefault();
  }
}

function loginInvalid(event) {
  event.preventDefault();
  const invalid = document.getElementById("invalid");

  if (statuscode !== 200) {
  } else {
    invalid.innerHTML = "wrong logins";
  }
}
