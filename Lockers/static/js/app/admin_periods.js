/**
 * Created by mario_000 on 1/22/2015.
 */


    /***Add the necessary HTML to the page with the elements of Lockers table
     Verify if the content in the date and time columns is the correct***/
var periodsArray=[];

$(document).ready(
    $.getJSON("/Periods/?format=json", function (data) {
        var items="";

        $(data).each(function(index,content){

            var startDateString="";
            var startTimeString="";
            var endDateString="";
            var endTimeString="";
            var datesObject={id:content.period_id};

            if(content.period_start_time!= null){
                var startDate=new Date(content.period_start_time);
                startDateString=""+startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear();
                startTimeString=""+startDate.getHours()+":"+startDate.getMinutes();

                datesObject["startDate"]=startDate;
            }else{
                startDateString="No hay fecha";
                startTimeString="No hay hora";
                datesObject["startDate"]=null;
            }

             if(content.period_end_time!= null){
                var endDate=new Date(content.period_end_time);
                endDateString=""+endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();
                endTimeString=""+endDate.getHours()+":"+endDate.getMinutes();

                datesObject["endDate"]=endDate;
            }else{
                endDateString="No hay fecha";
                endTimeString="No hay hora";
                datesObject["endDate"]=null;
            }

            items+="<tr id=locker_"+content.locker_id+">";
            items+="<td>"+content.period_id+"</td>";
            items+="<td>"+content.period_name+"</td>";
            items+="<td>"+startDateString+"</td>";
            items+="<td>"+startTimeString+"</td>";
            items+="<td>"+endDateString+"</td>";
            items+="<td>"+endTimeString+"</td>";
            items+="</tr>";

            periodsArray.push(datesObject);


        });

        (document).getElementById("table_body").innerHTML=items;
//        fk_user_search();
//        fk_area_search();

    })

);

function revealCreatePeriodsModal (){
    $('#createPeriodsModal').foundation('reveal', 'open');
}

function closeModal(){
    $('#createPeriodsModal').foundation('reveal', 'close');
}

function createPeriod(){
    var formArray=$("#createPeriodForm").serializeArray();
    $("#overlappedPeriodText").empty();
    //var period_id=formArray[0].value;
    var period_name=formArray[0].value;
    var period_start_time=formArray[1].value+" "+formArray[2].value;
    var period_end_time=formArray[3].value+" "+formArray[4].value;

    var isPeriodOverlapped=isDateOverlapped(period_start_time,period_end_time);
    if (!isPeriodOverlapped){
        $.ajax({
            url: "/Periods/",
            type: "POST",
            dataType: "json",
            data: {
                "period_name": period_name,
                "period_start_time":period_start_time,
                "period_end_time":period_end_time
            },
            success: function (data) {
                //location.reload(true);
            },
            error: function(e) {
                e.preventDefault();
            }
        });
    }else{
        $("#overlappedPeriodText").append("Verifique la fecha de este periodo ya que interfiere con los ya existentes.");
        $("#overlappedPeriodModal").foundation('reveal','open');

    }
}

function isDateOverlapped(startDate ,endDate){
    var startDateObj=new Date(startDate);
    var endDateObj=new Date(endDate);
    var returnData=false;
    $.each(periodsArray,function(key,date){
        var isOverlapping= (startDateObj>=date.startDate && startDateObj<=date.endDate)  || (endDateObj<=date.endDate && endDateObj>=date.startDate);
        if (isOverlapping){
            returnData=true
            return false;
        }
    });
    return returnData;
}


