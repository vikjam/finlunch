var xmlhttp = new XMLHttpRequest();
var url = "https://spreadsheets.google.com/feeds/list/1XS40L3o9dFwdM9z5QEMXYW_vPgF_EoTDz2OL8U3Skmg/od6/public/values?alt=json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var schedule_raw_json = JSON.parse(xmlhttp.responseText);
        var schedule_json     = schedule_raw_json["feed"]["entry"];
        schedule_builder(schedule_json);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function schedule_builder(arr) {
    var out = '<table class="table table-striped">';
    var abstract_modals = '';
    out    += '<thead><tr><th>Date</th><th>Speaker</th><th>Paper</th></tr></thead>';
    var i;
    for(i = 0; i < arr.length; i++) {
        var paper_link  = "";
        if (arr[i]["gsx$linktopaper"]["$t"] != "") {
            paper_link = '<a href="' + arr[i]["gsx$linktopaper"]["$t"] + '"' + '<role="button" class="btn btn-success">Full text</a>';
        }
        var toggle_plus = "";
        if (arr[i]["gsx$abstract"]["$t"] != "") {
            toggle_plus = '<button type="button" class="btn btn-link btn-xs" data-toggle="modal" data-target="#abstract_modal' + i + '"><i class="fa fa-external-link"></i> Abstract</button>';
            abstract_modals += '<div class="modal fade" id="abstract_modal' + i + '" tabindex="-1" role="dialog" aria-labelledby="abstract_modal' + i +'">';
            abstract_modals += '<div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
            abstract_modals += '<h5 class="modal-title" id="abstract_modal' + i + '">' + arr[i]["gsx$paper"]["$t"] + '</h5>';
            abstract_modals += '<span class="modal-title" id="abstract_modal' + i + '">' + arr[i]["gsx$speaker"]["$t"] + '</span>';
            abstract_modals += '</div>'
            abstract_modals += '<div class="modal-body"><b>Abstract</b>: ' + arr[i]["gsx$abstract"]["$t"] + '</div>';
            abstract_modals += '<div class="modal-footer">';
            abstract_modals += paper_link;
            abstract_modals += '<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button></div>';
            abstract_modals += '</div></div></div>';
        }
        out += '<tr>' +
               '<td>' + arr[i]["gsx$date"]["$t"]    + '</td>' + 
               '<td>' + arr[i]["gsx$speaker"]["$t"] + '</td>';
        out += '<td>' + arr[i]["gsx$paper"]["$t"]   + ' ' + toggle_plus + '</td>';
        out += '</tr>';
    }
    out += '</table>';
    document.getElementById("schedule-table").innerHTML = out;
    document.getElementById("abstract-modals").innerHTML = abstract_modals;
}
