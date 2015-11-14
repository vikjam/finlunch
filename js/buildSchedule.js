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
    var out = '<table class="table">';
    out    += '<thead><tr><th>Date</th><th>Speaker</th><th>Paper</th></tr></thead>';
    var i;
    for(i = 0; i < arr.length; i++) {
        var paper_link  = "";
        if (arr[i]["gsx$linktopaper"]["$t"] != "") {
            paper_link = '<div><a href="' + arr[i]["gsx$linktopaper"]["$t"] + '#">' + '<button type="button" class="btn btn-link btn-xs"><i class="fa fa-download"></i> Full text</button></a></div>';
        }
        var abstract    = "";
        var toggle_plus = "";
        if (arr[i]["gsx$abstract"]["$t"] != "") {
            abstract    = '<b>Abstract</b>: ' + arr[i]["gsx$abstract"]["$t"] + ' ' + paper_link;
            toggle_plus = '<button data-toggle="collapse" data-target="#paper' + i + '" class="btn btn-link btn-xs accordion-toggle"><i class="fa fa-file-text-o"></i></button>';
        }
        out += '<tr>' +
               '<td>' + arr[i]["gsx$date"]["$t"]    + '</td>' + 
               '<td>' + arr[i]["gsx$speaker"]["$t"] + '</td>';
        out += '<td>' + arr[i]["gsx$paper"]["$t"]   + ' ' + toggle_plus + '</td>';
        out += '</tr>';
        out += '<tr> <td colspan="3" class="hiddenRow"><div class="accordian-body collapse" id="paper' + i + '">' + abstract + '</div> </td> </tr>';
    }
    out += '</table>';
    document.getElementById("id01").innerHTML = out;
}