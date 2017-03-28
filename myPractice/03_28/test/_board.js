"use strict";
//	C:\Users\Administrator\AppData\Local\Google\Chrome\User Data\Default\Local Storage
/*  인자 :
content_show : 게시글의 레코드 개수
page : 페이지 번호
id : 글 레코드의 고유 id (PRIMARY KEY)
*/
function loadinfo(content_show, page, id) {

    var xhr;  // XMLHttpRequest object;
    var openurl = "_tt.php?";

    // JSON(쿼리결과)을 요청할 페이지 주소 문자열인 openurl 에 GET 형식으로 변수값 전달 할 문자열을 더함
    if (content_show) {openurl += "content_show=" + content_show;}
    if (page) {openurl += "&page=" + page;}
    if (id) {openurl += "&id=" + id;}

    // Cross Browsing XMLHttpRequest  --
    if (window.XMLHttpRequest) {  // Mozilla, Safari, ...
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {  // IE
        try { xhr = new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) {}
        }
    }

    xhr.open("GET", openurl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.response);

            // 해당 태그 엘리먼트의(id) 객체를 생성/초기화
            var mytable = document.getElementById("myTable");
            var pagen = document.getElementById("pagen");
            mytable.innerHTML = "";
            pagen.innerHTML = "";

            // 테이블의 컬럼명 생성
            var mytable_name = mytable.insertRow(-1);
            mytable_name.insertCell(-1).innerHTML = "<b>NO.</b>";
            mytable_name.insertCell(-1).innerHTML = "<b>Firstname</b>";
            mytable_name.insertCell(-1).innerHTML = "<b>Lastname</b>";
            mytable_name.insertCell(-1).innerHTML = "<b>Age</b>";
            mytable_name.insertCell(-1).innerHTML = "<b>Hometown</b>";
            mytable_name.insertCell(-1).innerHTML = "<b>Job</b>";

            for (var i = 1; i < data.length; i++) {
                var mytable_row = mytable.insertRow(-1);
                mytable_row.insertCell(-1).innerHTML = data[i].Id;
                mytable_row.insertCell(-1).innerHTML = data[i].Firstname;
                //mytable_row.insertCell(-1).innerHTML = data[i].Lastname;
                mytable_row.insertCell(-1);
                mytable_row.insertCell(-1).innerHTML = data[i].Age;
                mytable_row.insertCell(-1).innerHTML = data[i].Hometown;
                mytable_row.insertCell(-1).innerHTML = data[i].Job;
                //  CREATE element + createTextNode 조합으로 id 또는 class 속성추가?

                if (id) {
                    //mytable_row.insertCell(-1).innerHTML = data[i].somedata;
                }
                //var t = document.getElementById("myTable");
                //document.getElementsByTagName("tr")[i -1]
                //.getElementsByTagName("td")[2].innerHTML = data[i].Lastname;

                var x = document.createElement("a");
                x.href = "javascript:loadinfo(" + content_show + "," + page + "," +  data[i].Id + ")";
                x.innerHTML = data[i].Lastname;
                //x.addEventListener("click", loadinfo(content_show, page, data[i].Id));

                document.getElementsByTagName("tr")[i]
                .getElementsByTagName("td")[2].appendChild(x);
            }
            //  insertRow(0) 으로 가장 밀어내기 상위 ROW 추가 (공지사항용)
            var mytable_row_n = document.getElementById("myTable").insertRow(0);
            mytable_row_n.insertCell(0).innerHTML = "TOTAL : " + data[0].total_cnt;
            mytable_row_n.insertCell(1).innerHTML = "NOTICE";

            /*
            [전체레코드/요청 페이지뷰 개수(content_show)]로 나눈 소수점 올림값(pageper_cnt)을 JSON 객체배열안의 키값(data[0].pageper_cnt)으로 받아 페이지를 동적으로 생성
            */
            for (var i = 1; i <= data[0].pageper_cnt; i++) {
                var pageid = document.getElementById("pagen");
                var pagetext = document.createTextNode(i + ' ');
                var pagea = document.createElement("a");
                pagea.href = "javascript:loadinfo(" + content_show + "," + i + "," + 0 + ")";
                pagea.appendChild(pagetext);
                pageid.appendChild(pagea);

                //var pp = document.createElement("p");
            }
        }
    }
    xhr.send(null);
};
