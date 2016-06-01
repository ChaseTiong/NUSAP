//Graduation Progress
var randomScalingFactor = function(){
	return Math.round(Math.random()*100);
};

var barChartData = {
	labels : ["Core","ULR","UE"],
	datasets : [
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,0.8)",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data : [randomScalingFactor(),randomScalingFactor(),randomScalingFactor()]
		},
		{
			fillColor : "rgba(151,187,205,0.5)",
			strokeColor : "rgba(151,187,205,0.8)",
			highlightFill : "rgba(151,187,205,0.75)",
			highlightStroke : "rgba(151,187,205,1)",
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