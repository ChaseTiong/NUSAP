/**
 * Master Controller
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





var userName;
var studentId;

angular.module('NUSAP')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$http', '$location', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $http, $location) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
	$scope.username = "";
	$scope.showProfile = function(){
		$scope.userProfile = !$scope.userProfile;
	
	}
	
	$scope.getProfile = function(){
		var req = {
			method : 'GET',
			url    : 'index.php?id=profile&token=' + token
		}
		$http(req).then(
			function (response) {
			$scope.username = response.data.Results[0].Name;
			sessionStorage.setItem("userName", $scope.username);
			sessionStorage.setItem("netid", response.data.Results[0].UserID);
			// success function
			console.log(response.data.Results[0]);
			//$scope.username = response.data;
			}, function (response) {
			// Failure Function
			$scope.username = "Invalid User";
			}
		);
	}
	
	$scope.logout = function(){
		sessionStorage.clear();
		$scope.$applyAsync(function(){
    		$scope.showMenu = false;
		});
		window.location = "http://188.166.249.181/nusap/dist";
	}
		
	$scope.checkToken = function(){
		var req = {
			method : 'GET',
			url    : 'index.php?id=checkToken&token=' + token
		}
		$http(req).then(
			function (response) {
			// success function
			console.log("test : " + response.data);
			console.log(response.data.Success);
			$result = response.data.Success;
				//if token is invalid
				if($result == false){
					//Invalid Token found
					//redirect to login page
					$location.path("/login");	 
				//if token is valid
				//update php session --> Token
				} else{
					var isValidToken = $result;
					$scope.$applyAsync(function(){
    					$scope.showMenu = true;
					});
					sessionStorage.setItem("isValidToken",isValidToken);
					sessionStorage.setItem("token",token);
				}			
			//$scope.username = response.data;
			}, function (response) {
			// Failure Function
			console.log("Error");
			}
		);
	}
	
    $scope.getWidth = function() {
        return window.innerWidth;
    };
    


    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}