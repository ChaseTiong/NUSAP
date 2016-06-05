

angular.module('NUSAP')
  .controller('stackedBarCtrl', ['$scope', '$cookieStore', '$http', '$location', stackedBarCtrl]);
    
function stackedBarCtrl($scope) {
    Highcharts.chart('stackedBar', {
      chart: {
      type: 'bar'
	},
    title: {
      text: 'Degree Requirement'
    },
    xAxis: {
      categories: ['UE', 'ULR', 'CORE']
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Total MCs'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Planned',
      data: [1, 3, 4],
      color: 'rgba(220,220,220,0.5)'
    }, {
      name: 'Taken',
      data: [2, 2, 3],
      color: 'rgba(151,187,205,0.5)'
    }]
    });
}