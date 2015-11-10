/* By Luke Cahill - 10/11/15*/

$(document).ready(function() {
	
	$('.welcome').hide();
	
	var getMessages = function() {
		// get the message here
		
		$.ajax({
			method: 'GET',
			url: 'get.php'
		}).done(function(message) {
			var $chatbox = $('#chatbox');
			$('.prepended').remove();
			$chatbox.append('<span class="prepended">' + message + '</span>');
			$chatbox.animate({ scrollTop: $chatbox.prop('scrollHeight')}, 750)
		});
	};
	
	var sendMessage = function() {
		// post the message here
		var message = $('#message').val() 
	    var $chatbox = $('#chatbox');
		var name = $('#name').val();
		
		$.ajax({
		   method: 'POST',
		   url: 'post.php',
		   data: { message: message, name: name}
		}).done(function(done) {
		   getMessages();
		});
	};
	
	// Get the new messages every 2.5 seconds. Trying to reduce the database load.
	var getMessageInterval = setInterval(function() {
		getMessages();
	}, 2500);
	
	var stop = function() {
		clearInterval(getMessageInterval);
	};
	
	// Used to clear the message box.
	var clearTextbox = function() {
		$('#message').val('');
	};
	
	var checkForName = function() {
		$name = $.trim($('#name').val());
		if($name == '') {
			return false;
		} else {
			return true;
		}
	};
	
	var setName = function() {
		$name = $('#name').val();
		$('.welcome').html('Welcome, <b>' + $name + '</b>');
		$('#setYourName').hide();
		$('.welcome').show();
	};
	
	// When the send message button is clicked.
    $('#sendMessage').on('click', function() {
		if(checkForName()) {
			sendMessage();
			clearTextbox();
		} else {
			alert("Please enter your name");
		}
    });
	
	// When the enter key is clicked.
	$('#message').on('keyup', function(event) {
		if(event.keyCode == 13) {
			if(checkForName()) {
				sendMessage();
				clearTextbox();
			} else {
				alert("Please enter your name");
			}
		}
	});
	
	// Set your chat name
	$('#setName').on('click', function() {
		setName();
	});
	
	$('#name').on('keyup', function() {
		if(event.keyCode == 13) {
			setName();
		}
	});
	
	$('#aboutButton').on('click', function() {
		alert('Created using HTML, CSS using bootstrap, JavaScript with jQuery, and PHP for the backend to post into the MySQL database.\n\nGets the new messages every 2.5 seconds, this could be improved, but this is mostly just a prototype.');
	});
});