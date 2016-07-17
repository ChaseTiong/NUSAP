<?php 
	$APIKey = "woOdsGZSg4y0WTLAhboQw";
	$token = $_SESSION["token"];
    $currentYear = intval(date('Y'));
    $currentMonth = intval(date('m')); 
    
    if($currentMonth < 7){
        $currentYear = $currentYear - 1;
    }
    //echo $currentMonth;
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
        $acadYear = $_GET['acadYear'];
        $frontYear = substr($acadYear,0,4);
        $backYear = substr($acadYear,5);
        
        if($acadYear != "" && intval($backYear) <= $currentYear){
            $url = "http://api.nusmods.com/".$frontYear."-".$backYear."/".$semester."/modules/".$modCode.".json";
        }
        else{
            $url = "http://api.nusmods.com/".$currentYear."-".($currentYear + 1)."/".$semester."/modules/".$modCode.".json";
        }
        $json = file_get_contents("$url");
        echo $json;     
    }else if (strcmp($id, "modSearch") == 0){
        $url = "http://api.nusmods.com/2016-2017/moduleList.json";
        $json = file_get_contents("$url");
        echo $json; 
    }
?>