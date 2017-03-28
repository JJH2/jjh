"use strict";
var li_1 = document.querySelector("#menu > li:first-child");
var li_2 = document.querySelector("#menu > li:nth-of-type(2)")
li_1.addEventListener('mouseenter', func, false);
li_1.addEventListener('mouseleave', func1, false);
li_2.addEventListener('mouseenter', func2, false);
function func() {
    var b = document.querySelector("#menu_1");
    b.style.display = "block";
}
function func1() {
    var b = document.querySelector("#menu_1");
    b.addEventListener('mouseleave', function() {
        this.style.display = "none";
    }, false);
}
function func2() {
    document.querySelector("#menu_1").style.display = "none";
}
