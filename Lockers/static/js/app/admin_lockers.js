/**
 * Created by mario_000 on 1/22/2015.
 */

//Global Variables
   var fk_area_urls=[];
   var fk_user_urls=[];
   var cambios_en_estado=[];
   var id_lockers_cambiados=[];
   var fk_area_number=0;
   var fk_user_number=0;

    /***Add the necessary HTML to the page with the elements of Lockers table
     Verify if the content in the date and time columns is the correct***/

$(document).ready(
    $.getJSON("/Lockers/?format=json", function (data) {
        var items="";
        var Estatus="";
        var user_matricula="";
        $(data).each(function(index,content){

            items+="<tr id=locker_"+content.locker_id+">";

            items+="<td>"+content.locker_id+"</td>";
            items+="<td>"+content.locker_name+"</td>";
            items+="<td id=fk_user"+fk_user_number+"></td>";
            items+="<td>"+content.locker_status+"</td>";
            var date=new Date(content.locker_start_time)
            var d=""+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            items+="<td>"+d+"</td>";
            //This string build the hour column
            items+="<td>"+date.getHours()+":"+date.getMinutes()+"</td>"+"<td id=fk_area"+fk_area_number+"></td>";

            if (content.locker_status=="in_use" || content.locker_status=="available"){
                Estatus="checked";
            }
            else
                Estatus="unchecked";

            items+='<td>' +
                        '<div class="switch round large">' +
                            '<input class ="switch" id="CheckBox_'+content.locker_id+'" '+Estatus+' onclick="lockerCambiaEstatus('+content.locker_id+',\''+content.locker_status+'\', this)"   type="checkbox">' +
                            '<label for="CheckBox_'+content.locker_id+'"></label>' +
                        '</div>'+
                   '</td>';

            items+="</tr>";

            fk_user_urls.push(content.fk_user);
            fk_area_urls.push(content.fk_area);

            fk_user_number++;
            fk_area_number++;

        });

        (document).getElementById("table_body").innerHTML=items;
        fk_user_search();
        fk_area_search();

    })

    );

   /***This functions keeps all changues in the state until all changes are saved***/
   function lockerCambiaEstatus(row_id , last_status , checkbox){
       var locker=''+row_id;
       if (id_lockers_cambiados.indexOf(locker) == -1){
           if(!checkbox.checked && last_status=="in_use") {
               cambios_en_estado.push(["disabled"]);
               id_lockers_cambiados.push([locker]);
               $('#blocking_comments').foundation('reveal', 'open');
           }

           else if (!checkbox.checked && last_status=="available"){
                id_lockers_cambiados.push(locker);
                $('#states_types').foundation('reveal','open');
           }

           else if (checkbox.checked && (last_status=="is_dirty" || "is_damaged" || "in_mainteinance" || "disabled")){
               id_lockers_cambiados.push([locker]);
               cambios_en_estado.push("available");
           }

       }
       else{
           var index_of_element=id_lockers_cambiados.indexOf(""+row_id);
           id_lockers_cambiados.splice(index_of_element,1);
           cambios_en_estado.splice(index_of_element,1);
       }


   }

   function submitComments() {
       var comments_textfield=document.getElementById("comments_text");
       if (comments_textfield.value.length >= 20) {
           cambios_en_estado[cambios_en_estado.length - 1].push(comments_textfield.value);
           comments_textfield.value = null;
           if ($("#span_alert")) {
               $("#span_alert").remove();
           }
           $('#blocking_comments').foundation('reveal', 'close');

       } else {
           $("#comments_form").append('<span id="span_alert" class="big label alert">Agrega minimo 20 caracteres</span>');
       }

   }

   function cancelComments() {
       var comments_textfield=document.getElementById("comments_text");
       comments_textfield.value=null;
       cambios_en_estado.pop();
       id_lockers_cambiados.pop();
       if ($("#span_alert")) {
               $("#span_alert").remove();
       }
   }

   /***This function display a modal with the comments about the locker blocking of the locker ***/
   function lockerNoDisponibleStatus(estado){
       cambios_en_estado.push(estado);
       $('#states_types').foundation('reveal', 'close');
       $("#CheckBox_Dirty").prop("checked",false);
       $("#CheckBox_Maintenance").prop("checked",false);
       $("#CheckBox_Damaged").prop("checked",false);


   }

   /***Esta función aplica los cambios realizados en el Estatus del locker,
    * Realiza un GET a la BD y en el codigo de success realiza un POST cambiando los datos del Estatus***/

    function lockerAplicarCambios(){
        var comments="";
        for(var c= 0,actual_locker=0;c<id_lockers_cambiados.length;c++){
            actual_locker=id_lockers_cambiados[c];
            (function(actual_locker) { // protects url and actual_fk parameters
                $.getJSON("/Lockers/"+actual_locker+"/", function (data) {
                    var estado=cambios_en_estado[id_lockers_cambiados.indexOf(actual_locker)];

                    if (typeof estado=="object"){
                        data.locker_status=estado[0];
                        comments=estado[1];
                    }
                    else if (typeof estado=="string"){
                        data.locker_status=estado;
                        comments=""
                    }
                $.ajax({
                  url: "/Lockers/"+actual_locker+"/",
                  type: "PATCH",
                  dataType: "json",
                  data: {"locker_status":
                    data.locker_status},
                  success: function (data) {
                        //location.reload(true);
                  },
                  error: function(e) {
                       console.log(e);
                  }
                });
                var timeString;
                var actualTime;
                var hours;
                var minutes;
                var time;
                var seconds;
                if (data.locker_status=="disabled"){
                    timeString="";
                    actualTime=(Math.abs(new Date() - new Date(data.locker_start_time)))/1000;
                    hours=Math.floor(actualTime,3600);
                    minutes=Math.floor((actualTime-(hours*3600)),60);
                    seconds=actualTime-(hours*3600)-minutes*60;
                    timeString=hours+":"+minutes+":"+seconds;

                    time=parseInt(Math.abs((new Date() - new Date(data.locker_start_time)))/(60*1000*60));

                }else {
                    timeString="00:00:00";
                }
                (function (data){
                    $.getJSON(data.fk_user+"?format=json", function (dataUser) {

                    $.ajax({
                      url:"/Log/",
                      type: "POST",
                      dataType: "json",
                      data: {"log_total_pay":0,
                             "log_rate": 0,
                             "log_discount": dataUser.user_discount,
                             //"log_start_time":data.locker_start_time,
                             "log_used_time": timeString,
                             //"log_comments":comments,
                             "fk_locker_id": "/Lockers/"+data.locker_id+"/",
                             "fk_user_id":data.fk_user},

                      success: function (data) {
                            location.reload(true);
                      },
                      error: function(e) {
                           console.log(e);
                      }
                    });
                });
                })(data);
            });
            })(actual_locker);
    }
   }

   function createNewLogs() {
       for (var c = 0, actual_locker = 0; c < id_lockers_cambiados.length; c++) {
           actual_locker = id_lockers_cambiados[c];
           (function (actual_locker) { // protects url and actual_fk parameters
               $.getJSON("/Lockers/" + actual_locker + "/", function (data) {
                   var estado = cambios_en_estado[id_lockers_cambiados.indexOf(actual_locker)];
                   if (typeof estado == "object") {
                       data.locker_status = estado[0];
                   }
                   else if (typeof estado == "string") {
                       data.locker_status = estado;
                   }
                   alert(estado);

               });
           })(actual_locker);
       }
   }
   /***This method search the fk_user  in User table, and add it to the HTML in the #fk_user(n) tag***/

    function fk_user_search(){

       for(var actual_user= 0,url="";actual_user<fk_user_number;actual_user++) {
           url=""+fk_user_urls[actual_user]+"?format=json";
           (function(url,actual_user) { // protects url and actual_area parameters
                $.getJSON(url, function (data) {
                    $("#fk_user"+actual_user).append(data.user_id);
                });
           })(url,actual_user);

       }

   }

   /***This method search the fk_area  in Area table, and add it to the HTML in the #fk_area(n)***/
    function fk_area_search(){
       for(var actual_area= 0,url="";actual_area<fk_area_number;actual_area++) {
           url=""+fk_area_urls[actual_area]+"?format=json";
           (function(url,actual_area) { // protects url and actual_area parameters
                $.getJSON(url, function (data) {
                    $("#fk_area"+actual_area).append(data.area_id);
                });
           })(url,actual_area);

       }
    }