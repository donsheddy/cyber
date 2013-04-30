
function action_manager(eventobj){
    try{
        if(typeof eventobj.attr("action")=='undefined' || (typeof eventobj.attr("action")!='undefined' && eventobj.attr("action")=="")){
            if(eventobj.parent()!=$("body"))
                action_manager(eventobj.parent());
        }
        else
            make_action(eventobj.attr("action"),eventobj.attr("param"),eventobj);
        return true;
    }
    catch(err){return false;}
}

window.onpopstate = function(event) {
   try{
        if(event.state!=null && event.state.type=="view")
            {
                localStorage.ini=true;
                viewManager($("#"+event.state.view),event.state.data);
            }
        if(event.state!=null && event.state.type=="rss")
            {
                read_feed();
            }
   }
   catch(err){$("body").html("<br><center>Error: onpopstate.event simpleActionManager /"+err.toString()+"</center>");}
};
window.onload = window.onpopstate;

function make_action(action,param,obj){
    try{
        switch(action){
            case "submit":
                $("#formElement").append("<input type='hidden' id='idApp' name='idApp' value='"+$("body").attr("idapp")+"'>");
                if(param.search("cms"))$("#formElement").attr("action",param+'idApp=25756');
                else $("#formElement").attr("action",param);
                $("#formElement").submit();
                $("#iframeContent").css("display",'block');
                $("#iframeContent").css("position",'fixed');
                $("#iframeContent").css("top",height.header);
                $(".element_body,.element_row").css("display",'none');
                $("#iframeContent").width($("#content").width());
                $("#iframeContent").height(height.content);
                $("#iframeTarget").height(height.content);
                break;
            case "back":
                window.history.back();
                break;
            case "section":
                if(param==$(".index").attr("section"))loc="index.html";
                else loc=param+".html";
                document.location.href=loc;
                break;
            case 'call':
                document.location.href='tel:'+param;
                break;
            case 'sms':
                tmp=param.split(" ",1);
                tmp2=tmp[0]+param.split(tmp[0]).join("?body=");
                document.location.href="sms:"+tmp2;
                break;
            case 'browser':
                window.open("http://"+param.split('http://').join(''));
                break;
            case 'function':
                setTimeout(param,0);
                break;
            case 'set':
                if(!obj.hasClass("element_switch")){
                    param=param.split("-");
                    tmp=$("."+param[0]).attr("param").split("(").join("").split(")").join("-").split("-");
                    if(!isNaN(tmp[2])){
                        collection=$.parseJSON(localStorage[$(".collection").attr("name")]);
                        collection[tmp[2]][tmp[0]]=param[1];
                        localStorage[$(".collection").attr("name")]=JSON.stringify(collection);
                        filterCollection();
                    }
                    switchEvent(obj.parent(".element_switch"),parseInt(param[1])+1);
                    if(isNaN(tmp[2]))activateSearch();
                }
                break;
            case 'view':
                tmp=param.split(";");
                viewManager($("#"+tmp[0]),tmp[1]=="[capoID]"?null:tmp[1]);
                break;
            case 'mylocation':
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                       map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
                    });
                }
                break;
            default:
        }
    }
    catch(err){$("body").html("<br><center>Error: makeAction actionManager / "+err.toString()+"</center>");}
}

function actionManager(){
    try{
        $(document).click(function(event){
            action_manager($(event.target));
        });           

        $("#rightfbop").click(function(){
            if($("#footeroverloadrigth").css("height").split("px").join("")=="0"){
                $("#footeroverloadrigth").css("display","block");
                $("#footeroverloadrigth").animate({
                height: ($("#footeroverloadrigth").attr("name")*40)+5
                }, 300, function() {
                });
            }
            else
                close_menu_footer_right();
        });

        $("#leftfbop").click(function(){
            if($("#footeroverloadleft").css("height").split("px").join("")=="0"){
                $("#footeroverloadleft").css("display","block");
                $("#footeroverloadleft").animate({
                height: ($("#footeroverloadleft").attr("name")*40)+5
            }, 300, function() {
            });
            }
            else
            close_menu_footer_left();
            });

        $("body > div").css("padding","0");
    }
    catch(err){$("body").html("<br><center>Error: actionManager actionManager / "+err.toString()+"</center>");}
}
