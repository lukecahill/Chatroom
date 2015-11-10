<?php
require_once('db-connect.inc.php');
$db = getDatabasePDO();

$stmt = $db->prepare('SELECT Message, SenderName, MessageSentTime FROM Messages');
$stmt->execute();

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$return = '';

foreach($rows as $item) {
	$return .= '<p><span class="sender">' . $item['SenderName'] . '</span>: ' . $item['Message'] . '<span class="datetime">' . $item['MessageSentTime'] . '</span><hr /></p>';
}

echo $return;
?>