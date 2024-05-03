$(function() {
	function facebookConnect() {
		$('div.blackout').show();
		// POPUP the Facebook Connect Box
		// IF facebook connnected (with returned account name)...
		var accountName = "FacebookName";
		$('div.blackout').click( function() {
			$('div.blackout').hide();
			$('div#step1').hide();
			$('div.progressbar span.step1 b').html( accountName );
			$('div#step2').show();
			$('div.connectedstatus b').html( accountName );
			$('div.connectedstatus').show();
		});
	}
	$('div#step1 div.facebookconnectbutton').click( function() {
		facebookConnect();
	});
	$('div.progressbar span.step1').click( function() {
		facebookConnect();
	});
	$('div.connectedstatus span').click( function() {
		facebookConnect();
	});
	$('div#step2 div.submitbutton').click( function() {
		var redeemcode = $('input#redeemcode').attr('value');
		if ( redeemcode.length < 1 ) {
			// Show ERROR for empty code
			$('div#step2').hide();
			$('div#error h4').html("That code is empty.");
			$('div#error').show();
		} else {
			// AJAX SEND THE CODE TO THE SERVER
			// ON SUCCESS...
			// IF ERROR, show the div#error with message...
			// Else Success... (with Meteor Credits Value)
			var creditValue = 1500;
			var transactionId = "AC-342344";
			$('div.contactarea input#transactionid').attr('value',transactionId);
			$('div#step2').hide();
			$('div#success h3 span').html( creditValue );
			$('div#success div.transactionid b').html( transactionId );
			$('div#success').show();
			$('div.gamearea').addClass("clickable");
		}
	});
	$('div#error div.tryagainbutton').click( function() {
		$('div#error').hide();
		$('div#step2').show();
	});
	$('div#success div.anothercardbutton').click( function() {
		$('div#success').hide();
		$('div#step2 input').attr('value','');
		$('div#step2').show();
	});
	$('div.helpbutton').click( function() {
		$('div.helparea').toggle();
	});
	$('div.helparea div.close, div.helparea div.backbutton').click( function() {
		$('div.helparea').hide();
	});
	$('div.helparea span.contactbutton').click( function() {
		$('div.contactarea').show();
	});
	$('div.helparea span.forumsbutton').click( function() {
		$('div.helparea').hide();
		var url = "http://www.meteorgames.com/forums/";
		var newWindow = window.open( url, '_blank' );
		newWindow.focus();
		return false;
	});
	$('div.contactarea div.close').click( function() {
		$(this).parent('div.contactarea').hide();
	});
	$('div.contactarea div.contactbutton').click( function() {
		var input_email = $('div.contactarea #email').attr('value');
		var input_transactionid = $('div.contactarea #transactionid').attr('value');
		var input_question = $('div.contactarea #question').attr('value');
		if ( input_email.length <= 1 ) {
			$('div.contactarea #email').css({"background-color":"#ff0","color":"#000"});
			$('div.contactarea #email').parents('span.contactinput').siblings('span.error').css({"display":"block"});
		} else if ( input_question.length <= 1 ) {
			$('div.contactarea #question').css({"background-color":"#ff0","color":"#000"});
			$('div.contactarea #question').parents('span.contacttextarea').siblings('span.error').css({"display":"block"});
		} else {
			// AJAX OUT THE QUERY
			// ON SUCCESS...
			$('div.messagearea').show();
			$('div.contactarea').hide();
		}
	});
	$('div.messagearea div.okbutton, div.messagearea div.close').click( function() {
		$('div.messagearea').hide();
		$('div.helparea').hide();
	});
	function swimFish( fishName ) {
		var areaX = $('div#swim_area').width();
		var areaY = $('div#swim_area').height();
		var swimX = Math.floor( Math.random() * areaX );
		var swimY = Math.floor( Math.random() * areaY );
		if ( swimY < 250 ) {
			swimY += 250;
		}
		var currentX = parseInt( $('div#' + fishName ).css("left") );
		if ( currentX > swimX ) {
			$("div#" + fishName ).addClass("left");
		} else {
			$("div#" + fishName ).removeClass("left");
		}
		var distance = Math.floor( Math.sqrt( (swimX * swimX) + (swimY * swimY) ) );
		var speed = Math.floor( ( Math.random() * 10 + 5 ) * distance );
		$('div#' + fishName ).animate( {
		    left: swimX + "px",
		    top: swimY + "px"
		}, speed, function() {
			swimFish( fishName );
		});
	}
	$('div.aquariummode').click( function() {
		$('div.frame').toggle();
		$('div.legal').toggle();
	});
	var numFish = 4;
	function addFish() {
		$('div#swim_area').append([
			"<div id='fish", (numFish+1), "' class='swim_fish angelfish'></div>",
			"<div id='fish", (numFish+2), "' class='swim_fish azurediscus'></div>",
			"<div id='fish", (numFish+3), "' class='swim_fish clownfish'></div>",
			"<div id='fish", (numFish+4), "' class='swim_fish mintminnow'></div>"
		].join(''));
		swimFish( "fish" + (numFish+1) );
		swimFish( "fish" + (numFish+2) );
		swimFish( "fish" + (numFish+3) );
		swimFish( "fish" + (numFish+4) );
		numFish += 4;
	}
	$('.morefish').click( function() {
		addFish();
	});
    
    addFish();

    // Launch in Aquarium Mode
    var showFrame = parseInt(getURLParameter("showFrame"));
    if (showFrame === 1) {
        $('div.frame').css('display','block');
        $('div.legal').css('display','block');
    }

});


function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}