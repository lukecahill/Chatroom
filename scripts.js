/* By Luke Cahill - 10/11/15*/

$(document).ready(function() {
	
	var lastMessage = 0, $welcome = $('.welcome'), $chatbox = $('#chatbox'), $name = $('#name'), re = new RegExp("\s+");
	$('.welcome').hide();
	checkForNewMessage();
	var maximum = 500;
	$wordCount = $('#wordCount');
	
	$wordCount.html(maximum + ' characters remaining');
	
	/**
	* @function addTag
	*
	* Add a new checkbox for tags to the DOM
	* @param {string} where
	* @param {string} input
	* @param {bool} edit
	**/
	function getMessages() {
		// get the message here
		
		$.ajax({
			method: 'POST',
			url: 'get.php',
			data: { lastmessage: lastMessage}
		}).done(function(message) {
			$chatbox.append(message);
			$chatbox.animate({ scrollTop: $chatbox.prop('scrollHeight')}, 750)
		});
	};
	
	/**
	* @function addTag
	*
	* Add a new checkbox for tags to the DOM
	* @param {string} where
	* @param {string} input
	* @param {bool} edit
	**/
	function checkForNewMessage() {
		$.ajax({
			method: 'POST',
			url: 'check.php',
			data: { lastmessage: lastMessage }
		}).done(function(data) {
			var recievedData = $.parseJSON(data);
			$('.loading').hide();
			if(recievedData.result == true) {
				getMessages();
				lastMessage = (recievedData.rownumber);
				recievedData = '';
			}

		}).fail(function() {
			console.log("Failed to check for new messages");
		});
	};
	
	/**
	* @function addTag
	*
	* Add a new checkbox for tags to the DOM
	* @param {string} where
	* @param {string} input
	* @param {bool} edit
	**/
	function sendMessage() {
		// post the message here
		var message = $('#message').val() 
		var name = $name.val();
		
		$.ajax({
		   method: 'POST',
		   url: 'post.php',
		   data: { message: message, name: name}
		}).done(function(done) {
		   checkForNewMessage();
		});
	};
	
	/**
	* @function getMessageInterval
	*
	* Starts a new timer which gets the new messages every 2.5 seconds.
	* This value can be changed as required.
	**/
	var getMessageInterval = setInterval(function() {
		checkForNewMessage();
	}, 2500);

	/**
	* @function stop
	*
	* Stops the getMessageInterval timer.
	**/
	function stop() {
		clearInterval(getMessageInterval);
	};
	
	/**
	* @function clearTextbox
	*
	* Clears the textbox of user input.
	* Resets the word count.
	**/
	function clearTextbox() {
		$('#message').val('');
		$('#wordCount').html('');
	};
	
	/**
	* @function checkForName
	*
	* Checks that the user has entered a value for the name field.
	**/
	function checkForName() {
		var nameCheck = $.trim($name.val());
		if(nameCheck == '') {
			return false;
		} else {
			return true;
		}
	};
	
	/**
	* @function setName
	*
	* Sets the users username. This is displayed in the chat, and is also saved to the database.
	**/
	function setName() {
		var setName = $.trim($name.val());
		if($name !== '') {
			$welcome.html('Welcome, <b>' + setName + '</b>');
			$('#setYourName').hide();
			$welcome.show();
		} else {
			alert('Name cannot be blank!');
		}
	};
	
	/**
	* @function addTag
	*
	* Calls the sendMessage() function if the send message button is clicked.
	**/
    $('#sendMessage').on('click', function() {
		if(checkForName()) {
			sendMessage();
			clearTextbox();
		} else {
			alert("Please enter your name");
		}
    });
	
	/**
	* @function addTag
	*
	* Changes the amount of characters remaining. 
	* Calls the sendMessage() function if the return key is pressed. 
	**/
	$('#message').on('keyup', function(event) {
		if(event.keyCode == 13) {
			if(checkForName()) {
				sendMessage();
				clearTextbox();
			} else {
				alert("Please enter your name");
			}
		}
		
		var $message = $('#message');
		var remaining = (maximum - $message.val().length);
		
		$wordCount.html(remaining + ' characters remaining');
	});
	
	/**
	* @function 
	*
	* Fires the setName() funcion when the set button is clicked.
	**/
	$('#setName').on('click', function() {
		setName();
	});
	
	/**
	* @function 
	*
	* Fires the setName() funciton when the return key is pressed to send the message.
	**/
	$name.on('keyup', function(event) {
		if(event.keyCode == 13) {
			setName();
		}
	});
	
	/**
	* @function 
	*
	* Show a JS alert box with information about the project.
	**/
	$('#aboutButton').on('click', function() {
		alert('Created using HTML, CSS using bootstrap, JavaScript with jQuery, and PHP for the backend to post into the MySQL database.\n\nGets the new messages every 2.5 seconds, this could be improved, but this is mostly just a prototype.');
	});
	
	/**
	* @function 
	*
	* Marks the message as read once the user has moused over the message
	**/
	$chatbox.on('mouseover', '.unread', function() {
		$(this).removeClass('unread');
	});
});