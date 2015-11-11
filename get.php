<?php
require_once('db-connect.inc.php');
$db = getDatabasePDO();

$lastMessage = $_POST['lastmessage'];

$stmt = $db->prepare('SELECT MessageId, Message, SenderName, MessageSentTime FROM Messages WHERE MessageId > :lastmessage');
$stmt->execute(array(':lastmessage' => $lastMessage));

$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$return = '';

foreach($rows as $item) {
	$return .= '<p><span class="sender">' . $item['SenderName'] . '</span>: ' . $item['Message'] . '<span class="datetime">' . $item['MessageSentTime'] . '</span><hr /></p>';
}

echo $return;
?>