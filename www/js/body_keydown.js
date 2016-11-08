var body = document.querySelector('body');
body.onkeydown = function () {
    var item = document.getElementById("itemNo").value;
    var page = "";
 	if(page == ""){
             page = $.mobile.activePage.attr('id');
    }
    if(page=="countitem"){
     //document.activeElement.blur();
        if(item){
            if (event.keyCode < 48 || event.keyCode > 57){
            	 if(event.keyCode == 8){
                     event.returnValue = true;
                     var str = document.getElementById("counts").value;
                     if(str!=""){
                       var newStr = str.substring(0, str.length-1);
                       document.getElementById("counts").value = newStr;
                       return false;
                     }

                 }else{
                     event.returnValue = false;
                 }
            }else{
               // document.activeElement.blur();

               // $('#counts').focus();
                event.returnValue = true;
                document.getElementById("counts").value += String.fromCharCode(event.keyCode);
                return false;
            }
        }
    }else if(page=="additem"){
                      if (event.keyCode < 48 || event.keyCode > 57){
                      	 if(event.keyCode == 8){
                               event.returnValue = true;
                               var str = document.getElementById("citem").value;
                               if(str!=""){
                                 var newStr = str.substring(0, str.length-1);
                                 document.getElementById("citem").value = newStr;
                                 return false;
                               }

                           }else{
                               event.returnValue = false;
                           }
                      }else{
                          event.returnValue = true;
                          console.log("pr "+event.keyCode);
                          document.getElementById("citem").value += String.fromCharCode(event.keyCode);
                          return false;
                      }
              }

}