<?php
require_once('db-connect.inc.php');
$db = getDatabasePDO();

$lastmessage = $_POST['lastmessage'];

$stmt = $db->prepare('SELECT MessageId FROM Messages WHERE MessageId > :lastmessage');
$stmt->execute(array(':lastmessage' => $lastmessage));

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$rowCount = count($rows);

if($rowCount > 0) {
	$rownumber = $rowCount > 1 ? $rows[$rowCount - 1]['MessageId'] : $rows[0]['MessageId'];
	$send = array('result' => true, 'rownumber' => $rownumber);
	echo json_encode($send);
} else {
	echo json_encode(false);
}

?>