/**
 * Created by mario_000 on 1/26/2015.
 */

 $(function () {

    $.ajaxSetup({
        headers: { "X-CSRFToken": getCookie("csrftoken") }
    });
});

function getCookie(c_name)
    {
        if (document.cookie.length > 0)
        {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start != -1)
            {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start,c_end));
            }
        }
        return "";
    }

//$(document).ajaxSend(function(event, xhr, settings) {
//    function getCookie(name) {
//        var cookieValue = null;
//        if (document.cookie && document.cookie != '') {
//            var cookies = document.cookie.split(';');
//            for (var i = 0; i < cookies.length; i++) {
//                var cookie = jQuery.trim(cookies[i]);
//                // Does this cookie string begin with the name we want?
//                if (cookie.substring(0, name.length + 1) == (name + '=')) {
//                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                    break;
//                }
//            }
//        }
//        return cookieValue;
//    }
//    function sameOrigin(url) {
//        // url could be relative or scheme relative or absolute
//        var host = document.location.host; // host + port
//        var protocol = document.location.protocol;
//        var sr_origin = '//' + host;
//        var origin = protocol + sr_origin;
//        // Allow absolute or scheme relative URLs to same origin
//        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
//            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
//            // or any other URL that isn't scheme relative or absolute i.e relative.
//            !(/^(\/\/|http:|https:).*/.test(url));
//    }
//    function safeMethod(method) {
//        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
//    }
//
//    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
//        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
//    }
//});
