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
     
    var req = {
			method : 'GET',
			url    : 'index.php?id=modTaken&token=' + token + '&studentID=' + sessionStorage["netid"];
		}
		$http(req).then(
			function (response) { //success
                for(var x in response.data.Results.length){
				    $scope.moduleCode = response.data.Results[x].ModuleCode; 
                    $scope.moduleTitle = response.data.Results[x].ModuleTitle; 
                    $scope.acadYear = response.data.Results[x].AcadYear;
                    $scope.semester = response.data.Results[x].Semester;
				    $scope.module = $scope.moduleCode + '  ' + $scope.moduleTitle;
                }
            }, function (response) { //error
			}
    	);
    };  
    
    $scope.moduleTaken = function() {
    	  
    };	  

    
}*/