function scroll_update(){var e=$("#toggle-navigation").css("display"),t=$(window).scrollTop(),n=$("#back-to-top");t>=300&&e!="block"?n.fadeIn():n.fadeOut()}function publishAd(e){if(e.length>0){$("#ad-block").html(e).show();$("#ad-block").fitVids();$("#ad-block a").attr("target","_blank")}}function trackLink(e,t,n,r){_gat._getTrackerByName()._trackEvent(t,n,r);setTimeout('document.location = "'+e.href+'"',100)}function checkURLforfiletype(e){filetypes=[".pdf",".xls",".xlsx",".ppt",".pptx",".doc",".docx",".txt",".csv",".mov",".mp3"];var t=filetypes.length;for(var n=0;n<t;n++)if(e.toLowerCase().indexOf(filetypes[n])!=-1)return!0;return!1}$(document).ready(function(){$(".formHelp").each(function(e){var t=$(this).html(),n=$(this).parent().attr("id");$(this).remove();$("#"+n).append('<div class="form-help">'+t+"</div>")});$("#search").focus(function(){var e=$("#toggle-navigation").css("display");if(e!="block"){$(this).animate({width:175},"slow");$(this).css("cursor","text")}}).blur(function(){var e=$("#toggle-navigation").css("display");if(e!="block"){$(this).animate({width:100},"slow");$(this).css("cursor","pointer")}});$("body").fitVids();$("textarea").autoGrow();$("textarea,input").addPlaceholder();$("#back-to-top,#toggle-navigation").attr("href","#");$('a[href="#"]').click(function(e){e.preventDefault()});$("a:not(.video-gallery li a,.gallery li a,.scroll,.popup,.courses .btn)").click(function(){this.hostname!==""&&this.hostname.toLowerCase().indexOf(location.hostname)===-1&&this.hostname.toLowerCase().indexOf("louisville.edu")===-1?trackLink(this,"Outbound Link",$(this).attr("href"),"Outbound Link"):checkURLforfiletype(this.pathname)&&trackLink(this,"File Download",$(this).attr("href"),"File Download")});$(".scroll").click(function(e){e.preventDefault();var t=new Tanchor($(this).attr("href")),n=t.hash();n.length===0?$("html,body").animate({scrollTop:0},"slow"):$("html,body").animate({scrollTop:$(n).offset().top-20},"slow")});$("#home .slides a").click(function(e){e.preventDefault();var t=$(this).children("img").data("keyword");_gat._getTrackerByName()._trackEvent("Home Page Banner","Click",t);$(this).hasClass("popup-hash")||setTimeout('document.location = "'+$(this).attr("href")+'"',100)});$(".flexslider").flexslider();$(".flexslider").hover(function(){$(".flex-direction-nav").fadeIn()},function(){$(".flex-direction-nav").fadeOut()});$("#ticker-inner").load("http://delphiserver.louisville.edu/forms/ticker/list.php",function(){$("#ticker-inner").cycle({slideResize:1,fx:"scrollUp",prev:"#prev-item",next:"#next-item",pause:1})});$(".courses .btn").click(function(e){var t=$(this),n=$("#payment-method");if(t.data("alt").length){n.length&&n.remove();$("body").append('<div class="hidden" id="payment-method">	<ul>		<li><a href="'+t.attr("href")+'">Pay by Credit Card</a></li>'+'		<li><a href="../../companybilling?'+t.data("alt")+'">Bill My Company</a></li>'+'		<li><a href="../../payrolldeduction?'+t.data("alt")+'">UofL Payroll Deduction</a></li>'+"	</ul>"+"</div>");$.fancybox($("#payment-method"));e.preventDefault()}});$("#toggle-navigation").click(function(e){$("#navigation").slideToggle();e.preventDefault()});$(".popup").fancybox();$(".popup-hash").click(function(e){var t=new Tanchor($(this).attr("href")),n=t.hash(),r=$(n).html();$.fancybox(r,{maxWidth:800});e.preventDefault()});$(".gallery li a").fancybox({prevEffect:"none",nextEffect:"none",closeBtn:!1,helpers:{title:{type:"inside"},buttons:{}}});$(".video-gallery li a").click(function(e){var t=$(this).parents().filter("ul").prev(".video-placeholder"),n=$(this).attr("href").replace("http://www.youtube.com/watch?v=",""),r='<iframe width="670" height="370" src="http://www.youtube.com/embed/_ID_?rel=0&amp;hd=1&amp;wmode=transparent&amp;theme=light" frameborder="0" allowfullscreen></iframe>'.replace("_ID_",n);t.html(r).fitVids();$(".current-video").removeClass("current-video");$(this).addClass("current-video");$("html,body").animate({scrollTop:t.offset().top-20},"slow");e.preventDefault()});$(".tab").click(function(e){var t=$(this).next(".text");if(t.is(":visible")){t.slideUp();$(this).children("img").rotate({animateTo:0})}else{t.slideDown();$(this).children("img").rotate({animateTo:180})}e.preventDefault()});$("#cyear").text((new Date).getFullYear());$("body").append('<script type="text/javascript" src="http://delphiserver.louisville.edu/forms/publisher/ad.php?js&u='+location.href+'"></script>')});$(window).scroll($.throttle(200,scroll_update));