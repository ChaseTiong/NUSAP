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


angular
    .module('NUSAP')
    .controller('AcadPlannerCtrl', ['$scope', '$http', AcadPlannerCtrl]);

function AcadPlannerCtrl($scope, $http) {
     
    $scope.count1 = 0;
    $scope.max1 = 5;
    var req = {
			method : 'GET',
			url    : 'index.php?id=modTaken&token=' + token + '&studentID=' + sessionStorage["netid"];
		}
		$http(req).then(
			function (response) { //success
                for(var x in response.data.Results.length){
				    $scope.moduleCode = response.data.Results[x].ModuleCode; 
                    $scope.moduleTitle = response.data.Results[x].ModuleTitle; 
                    $scope.acadYear = response.data.Results[x].AcadYear; //format e.g. 2015/2016, how to change to year 1/2/3/4?
                    $scope.semester = response.data.Results[x].Semester;
                    $scope.max1 = function() { //max # of mod taken in sem 1    
                    if $scope.acadYear != //previous acadYear{
                        if($scope.semester = 1){
                            $scope.count1++;
                            if($scope.count1 < $scope.max1)
                                $scope.max1 = $scope.count1;
                        }
                    }
				    $scope.module = $scope.moduleCode + '  ' + $scope.moduleTitle;
                }
            }, function (response) { //error
			}
    	);
    };  
    
    $scope.moduleTaken = function() {
    	  
    };	  

    
}*/