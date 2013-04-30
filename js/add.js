function add(){
    try{
    $("#content").height($("#content").height()-$(".add").height());
    }
    catch(err){$("body").html("<br><center>Error: ad add / "+err.toString()+"</center>");}
}
