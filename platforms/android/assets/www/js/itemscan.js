/*$(document).on("pageshow","#pageone", function(){
    $(this).attr('src', $(this).attr('src')+'?'+Math.random());
});*/

window.addEventListener('native.onscanbarcode', function (item) {
       var page = "";
       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (c, data) {
          page = $(this)[0].activeElement.id;
       });

       console.log(page+" : "+item.scanResult);
       localStorage.barcode = item.scanResult;

switch(page){
             case "pageone"   :  console.log(item.scanResult);
                                 loading();
                                 $("#scanitem").hide();
                                 $("#detail").show();
                                 $("#1").hide();
                                 $("#2").show();
                                 setTimeout(function(){ search(item.scanResult); closeload();},1500);
                            break;
           }
});
function search(bc){
    console.log(bc);
    var image = `<img id="Nimg" src="http://api.nopadol.com/apiv2/items/`+bc+`.jpg" onError="this.src = 'img/none_image.png'"  width="40%" style="border-radius:9px;">`;
    var barcode = `<div style='float:left; width:30%; text-align:right;'><b> บาร์โค้ด :</b></div>
                   <div style='float:left; width:68%; text-align:left; padding-left:2%;'>`+bc+`</div>
                   <br style="clear:both;">`;
    var itemCode = `<div style='float:left; width:30%; text-align:right;'><b> รหัสสินค้า :</b></div>
                    <div style='float:left; width:68%; text-align:left; padding-left:2%;'>`+bc+`</div>
                    <br style="clear:both;">`;
    var itemName = `<div style='float:left; width:30%; text-align:right;'><b> ชื่อสินค้า :</b></div>
                    <div style='float:left; width:68%; text-align:left; padding-left:2%;'>`+bc+`</div>
                    <br style="clear:both;">`;
    var price = `<div style='float:left; width:30%; text-align:right;'><b> ราคา :</b></div>
                 <div style='float:left; width:68%; text-align:left; padding-left:2%;'>`+bc+`</div>
                 <br style="clear:both;">`;
    var barcodelist = `<div style='float:left; width:30%; text-align:right;'><b> บาร์โค้ด 1 :</b></div>
                       <div style='float:left; width:68%; text-align:left; padding-left:2%;'>`+bc+`/`+bc+`</div>
                       <br style="clear:both;">`;


    document.getElementById("barcode").innerHTML = barcode;
    document.getElementById("itemcode").innerHTML = itemCode;
    document.getElementById("itemname").innerHTML = itemName;
    document.getElementById("price").innerHTML = price;
    document.getElementById("barcodelist").innerHTML = barcodelist;

    setTimeout(function(){ document.getElementById("image").innerHTML = image; },1000);
}

function ref(){
            $("#scanitem").show();
            $("#detail").hide();
            $("#1").show();
            $("#2").hide();
            document.getElementById("image").innerHTML = `<img src='img/ajax_loader.gif' width="25%">`;
            document.getElementById("barcode").innerHTML = "";
            document.getElementById("itemcode").innerHTML = "";
            document.getElementById("itemname").innerHTML = "";
            document.getElementById("price").innerHTML = "";
            document.getElementById("barcodelist").innerHTML = "";
            localStorage.barcode = "";
}

function bref(){
                loading();

                document.getElementById("Nimg").src = "http://api.nopadol.com/apiv2/items/"+localStorage.barcode+".jpg";
                $("#scanitem").hide();
                $("#detail").show();
                $("#1").hide();
                $("#2").show();
                setTimeout(function(){
                    search(localStorage.barcode);
                    console.log("bref "+localStorage.barcode);
                    closeload();
                    $.mobile.changePage("#pageone",{transition: 'slidefade'});
                    //localStorage.barcode="";
                    console.log("clear "+localStorage.barcode);
                },1500);

}

var $load;
function loading(){
        $load = $("<div>").popup({
        dismissible: false,
        theme: "a",
        positionto: "window",
        transition: "flip",
        }).css({
               'background': '#F8F8FF',
               '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
               'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
               'width' : 250,
               'margin-left' : '1%'
               });

        $("<img>", {
                    src: "img/loading2.gif"
                    }).appendTo($load);
        $load.popup('open');
}

function closeload(){
    $load.popup("close");
}