/**
 * Created by mario_000 on 1/22/2015.
 */
var totalMoney=0;
$(document).ready(
    $.getJSON("/Currency/?format=json", function (data) {
        var moneyByType=0;
        var totalTableItems="";
        var items="";
        var Estatus="";
        $(data).each(function(index,content){
            items+="<tr id=user_"+content.user_id+">";
            items+="<td>"+content.currency_name+"</td>";
            items+="<td>"+content.currency_quantity+"</td>";
            if (content.currency_name="50 centavos"){
                moneyByType=content.currency_quantity*.5;
            }
            else if (content.currency_name="1 peso"){
                moneyByType=content.currency_quantity;
            }
            else if (content.currency_name="2 pesos"){
                moneyByType=content.currency_quantity*2;
            }
            else if (content.currency_name="5 pesos"){
                moneyByType=content.currency_quantity*5;
            }
            else if (content.currency_name="10 pesos"){
                moneyByType=content.currency_quantity*10;
            }
            items+="<td>"+"$"+moneyByType+"</td>";
            items+="</tr>";

            totalMoney+=moneyByType;
            totalTableItems="<tr><td>"+totalMoney+"</td></tr>";
        });
        (document).getElementById("table_body_currency").innerHTML=items;
        (document).getElementById("table_body_total").innerHTML=totalTableItems;
    })
    );