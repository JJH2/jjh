"use strict"
//테이블 생성
window.onload = function() {
    var table = document.createElement("table");
    var tableRow = table.insertRow(-1);
    document.getElementById("con_art_3").appendChild(table);
    table.setAttribute("id", "table");

    tableRow.insertCell(-1).innerHTML = "<p>No.</p>"
    tableRow.insertCell(-1).innerHTML = "<p>Firstname</p>";
    tableRow.insertCell(-1).innerHTML = "<p>Lastname</p>";
    tableRow.insertCell(-1).innerHTML = "<p>Age</p>";
    tableRow.insertCell(-1).innerHTML = "<p>Hometown</p>";
    tableRow.insertCell(-1).innerHTML = "<p>Job</p>";

    //ajax - table total number//
    var req;
    var url = "./jang.json";

    if (window.XMLHttpRequest){
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {req = new ActiveXObject("Msxml2.XMLHTTP");}
        catch (e) {
            try {req = new ActiveXObject("Microsoft.XMLHTTP");}
        catch (e) {}
        }
    }
    req.open("GET", url, true);

    req.onreadystatechange = function() {
        console.log(req.readyState, req.status);
        if(req.readyState == 4 && req.status == 200) {
            var data = JSON.parse(req.response);

            var table = document.getElementById("table").insertRow(0);
            table.insertCell(0).innerHTML = "TOTAL : " + data[0].total_cnt;
            table.insertCell(1).innerHTML = "NOTICE";


            };
        };
    req.send();
};

/* if ( => hh) {
    var req;
    var url = "./_tt.php";

    if (window.XMLHttpRequest){
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {req = new ActiveXObject("Msxml2.XMLHTTP");}
        catch (e) {
            try {req = new ActiveXObject("Microsoft.XMLHTTP");}
        catch (e) {}
        }
    }
    req.open("GET", url, true);

    req.onreadystatechange = function() {
        console.log(req.readyState, req.status);
        if(req.readyState == 4 && req.status == 200) {
            var data = JSON.parse(req.response);

            for (var i = 1; i < data.length; i++) {

                var table = document.getElementById("table");
                var tableRow = table.insertRow(-1);
                tableRow.insertCell(-1).innerHTML = data[i].Id;
                tableRow.insertCell(-1).innerHTML = data[i].Firstname;
                tableRow.insertCell(-1).innerHTML = data[i].Lastname;
                tableRow.insertCell(-1).innerHTML = data[i].Age;
                tableRow.insertCell(-1).innerHTML = data[i].Hometown;
                tableRow.insertCell(-1).innerHTML = data[i].Job;
            };
        };
    };

    req.send();
}
*/
//카운트 번호 하나씩 추가하기 (클릭하면)!!
var count = 0;
document.querySelector(".button").onclick = function(){
    count++;
    myFunction(20, count, 0);
};
    // ajax

function myFunction(content_show, page, id) {

    var req;
    var url = "./jang.json";

    if (content_show) {url += "?content_show=" + content_show;}
    if (page) {url += "&page=" + page;}
    if (id) {url += "&id=" + id;}

    if (window.XMLHttpRequest){
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {req = new ActiveXObject("Msxml2.XMLHTTP");}
        catch (e) {
            try {req = new ActiveXObject("Microsoft.XMLHTTP");}
        catch (e) {}
        }
    }
    req.open("GET", url, true);

    req.onreadystatechange = function() {
        console.log(req.readyState, req.status);
        if(req.readyState == 4 && req.status == 200) {
            var data = JSON.parse(req.response);

            for (var i = 1; i < data.length; i++) {

                var table = document.getElementById("table");
                var tableRow = table.insertRow(-1);
                tableRow.insertCell(-1).innerHTML =
                "<img style=width:100px src=" + data[i] + " />"
            };
        };
    };

    req.send();
};




    //아래 화살표 누르면 이동하는 이벤트
document.querySelector("#second > img").addEventListener("click", jj);

function jj() {
    var jg = document.querySelector("#con_sec").offsetTop;
    window.scroll(0, jg-70);
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // you're at the bottom of the page
        console.log("Bottom of page");

        count++;
        myFunction(20, count, 0);
    };
};
