

/*angular.module('NUSAP')
.controller('CapCalCtrl', function($scope) {
  $scope.boxClass = true;
}); */

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
    .controller('CapCalCtrl', ['$scope', '$cookieStore', '$http', '$location', CapCalCtrl]);

function CapCalCtrl($scope, $cookieStore, $http, $location) {
    //sessionStorage.setItem("test",$scope.selectedModStatus);

}    



