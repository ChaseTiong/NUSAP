var randomScalingFactor = function(){
	return Math.round(Math.random()*100);
};

var barChartData = {
	labels : ["Core","ULR","UE"],
	datasets : [
		{
			fillColor : "#98FB98",
			strokeColor : "#00FF7F",
			highlightFill: "#00FF7F",
			highlightStroke: "#00FF7F",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		},
		{
			fillColor : "#FA8072",
			strokeColor : "#FA8072",
			highlightFill : "#E58270",
			highlightStroke : "#FA8072",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		}
	]

};
//End of Graduation Progress

angular.module('NUSAP')
    .controller('BarCtrl', ['$scope', '$cookieStore', '$http', '$location', BarCtrl]);

function BarCtrl($scope, $cookieStore, $http, $location) {
    
    $scope.currentCore = "5%";
    
	$scope.getBarChart = function(){
		var ctx = document.getElementById("canvas").getContext("2d");

		var chart = new Chart(ctx).HorizontalBar(barChartData, {
			responsive: true,
			barShowStroke: false
	  	}); 
    }
    //var totalCreditTaken = parseInt(sessionStorage.getItem("totalCreditTaken"));
    //console.log(totalCreditTaken);
    //$scope.$applyAsync(function(){
        //$scope.overallProgress = (totalCreditTaken / 160 * 100) + "%";
    //});
//    var totalCreditTaken = 0;
////    var modulesTaken = JSON.parse(sessionStorage.getItem("modsTaken"));
////    var totalCreditTaken = 0;
////    angular.forEach(modulesTaken, function(key, value){
////        totalCreditTaken = totalCreditTaken + modulesTaken[key].ModuleCredit;
////    });
//    $scope.modulesTaken = JSON.parse(sessionStorage.getItem("modsTaken"));
//    //console.log(JSON.parse(sessionStorage.getItem("modsTaken")));
//    angular.forEach($scope.modulesTaken, function(value,key){
//        var currentModCredit = parseInt(JSON.parse(sessionStorage.getItem($scope.modulesTaken[key].ModuleCode)).ModuleCredit);
//        totalCreditTaken = totalCreditTaken + currentModCredit; 
//    });
//    //console.log(totalCreditTaken);
//    $scope.overallProgress = totalCreditTaken / 160 * 100;
//    $scope.overallProgress = $scope.overallProgress + "%";
//    //console.log($scope.overallProgress);
}    
