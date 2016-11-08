$(document).ready(function(){

if(localStorage.api_url_server){
    document.getElementById("server").value = localStorage.api_url_server;
}else{
    localStorage.api_url_server = document.getElementById("apiserver_s").value;
    document.getElementById("server").value = document.getElementById("apiserver_s").value;
}

if(localStorage.api_url_searchitem){
    document.getElementById("searchitem").value = localStorage.api_url_searchitem;
}else{
    localStorage.api_url_searchitem = document.getElementById("searchitem_h").value;
    document.getElementById("searchitem").value = document.getElementById("searchitem_h").value;
    //console.log("llll");
}

if(localStorage.api_updatebarcode){
    document.getElementById("updateItem").value = localStorage.api_updatebarcode;
}else{
    localStorage.api_updatebarcode = document.getElementById("updateItem_h").value;
    document.getElementById("updateItem").value = document.getElementById("updateItem_h").value;
}


});

function set_api(){
//$("#set").click(function() {
    localStorage.api_url_server = document.getElementById("server").value;
    localStorage.api_updatebarcode = document.getElementById("searchitem").value;
    localStorage.api_updatebarcode = document.getElementById("updateItem").value;
    alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว");


//});
}
