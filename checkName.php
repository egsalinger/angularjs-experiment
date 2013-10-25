<?php
require_once 'login.php';

$link = mysqli_connect($db_hostname, $db_username, $db_password, $db_database);
//echo "Connected.";

if (mysqli_connect_errno ())
{
	echo "Unable to connect to MySQL: " . mysqli_connect_error();
	exit();
}

$data = file_get_contents("php://input");
$escapedData = mysqli_escape_string($link, $data);

$query = 'SELECT * FROM Users WHERE USERID="'. $escapedData .'"';

$result = mysqli_query($link, $query);
if (mysqli_num_rows ($result))
{
	echo "true";
	mysqli_free_result($result);
}
else
{
	echo "false";
}

mysqli_close($link);

?>
