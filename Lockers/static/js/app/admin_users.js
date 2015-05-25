/**
 * Created by mario_000 on 1/22/2015.
 */

$(document).ready(
    $.getJSON("/Users/?format=json", function (data) {
        var items="";
        var Estatus="";
        $(data).each(function(index,content){
            items+="<tr id=user_"+content.user_id+">";
            items+="<td>"+content.user_id+"</td>";
            items+="<td>"+content.user_name+"</td>";
            items+="<td>"+content.user_ap+"</td>";
            items+="<td>"+content.user_am+"</td>";
            items+="<td>"+content.user_matricula+"</td>";
            items+="<td>"+content.user_discount+"</td>";
            items+="</tr>";

        });
        (document).getElementById("table_body").innerHTML=items;
    })
    );