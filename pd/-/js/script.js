$(document).ready(function(){

	// Move around field help
	$('.formHelp').each(function(e){
		var help   = $(this).html(),
			parent = $(this).parent().attr('id');
		$(this).remove();
		$('#' + parent).append('<div class="form-help">' + help + '</div>');
	});
	
	// Fix back-to-top hash
	$('#back-to-top').attr('href','#');

	// Animate search box on focus/blur
	$('#search').focus(function(){
		var style = $('#toggle-navigation').css('display');
		if(style != 'block'){
			$(this).animate({width:175},'slow');
			$(this).css('cursor','text');
		}
	}).blur(function(){
		var style = $('#toggle-navigation').css('display');
		if(style != 'block'){
			$(this).animate({width:100},'slow');
			$(this).css('cursor','pointer');
		}
	});

	// Hide content
	$('.hidden,ul.toggle-tabs .text').hide();

	// Scaled videos
	$('body').fitVids();

	// Expand textarea automatically
	$('textarea').autoGrow();

	// Placeholder support for IE/FF
	$('textarea,input').addPlaceholder();

	// Block hash links
	$('a[href="#"]').click(function(e){
		e.preventDefault();
	});

	// Track outbound and download links
	$('a:not(.video-gallery li a,.gallery li a,.scroll,.popup)').click(function(){
		if(this.hostname !== '' && this.hostname.toLowerCase().indexOf(location.hostname) === -1 && this.hostname.toLowerCase().indexOf('louisville.edu') === -1){
			recordOutboundLink(this, 'Outbound Link', $(this).attr('href'), 'Outbound Link');
		} else if(checkURLforfiletype(this.pathname)){
			recordOutboundLink(this, 'File Download', $(this).attr('href'), 'File Download');
		}
	});

	// Smooth scroll to #id or top of page
	$('.scroll').click(function(e){
		e.preventDefault();
		var a    = new Tanchor($(this).attr('href'));
		var href = a.hash();
		if(href.length === 0){
			$('html,body').animate({scrollTop:0},'slow');
		} else{
			$('html,body').animate({scrollTop:($(href).offset().top - 20)},'slow');
		}
	});

	// Slider
	$('.flexslider').flexslider();
	$('.flexslider').hover(
		function(){$('.flex-direction-nav').fadeIn();},
		function(){$('.flex-direction-nav').fadeOut();}
	);

	// Load ticker
	$('#ticker-inner').load('http://delphiserver.louisville.edu/forms/ticker/list.php',function(){
		$('#ticker-inner').cycle({
			slideResize:1,
			fx:'scrollUp',
			prev:'#prev-item',
			next:'#next-item',
			pause:1
		});
	});
	
	// Payment option
	$('.courses .btn').click(function(e){
		e.preventDefault();
		var course = $(this);
		var register = $('#register');
		if(register.length){register.remove();}
		$('body').append(
			'<div class="hidden" id="register">' +
			'	<ul>' +
			'		<li><a href="' + course.attr('href') + '">Pay by Credit Card</a></li>' +
			'		<li><a href="../companybilling?' + course.data('alt') + '">Bill My Company</a></li>' +
			'		<li><a href="../payrolldeduction?' + course.data('alt') + '">UofL Payroll Deduction</a></li>' +
			'	</ul>' +
			'</div>'
		);
		$.fancybox($('#register'));
	});

	// Toggle navigation on mobile
	$('#toggle-navigation').click(function(e){
		e.preventDefault();
		$('#navigation').slideToggle();
	});

	// Popup support
	$('.popup').fancybox();
	
	// Hash Popup
	$('.popup-hash').click(function(e){
	   e.preventDefault();
	   var a    = new Tanchor($(this).attr('href'));
	   var href = a.hash();
	   var data = $(href).html();
	   $.fancybox(data,{maxWidth:800});
	});

	// Popup image gallery
	$('.gallery li a').fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		closeBtn	: false,
		helpers		: { 
			title	: { type : 'inside' },
			buttons	: {}
		}
	});

	// Video gallery
	$('.video-gallery li a').click(function(e){
		e.preventDefault();
		var placeholder = $(this).parents().filter('ul').prev('.video-placeholder'),
					 id = $(this).attr('href').replace('http://www.youtube.com/watch?v=',''),
				  video = '<iframe width="670" height="370" src="http://www.youtube.com/embed/_ID_?rel=0&amp;hd=1&amp;wmode=transparent&amp;theme=light" frameborder="0" allowfullscreen></iframe>'.replace('_ID_',id);
		placeholder.html(video).fitVids();
		$('.current-video').removeClass('current-video');
		$(this).addClass('current-video');
		$('html,body').animate({scrollTop:placeholder.offset().top - 20},'slow');
	});

	// Toggle tabs
	$('.tab').click(function(e){
		e.preventDefault();
		var text = $(this).next('.text');
		if(text.is(':visible')){
			text.slideUp();
			$(this).children('img').rotate({animateTo:0});
		} else{
			text.slideDown();
			$(this).children('img').rotate({animateTo:180});
		}
	});

	// Fix Plone's copyright year
	$('#cyear').text((new Date).getFullYear());

	// Append ad script
	$('body').append('<script type="text/javascript" src="http://delphiserver.louisville.edu/forms/publisher/ad.php?js&u=' + location.href + '"></script>');

});

// Show/hide scroll arrow
function scroll_update(){
	var style = $('#toggle-navigation').css('display'),
		position = $(window).scrollTop(),
		arrow	 = $('#back-to-top');
	if(position >= 300 && style != 'block'){
		arrow.fadeIn();
	} else{
		arrow.fadeOut();
	}
}
$(window).scroll($.throttle(200,scroll_update));

// Display remote ad
function publishAd(content){
	if(content.length > 0){
		$('#ad-block').html(content).show();
		$('#ad-block').fitVids();
		$('#ad-block a').attr('target','_blank');
	}
}

// Tracking outbound links in GA
function recordOutboundLink(link, category, action, opt_label){
	_gat._getTrackerByName()._trackEvent(category, action, opt_label);
	setTimeout('document.location = "' + link.href + '"', 100);
}
function checkURLforfiletype(path){
	filetypes = [".pdf", ".xls", ".xlsx", ".ppt", ".pptx", ".doc", ".docx", ".txt", ".csv", ".mov", ".mp3"];
	var arraylen = filetypes.length;
	for(var i=0; i<arraylen; i++){
		if(path.toLowerCase().indexOf(filetypes[i]) != -1){
			return true;
		}
	}
	return false;
}