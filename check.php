<?php

require_once('db-connect.inc.php');
$db = Database::ConnectDb();

$lastmessage = $_POST['lastmessage'];

if($lastmessage == 0) {
	$stmt = $db->prepare("SELECT MessageId 
						FROM Messages
						ORDER BY MessageId DESC
						LIMIT 1");
	$stmt->execute();
	$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$result = $rows[0]['MessageId'];
	
	$send = array('result' => true, 'rownumber' => $result);
	echo json_encode($send);
} else {
	$stmt = $db->prepare("SELECT MessageId 
						FROM Messages
						ORDER BY MessageId DESC
						LIMIT 1");
	$stmt->execute();
	$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$result = $rows[0]['MessageId'];
	
	if($result > $lastmessage) {
		$send = array('result' => true, 'rownumber' => $result);
		echo json_encode($send);
	} else {
		echo json_encode(false);
	} 
}

?>