var xmlhttp = new XMLHttpRequest();
var url = "https://spreadsheets.google.com/feeds/list/1XS40L3o9dFwdM9z5QEMXYW_vPgF_EoTDz2OL8U3Skmg/od6/public/values?alt=json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        var myArr2 = myArr["feed"]["entry"];
        myFunction(myArr2);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = '<table class="table table-striped">';
    out    += '<thead><tr><th>Date</th><th>Speaker</th><th>Paper</th></tr></thead>'
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<tr>' +
               '<td>' + arr[i]["gsx$date"]["$t"]    + '</td>' + 
               '<td>' + arr[i]["gsx$speaker"]["$t"] + '</td>';
        if (arr[i]["gsx$linktopaper"]["$t"] == "") {
            out += '<td>' + arr[i]["gsx$paper"]["$t"]   + '</td>';
        } else {
            out += '<td><a href="' + arr[i]["gsx$linktopaper"]["$t"] + '#">' + arr[i]["gsx$paper"]["$t"]   + '</a></td>';
        }
        out += '</tr>';
    }
    out += '</table>';
    document.getElementById("id01").innerHTML = out;
}