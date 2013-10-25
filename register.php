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
//mysqli_escape_string($link, $data);

$objdata = json_decode ($data, true);

$name = mysqli_escape_string ($link, $objdata["name"]);
$pass = mysqli_escape_string ($link, $objdata["password"]);
$type = mysqli_escape_string ($link, $objdata["type"]);

//echo "$name $pass $type";

$query = "INSERT INTO Users VALUES" . "('$user','$pass','$type')";

if (mysqli_query($link, $query))
{
	echo "Success!";
}
else
{
	echo "Failure!";
}

/*

if (isset ($_POST['user']) && isset ($_POST['password']) && isset ($_POST['type']))
{
	$user = get_post ('user');
	$password = get_post ('password');
	$password = password_hash($password, PASSWORD_DEFAULT);
	$type = get_post ('type');

	$query = "INSERT INTO Users VALUES" . "('$user', '$password', '$type')";


	if (!mysql_query ($query, $db_server))
	{
		echo "INSERT failed: $query<br />" . mysql_error () . "<br /><br />";
	}
	else
	{
		echo "User Sucessfully Registered! Head on over to <a href=\"login.php\">this page</a> and try it out.";
	}

}

function get_post($var)
{
	return mysql_real_escape_string($_POST[$var]);
}
*/

?>
