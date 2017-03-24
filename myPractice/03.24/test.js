"use strict"
function Jang(a, b) {
    var width = a;
    var height = b;
    function jj(count) {
        var lala = count;
        return console.log(a + b * count);
    }
    return jj;
}

var jang = new Jang(20, 20);
var closure = jang;
closure(2);
