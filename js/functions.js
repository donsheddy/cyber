var resize=0;
var ajaxRootFiles="http://dpma.mobi/caponate/html5/";
var section=null;
var height={
            ad:0,
            header:0,
            footer:0,
            content:0
           };
       
$(window).load(function(){
    try{
        $("body").animate({'opacity':0},100);
        window.addEventListener("orientationchange",reload);
        window.addEventListener("touch",resizeAll);

        $("link[rel=icon]").attr("href",$(location).attr('href').substring(0,$(location).attr('href').lastIndexOf('/'))+'/images/icono.png');
        $("link[rel=apple-touch-icon]").attr("href",$(location).attr('href').substring(0,$(location).attr('href').lastIndexOf('/'))+'/images/icono.png');
        $('div[action]').css("cursor","pointer");
        
    
        resizeAll();
        setTimeout(function(){$(".menuBar").click();},2000);
    }
    catch(err){$("body").html("<br><center>Error: init.events functions / "+err.toString()+"</center>");}
});


function testObjects(){
    try{
        if($(".ad").length && $(".ad").html().split(" ").join("").split("\n").join("").length==0){
            $(".ad").html("<center><a href='http://www.mobincube.com' target='_blank'><img src='images/banne221x50.png'></a></center>");
            $(".ad").css("background","#ddd");
        }
        elementsPosition();    
        setTimeout("testObjects();",2000);
    }
    catch(err){$("body").html("<br><center>Error: testObjects functions / "+err.toString()+"</center>");}
    
}

function close_menu_footer_right(){
    try{
        $("#footeroverloadrigth").animate({
            height: '0px'
        }, 300, function() {
        $("#footeroverloadrigth").css("display","none");
        });
    }
    catch(err){$("body").html("<br><center>Error: closeMenuFooterR functions / "+err.toString()+"</center>");}
}

function close_menu_footer_left(){
    try{
        $("#footeroverloadleft").animate({
            height: '0px'
        }, 300, function() {
        $("#footeroverloadleft").css("display","none");
        });
    }
    catch(err){$("body").html("<br><center>Error: closeMenuFooterL functions / "+err.toString()+"</center>");}
}

function hideBars(){
    try{
        height.header=$("#mainHeader").height();
        height.footer=$("#mainFooter").height();
        height.ad=$(".ad").height();
        $(".content").prepend($("#mainHeader").html());
        $(".content").append($("#mainFooter").html());
        $("#mainHeader").html("");
        $("#mainFooter").html("");
        $("#mainFooter").html($(".ad"));
        $(".content .ad:first").remove();

        //mount right scroll access bar
        $("body").append("<div class='scrollBarRight'><div></div><div></div><div></div><div></div></div><div class='menuBar'></div>");   
        $(".menuBar").bind("click touch",function(){
            if($(".scrollBarRight").css("right").split("px").join("")=="0"){
                $(".scrollBarRight").animate({right:"-60px"});$(".menuBar").animate({opacity:1});}
            else
                {$(".scrollBarRight").animate({right:"0px"});$(".menuBar").animate({opacity:0});}
        });

        $(".content").bind("click touch",function(){
            $(".scrollBarRight").animate({right:"-60px"});$(".menuBar").animate({opacity:1});
        });

        $(".scrollBarRight > div:nth-child(2)").bind("click touch",function(){$("body").scrollTo(0,1000,{axis:'y'});});
        $(".scrollBarRight > div:last").bind("click touch",function(){$("body").scrollTo($(document).height(),1000,{axis:'y'});});
    }
    catch(err){$("body").html("<br><center>Error: hideBars functions / "+err.toString()+"</center>");}
}

function blockBars(){
    try{
        $(".despheader,.despfooter,#content").unbind("click touchstart");
        $(".despmenu").remove();
        $("#mainHeader").animate({top:'0px'},300);
        $("#mainFooter").animate({bottom:'0px'},300);

        $("#mainFooter").width($(window).width());
        $("#mainHeader").width($(window).width());
        $("#content").width($(window).width());
    }
    catch(err){$("body").html("<br><center>Error: closeMenuFooterR functions / "+err.toString()+"</center>");}
}

