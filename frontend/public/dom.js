function passwordValidtion(event) {
  event.preventDefault();
  const password = document.getElementsByName("password");
  const password1 = document.getElementsByName("password1").value;

  const password2 = document.getElementsByName("password2").value;

  const errorMessage = document.getElementById("errorMessage");

  const passMessage = document.getElementById("passMessage");

  if (password1 === password2) {
    password.innerHTML = password1;
  } else if (password1 !== password2) {
    errorMessage.textContent = "passwords do not match";
    errorMessage.classList.add("passErrorClass");
  }
}

/*
function loginInvalid(event) {
  event.preventDefault();
  const invalid = document.getElementById("invalid");

  if (statuscode !== 200) {
  } else {
    invalid.innerHTML = "wrong logins";
  }
}

*/
/**   wrong username and pass message        */

//let testLogin = document.getElementById("testLogin");

/**    wrong username and pass message         */

/**line graph  */
var mathsValue = document.getElementById("maths").textContent;

var scienceValue = document.getElementById("science").textContent;

var englishValue = document.getElementById("english").textContent;

var biologyValue = document.getElementById("biology").textContent;

const xValues = [1, 2, 3, 4];
const yValues = [mathsValue, scienceValue, englishValue, biologyValue];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [{ ticks: { min: 40, max: 100 } }],
    },
  },
});
//hidePassword
/** set timeout */

/** setimeout function */
/**line graph */
