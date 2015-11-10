<?php

function getDatabasePDO() {
	return $db = new PDO('mysql:host=localhost;dbname=chat_application;charset=utf8', 'root', '');
}

?>