function resizeAll(){
    try{
        $("body").animate({padding:'0px',margin:'0px'},400);

        height.header=$("#mainHeader").height();
        height.footer=$("#mainFooter").height();
        height.ad=$(".ad").height();
        height.content=$(window).height()-height.header-height.footer;
    }
    catch(err){$("body").html("<br><center>Error: resizeAll:ini functions / "+err.toString()+"</center>");}
    if(typeof (window.init_section) == 'function')init_section();
    if(typeof (window.add) == 'function')add();
    
    $(".element_row .inner_row .element_body").each(function(){
        $(this).width($(this).parent().parent().width()*(parseInt($(this).attr("wd"))/100));
    });
    
    actionManager();
    
    blockBars();
    
    try{
        if($(window).width()>$(window).height() || Math.abs(window.orientation)==90)
            hideBars();

        if(location == top.location || navigator.userAgent.toLowerCase().indexOf('chrome')>-1)
        $("body").css("overflowY","auto");

        setTimeout(function(){$("body").css("opacity","1");},600);
        testObjects();
        elementsPosition();
        $(".content").css("minHeight",($(window).height()-$("#mainFooter").height()-$("#mainHeader").height())+"px");
    }
    catch(err){$("body").html("<br><center>Error: resizeAll:end functions / "+err.toString()+"</center>");}
}

function reload(){
    try{
        window.location.reload();
    }
    catch(err){$("body").html("<br><center>Error: reload functions / "+err.toString()+"</center>");}
}

function inArray(needle, haystack) {
    try{
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return i;
        }
        return -1;
    }
    catch(err){$("body").html("<br><center>Error: inArray functions / "+err.toString()+"</center>");}
}

