document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);

            if(page=="pageone"){
                switch (event.keyCode){
                    case 13:  if ($('#scanitem').css('display') == 'none') {

                                 }
                                 return false;
                    break;
                            default:
                    break;
                }
            }else if(page=="setting"){
                switch (event.keyCode){
                    case 13: set_api();
                            break;
                    default: $.mobile.changePage("#setting",{transition: 'slidefade'});
                            break;
                }
            }
});

document.addEventListener("backbutton", function(e){

        if($.mobile.activePage.is('#pageone')){
            if ($('#scanitem').css('display') == 'none') {
                ref();
                closeload();
            }else{
                var r = confirm("ต้องการออกจากโปรแกรมหรือไม่ !");
                            if (r == true) {
                                navigator.app.exitApp();
                            } else {
                                return false;
                            }
            }

        }else  if($.mobile.activePage.is('#setting')){
            $.mobile.changePage("#pageone",{transition: 'slidefade'});
        }
}, false);
