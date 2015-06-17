/**
 * Created by mario_000 on 1/22/2015.
 */

var fk_number=0;
    var fk_urls="";
    var lockersName={};
    var usersId={};
    var log_id=[];
    var items="";

    $(document).ready(
    $.getJSON("/Log/?format=json", function (data) {


        var dateObj;
        var year;
        var month;
        var day;
        var hour;
        var minutes;
        var dateString;
        var timeString;
        var comments;
        var timeUsed;

        $(data).each(function(index,content){
            dateObj=new Date(content.log_timestamp);
            year=dateObj.getFullYear();
            month=dateObj.getMonth()+1;
            day=dateObj.getDate();
            hour=dateObj.getHours();
            minutes=dateObj.getMinutes();
            dateObj=dateObj.getFullYear()+"/"+dateObj.getMonth()+"/"+
                    dateObj.getDay()+" <br>Hora "+dateObj.getHours()+":"+dateObj.getMinutes();
            dateString=day+"/"+month+"/"+year;
            timeString=hour+":"+minutes;
            comments=content.log_comments;
            timeUsed=content.log_time_charged;

            if (comments==null){
                comments="";
            }
            if (timeUsed==null){
                timeUsed=0;
            }
            items+="<tr id=log_"+content.log_id+">";
            items+="<td>"+content.log_id+"</td>";
            items+="<td>"+dateString+"</td>";
            items+="<td>"+timeString+"</td>";
            items+="<td>$"+content.log_total_pay+"</td>";
            items+="<td>"+content.log_rate+"</td>";
            items+="<td >"+content.log_discount+"</td>";
            items+="<td onclick='showComments(this)'>"+comments+"</td>";
            items+="<td>"+timeUsed+"</td>";
            items+="<td id=user_"+content.log_id+"></td>";
            items+="<td id=locker_"+content.log_id+"></td>";
            items+="</tr>";
            log_id.push(content.log_id);

             // protects url and actual_fk parameters
            $.getJSON(content.fk_locker_id+"?format=json", function (data) {
                //$("#locker_"+content.log_id).append(data.locker_name);
                lockersName[content.log_id]=data.locker_name;
            });
            $.getJSON(content.fk_user_id+"?format=json", function (data) {
                //$("#log_"+content.log_id).append("<td>"+data.user_id+"</td>");
                //$("#user_"+content.log_id).append(data.user_id);
                usersId[content.log_id]=data.user_id;
            });
            //fk_urls.push([content.fk_user_id,content.fk_locker_id]);

        });


        var userIdString="";
        var lockerNameString="";
        var replaceForUserIdString="";
        var replaceForLockerNameString="";
        $.each(log_id,function(index,content){
            userIdString="id=user_"+content+"></td>";
            lockerNameString="id=locker_"+content+"></td>";
            replaceForUserIdString="id=user_"+content+">"+usersId[content]+"</td>";
            replaceForLockerNameString="id=locker_"+content+">"+lockersName[content]+"</td>";
            items.replace(userIdString,replaceForUserIdString);
            items.replace(lockerNameString,replaceForLockerNameString);
            //$("#user_"+content).append(usersId[content.toString()]);
            //$("#locker_"+content).append(lockersName[content.toString()]);

        });
         (document).getElementById("table_body").innerHTML=items;


        }
    )
    );



     $(document).ajaxStop(function () {
      $.each(log_id,function(index,content){
            $("#user_"+content).append(usersId[content.toString()]);
            $("#locker_"+content).append(lockersName[content.toString()]);
        });
    });

    function showComments(cell){
        if (cell.innerText.length>=20){
            var p=(document).getElementById("commentsText");
            var text=document.createTextNode(cell.innerText);
            p.appendChild(text);
            $('#commentsModal').foundation('reveal', 'open');
        }

    }

    function closeCommentsModal(){
        var p=(document).getElementById("commentsText");
        $("#commentsText").contents().filter(function(){
            return this.nodeType == 3; }
            ).remove();
        }

    function fk_searh(){
       for(var actual_fk= 0,url="";actual_fk<fk_number;actual_fk++) {
           url=""+fk_urls[actual_fk]+"?format=json";
           (function(url,actual_fk) { // protects url and actual_fk parameters
            $.getJSON(url, function (data) {
                $("#fk"+actual_fk).append(data.area_id);
            });
            })(url,actual_fk);
       }
   }