function elementsPosition(){
    try{
        $("img[src='images/'],img[src=''],img[src='null']").remove();
        $(".element_row .inner_row .element_body").each(function(){

            obj=$(this).parent().parent().parent().attr("style");
            
           if(obj && obj.indexOf("width")>=0)
                tmp=parseInt(obj.substring(obj.indexOf("width:")+6,obj.indexOf("px")))*(parseInt($(this).attr("wd"))/100);
            else
                tmp=$(this).parent().parent().width()*(parseInt($(this).attr("wd"))/100);
               
            $(this).width(tmp);
            
            //$(this).height($(this).parent().parent().height());
            
            if(parseInt($(this).height())==1)
                $(this).width(parseFloat($(this).width())-1);
        });

        $("#mainHeader .element_row,#mainFooter .element_row").each(function(){
            if($(this).children(".inner_row").height())
                $(this).height($(this).children(".inner_row").height());
        });
        
        
        $("input.df_w_element_100:[mod!='1']").width($("input.df_w_element_100").width()-20);
        $("input.df_w_element_100").attr("mod","1");
        
        $(".onlinetext").each(function(){
            if($(this).attr("ruta").search(".mobincube.com")>=0)cad=$(this).attr("ruta")+$("body").attr("idapp");
            else cad=$(this).attr("ruta");
            $(this).load(ajaxRootFiles+"getTextFile.php?url="+cad, function(){
                $(this).html($(this).html().replace(/\n/g, '<br />'))
            }); 
        });
        
        if($(window).width()>$(window).height())
            $(".main_body").not(".itemVista .main_body").css("minHeight",$(".main_body > div").not(".itemVista .main_body > div").height());
        else
            $(".main_body").not(".itemVista .main_body").css("minHeight",height.content);

        $(".resize").each(function(){
            $(this).width(($(this).attr("w"))*$(this).parent().width());
        });

        //vertical alignment of elements
        $(".df_el_valign_parent_middle").not(".inner_row,.element_row").each(function(){
            if($(this).parent().parent().height()>$(this).height())
                $(this).css("marginTop",(($(this).parent().parent().height())/2)-($(this).height()/2));
        });
        $(".df_el_valign_parent_bottom").not(".inner_row").each(function(){
            if($(this).parent().parent().height()>$(this).height())$(this).css("marginTop",($(this).parent().parent().height()-$(this).height()));
        });

        $(".content .df_el_valign_child_middle,.content .element_search_container .inner_row,#mainHeader .df_el_valign_child_middle,#mainHeader .element_search_container .inner_row,#mainFooter .df_el_valign_child_middle,#mainFooter .element_search_container .inner_row").each(function(){
            if($(this).attr("id")=="element_body"){
                tmp=0;
                $(this).children("div").each(function(){
                    tmp+=$(this).height();
                });
                if($(this).height>tmp)$(this).css("paddingTop",($(this).height-tmp)/2);
            }
            else{
                $(this).children("div").not(".inner_row").each(function(){
                    if($(this).height()<$(this).parent().height())$(this).css("marginTop",($(this).parent().height()-$(this).height())/2);
                });
            }});
        $(".df_el_valign_child_bottom").each(function(){
            if($(this).attr("id")=="element_body"){
                tmp=0;
                $(this).children("div").each(function(){
                    tmp+=$(this).height();
                });
                if($(this).height>tmp)$(this).css("paddingTop",($(this).height-tmp));
            }
            else{
                $(this).children("div").not(".inner_row").each(function(){
                    if($(this).height()<$(this).parent().height())$(this).css("marginTop",($(this).parent().height()-$(this).height()));
                });
            }
        });
        $(".ui-page").css("paddingTop",$("#mainHeader").height()+"px");
        $(".ui-page").css("paddingBottom",$("#mainFooter").height()+"px");
        $(".ui-page").css("minHeight",($(window).height()-$("#mainFooter").height()-$("#mainHeader").height())+"px");
        $(".onlinemap").height($(document).height()-$("#mainFooter").height()-$("#mainHeader").height());
        $("body").animate({'opacity':1},800);
        if(!/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()))
        if($(window).width()<$(window).height())
            $(".bgSection").css("backgroundPosition","0px "+$("#mainHeader").height()+"px");
    }
    catch(err){$("body").html("<br><center>Error: elementsPosition functions / "+err.toString()+"</center>");}
}
var collections=new Array();
var dateSet=new Array();
var fileCollection=new Array();collections['collection58242']={"1":{"capoID":"1","Month":"January","Date":"07\/01\/2013 ","Event":"Name of the event","Description":"Describe here your event","photo":"images\/Img891207.jpg"},"2":{"capoID":"2","Month":"February","Date":"14\/02\/2013 ","Event":"Name of the event","Description":"Describe here your event","photo":"images\/Img891207.jpg"},"3":{"capoID":"3","Month":"March","Date":"07\/03\/2013 ","Event":"Name of the event","Description":"Describe here your event","photo":"images\/Img891207.jpg"},"4":{"capoID":"4","Month":"April","Date":"04\/04\/2013 ","Event":"Name of the event","Description":"Describe here your event","photo":"images\/Img891207.jpg"},"5":{"capoID":"5","Month":"May","Date":"01\/05\/2013 ","Event":"Name of the event","Description":"Describe here your event","photo":"images\/Img891207.jpg"},"6":{"capoID":"6","Month":"June","Date":"24\/06\/2013 ","Event":"Name of the event","Description":"Describe here your event","photo":"images\/Img891207.jpg"}};
dateSet['collection58242']={"Date":{"2013-01-07":"1","2013-02-14":"2","2013-03-07":"3","2013-04-04":"4","2013-05-01":"5","2013-06-24":"6"}};
collections['collection58243']={"1":{"capoID":"1","placeName":"School","location_lat":"40834130.0","location_lng":"-73947576.0","image":"images\/Img891208.jpg","labels":"txt1482507","keywords":null}};
dateSet['collection58243']='none';
collections['collection58244']={"1":{"capoID":"1","Name":"Teacher 1","Subject":"History","email":"example@example.com","Telephone":"+01123456789","Information":"Write here interesting information about the teacher like curriculum, methodology, resources, etc, think about your target. If you want to add this information you must add a detail view and design it.","WebBlog":"http:\/\/blog.ifyouhave.com","photo":"images\/Img891194.png"},"2":{"capoID":"2","Name":"Teacher 2","Subject":"Science","email":"example@example.com","Telephone":"+01123456789","Information":"Write here interesting information about the teacher like curriculum, methodology, resources, etc, think about your target. If you want to add this information you must add a detail view and design it.","WebBlog":"http:\/\/blog.ifyouhave.com","photo":"images\/Img891194.png"},"3":{"capoID":"3","Name":"Teacher 3","Subject":"Spanish","email":"example@example.com","Telephone":"+01123456789","Information":"Write here interesting information about the teacher like curriculum, methodology, resources, etc, think about your target. If you want to add this information you must add a detail view and design it.","WebBlog":"http:\/\/blog.ifyouhave.com","photo":"images\/Img891194.png"},"4":{"capoID":"4","Name":"Teacher 4","Subject":"Geography","email":"example@example.com","Telephone":"+01123456789","Information":"Write here interesting information about the teacher like curriculum, methodology, resources, etc, think about your target. If you want to add this information you must add a detail view and design it.","WebBlog":"http:\/\/blog.ifyouhave.com","photo":"images\/Img891194.png"}};
dateSet['collection58244']='none';
