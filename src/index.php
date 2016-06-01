<?php 
	$APIKey = "woOdsGZSg4y0WTLAhboQw";
	$token = $_SESSION["token"];
	if($token == ""){
		$token = $_GET['token'];
	}	
	$id = $_GET['id'];
	if(strcmp($id, "profile") == 0){
		$url = "https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?APIKey=".$APIKey."&AuthToken=".$token;
		$xml = file_get_contents("$url");
		echo $xml;	
	} else if(strcmp($id, "checkToken") == 0){
		$url = "https://ivle.nus.edu.sg/api/Lapi.svc/Validate?APIKey=".$APIKey."&Token=".$token;
		$xml = file_get_contents("$url");
		echo $xml;
	}	
?>