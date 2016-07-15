/**
 * Alerts Controller
 */
var token;

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
    .controller('AlertsCtrl', ['$scope', '$http', AlertsCtrl]);

function AlertsCtrl($scope, $http) {
 
    $scope.alerts = [{
    /*    type: 'success',
        msg: 'Thanks for visiting! Feel free to create pull requests to improve the dashboard!'
    }, {
        type: 'danger',
        msg: 'Found a bug? Create an issue with as many details as you can.'
    */    
    }];

    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };
    
    $scope.welcomeUser = function() {   
		var req = {
			method : 'GET',
			url    : 'index.php?id=profile&token=' + token
		}
		$http(req).then(
			function (response) {
                $scope.token = token;
				$scope.username = response.data.Results[0].Name;   
				$scope.msg = 'WELCOME BACK, ' + $scope.username + '!';
			}, function (response) {
			}
    	);
    	$scope.type = 'info';
    };  
    
    $scope.closeMsg = function() {
    	  $scope.alert != $scope.alert;
    };	  

    $scope.closeAlert = function(index) {
        $scope.alerts.splice($scope.alerts.indexOf(this), 1);
    };
}