//togle menu for smartphones 
var navlinks = document.getElementById("navlinks");

function showmenu() {
    navlinks.style.display = "block";
    navlinks.style.right = "0";
}

function hidemenu() {
    navlinks.style.display = "none";
    navlinks.style.right = "-200px";
}
