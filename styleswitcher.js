/*
 * 	basic Style-Switcher jQuery plugin
 *	written by Simon Jockers
 *
 *	Built for the jQuery library
 *	http://jquery.com
 *
 */

(function( $ ){

	$.fn.styleswitcher = function( customSettings ) {  

	    var settings = {
			'classname' : 'styleswitcher',
			'title' : '',
	    	'options' 	: [
				{
					'classnameToToggle': 'style-1',
					'buttonClassname': 'style-1-button',
					'buttonCopy' : 'Set style 1'
				},	
				{
					'classnameToToggle': 'style-2',
					'buttonClassname': 'style-2-button', 
					'buttonCopy' : 'Set style 2'
				},
				{
					'classnameToToggle': 'style-3',				
					'buttonClassname': 'style-3-button', 
					'buttonCopy' : 'Set style 3'
				}
			]
	    };

	    return this.each(function() {
	      // If options exist, lets merge them
	      // with our default settings
	      	if ( customSettings ) { 
	        	$.extend( settings, customSettings );
	      	}

			var cookieID = 'jStyTcher_' + settings.classname;

			initStyles();		
			initControls( this );

			function initControls( self )
			{
				var controls= $('<div/>').addClass( settings.classname );
				var ul = $('<ul/>');
				if( settings.title != "" )
				{
					controls.append( $('<span/>').html(settings.title) );
				}
				controls.append(ul);
				for (var i in settings.options) 
				{
					var li = $('<li/>').addClass( settings.options[i].buttonClassname );
					var a = $('<a/>');
					a.html( settings.options[i].buttonCopy );
					a.attr('rel', settings.options[i].classnameToToggle);
					a.bind('click', function(event){ 					
						toggleStyles( $(event.target).attr('rel') );						
					});
					ul.append( li.append(a) );
				}		
				controls.appendTo(self);		
			};	
		
			function initStyles()
			{
				var cookie = readCookie(cookieID);
				if (cookie) {
					toggleStyles(cookie);
				}
				else {
					toggleStyles( settings.options[0].classnameToToggle )
				}
			};
		
			function toggleStyles( classname )
			{
				for (var i in settings.options)
				{
					var c = settings.options[i].classnameToToggle;
					if ( $("body").hasClass( c ) )
					{
						$("body").removeClass( c )
					};
				}			
				$("body").addClass( classname );
				createCookie( cookieID, classname, 365);
			};	
		
			// cookie functions borrowed from http://www.quirksmode.org/js/cookies.html
			function createCookie(name,value,days)
			{
				if (days)
				{
					var date = new Date();
					date.setTime(date.getTime()+(days*24*60*60*1000));
					var expires = "; expires="+date.toGMTString();
				}
				else var expires = "";
				document.cookie = name+"="+value+expires+"; path=/";
			}

			function readCookie(name)
			{
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for(var i=0;i < ca.length;i++)
				{
					var c = ca[i];
					while (c.charAt(0)==' ') c = c.substring(1,c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
				}
				return null;
			}

			function eraseCookie(name)
			{
				createCookie(name,"",-1);
			}
		});
	};
})( jQuery );
