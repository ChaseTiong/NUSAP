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
	$scope.getBarChart = function(){
		var ctx = document.getElementById("canvas").getContext("2d");

		var chart = new Chart(ctx).HorizontalBar(barChartData, {
			responsive: true,
			barShowStroke: false
	  	}); 
    }	
}    
