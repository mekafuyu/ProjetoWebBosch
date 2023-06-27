const changeThemeBtn = document.querySelector("#change-theme");

// toogle dark mode
function toggleDarkMode(){
    document.body.classList.toggle("dark");
}

// load mode
function loadTheme(){
    const darkMode = localStorage.getItem("dark");
    if(darkMode){
        toggleDarkMode();
    }
}

loadTheme();
changeThemeBtn.addEventListener("change", function(){

    toggleDarkMode();

    // save mode
    localStorage.removeItem("dark");

    if(document.body.classList.value == "dark"){
        localStorage.setItem("dark",1);
    } 
})