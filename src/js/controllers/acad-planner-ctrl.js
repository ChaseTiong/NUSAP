/**
 * Alerts Controller
 */
/*var token;

if(sessionStorage.getItem("token") == null){
	token = getUrlVars()["token"];
	sessionStorage.setItem("isValidToken",false);
} else{
	token = sessionStorage.getItem("token");
	sessionStorage.setItem("isValidToken",true);
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
}  

var userName;
var studentId;

angular.module('NUSAP')
    .controller('AcadPlannerCtrl', ['$scope', '$cookieStore', '$http', '$location', AcadPlannerCtrl]);

function AcadPlannerCtrl($scope, $cookieStore, $http, $location) {
    
    /*$scope.testMcs = function(){
       var modsReq = {
            method : 'GET',
            url    : 'index.php?id=checkMod&modCode=CP3200'
        }
        $http(modsReq). then(
            function (response2) {
                $scope.testResults = response2.data.ModuleCredit;
            },function (response2){
                console.log("error");
            }
        );  
    }
    
	$scope.modsTaken = function(){
		var req = {
			method : 'GET',
			url    : 'index.php?id=modsTaken&token=' + token +'&studentID=' + sessionStorage['netid']
		}
		/*$http(req).then(
			function (response) { //success
                $scope.AcadYear = response.data.Results[0].AcadYear; //matriculation acad year
                $scope.Year = 1;
                $scope.maxYear = 4;
                //$scope.count1, $scope.count2 = 0;
                $scope.max1, $scope.max2 = 5; //max module count per semester
                $scope.takenMods = [];
                
                for(var x = 0 ; x < response.data.Results.length; x ++){
                    if(response.data.Results[x].AcadYear == $scope.AcadYear){
                        /*if(response.data.Results[x].Semester = 1){
                            $scope.count1++;
                            if($scope.count1 < $scope.max1)
                                $scope.max1 = $scope.count1;
                        
                        }
                    }
				    $scope.modTaken[$scope.Year][response.data.Results[x].Semester] = response.data.Results[x].ModuleCode + '  ' + response.data.Results[x].ModuleTitle;//printout
                    else { 
                        $scope.AcadYear = response.data.Results[x].AcadYear;
                        $scope.Year++; 
                        $scope.modTaken[$scope.Year][response.data.Results[x].Semester] = response.data.Results[x].ModuleCode + '  ' + response.data.Results[x].ModuleTitle; //printout
                    }
      		$http(req).then(
			function (response) {
                $scope.modsCount = response.data.Results.length;
                $scope.takenMods = [];          
                var count = 0;
                for(var i = 0; i < $scope.modsCount; i ++){
                    //geting the result from IVLE API
                   
                    //accessing NUSmods API
                    if(response.data.Results[i].Semester == 2){
                        
                        //$scope.$applyAsync(function(){
                            var currentMod = response.data.Results[i].ModuleCode;
                            var semester = response.data.Results[i].Semester;
                        
                            console.log(currentMod);
                            var req = {
			                 method : 'GET',
			                 url    : 'index.php?id=profile&token=' + token
		                      }
		                      $http(req).then(
			                     function (response) {
                                    $scope.token = token;
				                    $scope.username = response.data.Results[0].Name;  
                                    console.log("current count : " + count);
                                    $scope.takenMods[count] = response2.data;
                                    if(response2.data == ""){
                                        $scope.takenMods[count] ={
                                            "ModuleCode":response.data.Results[i].ModuleCode,
                                            "ModuleTitle":response.data.Results[i].ModuleTitle,
                                            "ModuleCredit":4
                                        }
                                            
                                        
                                    }
                                    count = count + 1;
                                    console.log($scope.takenMods[count]);
                
                
                
                
			}, function (response) {
                console.log("error");
			// Failure Function
			//$scope.username = "Invalid User";
			}
		);
	}    
	
}    
*/