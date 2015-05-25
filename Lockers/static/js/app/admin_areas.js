/**
 * Created by mario_000 on 1/22/2015.
 */

 $(document).ready(
    $.getJSON("/Areas/?format=json", function (data) {
        var items="";
        $(data).each(function(index,content){
            items+="<tr id=area_"+content.area_id+">";
            items+="<td>"+content.area_id+"</td>";
            items+="<td>"+content.area_name+"</td>";
            items+="<td>"+content.area_description+"</td>";

            if(content.area_enable==true)
                items+="<td>Disponible</td>";
            if(content.area_enable==false)
                items+="<td>NO Disponible</td>";

            items+="</tr>";

        });
        (document).getElementById("table_body").innerHTML=items;
    })
    );
