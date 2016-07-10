<?php 
	$APIKey = "woOdsGZSg4y0WTLAhboQw";
	$token = $_SESSION["token"];
	if($token == ""){
		$token = $_GET['token'];
	}	
	$id = $_GET['id'];
    $studentID = $_GET["studentID"];
	if(strcmp($id, "profile") == 0){
		$url = "https://ivle.nus.edu.sg/api/Lapi.svc/Profile_View?APIKey=".$APIKey."&AuthToken=".$token;
		$json = file_get_contents("$url");
		echo $json;	
	} else if(strcmp($id, "checkToken") == 0){
		$url = "https://ivle.nus.edu.sg/api/Lapi.svc/Validate?APIKey=".$APIKey."&Token=".$token;
		$json = file_get_contents("$url");
		echo $json;
	} else if (strcmp($id, "modsTaken") == 0){
        $url = "https://ivle.nus.edu.sg/api/Lapi.svc/Modules_Taken?APIKey=".$APIKey."&AuthToken=".$token."&StudentID=".$studentID;
		$json = file_get_contents("$url");
		echo $json;	
    } else if (strcmp($id, "checkMod") == 0){
        $modCode = $_GET['modCode'];
        $semester = $_GET['sem'];
        $url = "http://api.nusmods.com/2015-2016/".$semester."/modules/".$modCode.".json";
        $json = file_get_contents("$url");
        echo $json;     
    }else if (strcmp($id, "modSearch") == 0){
        $url = "http://api.nusmods.com/2016-2017/moduleList.json";
        $json = file_get_contents("$url");
        echo $json; 
    }
?>