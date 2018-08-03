var lnStickyNavigation;

$(document).ready(function(){	
	fixNav();
	applyHeader();
	//applyNavigation(); 
	//applyMailTo();
	//applyResize();
	//checkHash();
	//checkBrowser();
});

/* HEADER FUNCTIONS */

	// fix the header padding issues with it overlaying on top of the body
	// If it doesn't work: try these: https://stackoverflow.com/questions/11124777/twitter-bootstrap-navbar-fixed-top-overlapping-site
	// It should constantly resize the padding of the area to match the window size properly.



   function fixNav(){
   		// fix the header padding issues with it overlaying on top of the body
		// If it doesn't work: try these: https://stackoverflow.com/questions/11124777/twitter-bootstrap-navbar-fixed-top-overlapping-site
		// It should constantly resize the padding of the area to match the window size properly.
        $(document.body).css('padding-top', $('#topnavbar').height() + 0);
        $(window).resize(function(){
            $(document.body).css('padding-top', $('#topnavbar').height() + 0);
        });
		
		

   }

function applyHeader()
{
	$('.jumbotron').css({ height: ($(window).height()) +'px' });
} 