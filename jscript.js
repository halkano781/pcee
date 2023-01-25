//navigation bar disappear
var timer;
(document).on('mousemove', function() {
    clearTimeout(timer);
    $("nav").removeClass("nav-collapsed");
    timer = setTimeout(function() {
        $("nav").addClass("nav-collapsed");
    }, 2000);
});

//togle menu for smartphones 
var navlinks =document.getElementById("navlinks");
            function showmenu(){
                navlinks.style.right = "0";
            }
            function hidemenu(){
                navlinks.style.right = "-200px"
            }
