"use strict"
function Jang(a, b) {
    this.width = a;
    this.height = b;
    function jj(count) {
        var lala = count;
        return console.log(a + b * lala);
    }
    return jj;
}

var jang = new Jang(20, 20);
var closure = jang;
closure(2);
