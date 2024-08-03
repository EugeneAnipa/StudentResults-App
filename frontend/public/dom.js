let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementsByClassName("theme-button");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();
themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
  /*
          if(darkmode !=="active"){
          enableDarkmode()}
          else{
          
          disableDarkmode()}

  */
});
