<?php
if(isset($_POST['message'])) {
	
	require_once('db-connect.inc.php');
	$db = getDatabasePDO();

	$message = $_POST['message'];
	$sender = $_POST['name'];

	$stmt = $db->prepare('INSERT INTO Messages(Message, SenderName) VALUES(:message, :sender)');
	$stmt->execute(array(':message' => $message, ':sender' => $sender));

} else {
	die('No direct access!');
}

?>