var lnStickyNavigation;

$(document).ready(function() {	
	//fixNav();
	applyHeader();
	applyNavigation();
	applyMailTo();
	applyResize();
	checkHash();
	checkBrowser();
});

/* HEADER FUNCTIONS */

	// fix the header padding issues with it overlaying on top of the body
	// If it doesn't work: try these: https://stackoverflow.com/questions/11124777/twitter-bootstrap-navbar-fixed-top-overlapping-site
	// It should constantly resize the padding of the area to match the window size properly.



   function fixNav() {
   		// fix the header padding issues with it overlaying on top of the body
		// If it doesn't work: try these: https://stackoverflow.com/questions/11124777/twitter-bootstrap-navbar-fixed-top-overlapping-site
		// It should constantly resize the padding of the area to match the window size properly.
        $(document.body).css('padding-top', $('#topnavbar').height() + 0);
        $(window).resize(function(){
            $(document.body).css('padding-top', $('#topnavbar').height() + 0);
        });
		
		

   }

/* HEADER FUNCTIONS */
function applyHeader() {
	$('.jumbotron').css({ height: ($(window).height()) +'px' });
} 



/* NAVIGATION FUNCTIONS */

function applyNavigation() {
	applyClickEvent();
	applyNavigationFixForPhone();
	applyScrollSpy();
	applyStickyNavigation();
}

function applyClickEvent() {
	$('a[href*=#]').on('click', function(e) {
		e.preventDefault();
		let anchor = $.attr(this, 'href');
		if( $(anchor).length > 0 ) {
			if(anchor=='#cv') {
				$('html, body').animate({scrollTop: $(anchor).offset().top}, 400).then($('#past-projects').modal('show'));
			}
			else {
				$('html, body').animate({scrollTop: $(anchor).offset().top}, 400);
			}
		}
		return false;
	});
}

function applyNavigationFixForPhone() {
	$('.navbar li a').click(function(event)  {
		$('.navbar-collapse').removeClass('in').addClass('collapse');
	});
}

function applyScrollSpy() {
	$('#navbar-example').on('activate.bs.scrollspy', function() {
		window.location.hash = $('.nav .active a').attr('href').replace('#', '#/');
	});
}

function applyStickyNavigation() {
	lnStickyNavigation = $('.scroll-down').offset().top + 20;
	
	$(window).on('scroll', function() {  
		stickyNavigation();  
	});  
	
	stickyNavigation();
}

function stickyNavigation() {         
	if($(window).scrollTop() > lnStickyNavigation) 	{   
		$('body').addClass('fixed');  
	} 
	else {  
		$('body').removeClass('fixed');   
	}  
}

/* MAILTO FUNCTION */
function applyMailTo() {
	// Unreverses the e-mail address so that only when clicked by the client will it render with the correct mailto:
	// This is to make it harder for bots to render/parse the source for my e-mail.
	$('a[href*=mailto]').on('click', function(e) {
		var lstrEmail = $(this).attr('href').replace('mailto:', '');
		lstrEmail = lstrEmail.split('').reverse().join('')
		$(this).attr('href', 'mailto:' + lstrEmail);
	});
}


/* RESIZE FUNCTION */
function applyResize() {
	$(window).on('resize', function() 	{  
		lnStickyNavigation = $('.scroll-down').offset().top + 20;
		$('.jumbotron').css({ height: ($(window).height()) +'px' });
	}); 
}

/* HASH FUNCTION */

function checkHash() {
	lstrHash = window.location.hash.replace('#/', '#');
	if($('a[href='+ lstrHash +']').length > 0) {
		$('a[href='+ lstrHash +']').trigger('click');
	}

}

/* IE7- FALLBACK FUNCTIONS */

function checkBrowser() {
	var loBrowserVersion = getBrowserAndVersion();
	
	if(loBrowserVersion.browser == 'Explorer' && loBrowserVersion.version < 8) 	{ 
		$('#upgrade-dialog').modal({
			backdrop: 'static',
			keyboard: false
		});
	}
}

function getBrowserAndVersion() {
	var laBrowserData = [{
		string: 		navigator.userAgent,
		subString: 		'MSIE',
		identity: 		'Explorer',
		versionSearch: 	'MSIE'
	}];
	
	return {
		browser: searchString(laBrowserData) || 'Modern Browser',
		version: searchVersion(navigator.userAgent) || searchVersion(navigator.appVersion) || '0.0'
	};
}

function searchString(paData) {
	for(var i = 0; i < paData.length; i++) {
		var lstrDataString 	= paData[i].string;
		var lstrDataProp 	= paData[i].prop;
		
		this.versionSearchString = paData[i].versionSearch || paData[i].identity;
		
		if(lstrDataString) {
			if(lstrDataString.indexOf(paData[i].subString) != -1) {
				return paData[i].identity;
			}
		}
		else if(lstrDataProp) {
			return paData[i].identity;
		}
	}
}
	
function searchVersion(pstrDataString) {
	var lnIndex = pstrDataString.indexOf(this.versionSearchString);
	
	if(lnIndex == -1) {
		return;
	}
	
	return parseFloat(pstrDataString.substring(lnIndex + this.versionSearchString.length + 1));
}