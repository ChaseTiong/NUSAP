

/*angular.module('NUSAP')
.controller('CapCalCtrl', function($scope) {
  $scope.boxClass = true;
}); /*
/*var randomScalingFactor = function(){
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
    .controller('CapCalCtrl', ['$scope', '$cookieStore', '$http', '$location', CapCalCtrl]);

function CapCalCtrl($scope, $cookieStore, $http, $location) {
	$scope.getBarChart = function(){
		var ctx = document.getElementById("canvas").getContext("2d");

		var chart = new Chart(ctx).HorizontalBar(barChartData, {
			responsive: true,
			barShowStroke: false
	  	}); 
    }	
}    
*/

/*(function () {
  'use strict';
  angular.module('ng-slide-down', []).directive('ngSlideDown', [
    '$timeout',
    function ($timeout) {
      var getTemplate, link;
      getTemplate = function (tElement, tAttrs) {
        if (tAttrs.lazyRender !== void 0) {
          return '<div ng-if=\'lazyRender\' ng-transclude></div>';
        } else {
          return '<div ng-transclude></div>';
        }
      };
      link = function (scope, element, attrs, ctrl, transclude) {
        var closePromise, duration, elementScope, emitOnClose, getHeight, hide, lazyRender, onClose, show;
        duration = attrs.duration || 1;
        elementScope = element.scope();
        emitOnClose = attrs.emitOnClose;
        onClose = attrs.onClose;
        lazyRender = attrs.lazyRender !== void 0;
        if (lazyRender) {
          scope.lazyRender = scope.expanded;
        }
        closePromise = null;
        element.css({
          overflow: 'hidden',
          transitionProperty: 'height',
          transitionDuration: '' + duration + 's',
          transitionTimingFunction: 'ease-in-out'
        });
        getHeight = function (passedScope) {
          var c, children, height, _i, _len;
          height = 0;
          children = element.children();
          for (_i = 0, _len = children.length; _i < _len; _i++) {
            c = children[_i];
            height += c.clientHeight;
          }
          return '' + height + 'px';
        };
        show = function () {
          if (closePromise) {
            $timeout.cancel(closePromise);
          }
          if (lazyRender) {
            scope.lazyRender = true;
          }
          return element.css('height', getHeight());
        };
        hide = function () {
          element.css('height', '0px');
          if (emitOnClose || onClose || lazyRender) {
            return closePromise = $timeout(function () {
              if (emitOnClose) {
                scope.$emit(emitOnClose, {});
              }
              if (onClose) {
                elementScope.$eval(onClose);
              }
              if (lazyRender) {
                return scope.lazyRender = false;
              }
            }, duration * 1000);
          }
        };
        scope.$watch('expanded', function (value, oldValue) {
          if (value) {
            return $timeout(show);
          } else {
            return $timeout(hide);
          }
        });
        return scope.$watch(getHeight, function (value, oldValue) {
          if (scope.expanded && value !== oldValue) {
            return $timeout(show);
          }
        });
      };
      return {
        restrict: 'A',
        scope: { expanded: '=ngSlideDown' },
        transclude: true,
        link: link,
        template: function (tElement, tAttrs) {
          return getTemplate(tElement, tAttrs);
        }
      };
    }
  ]);
}.call(this));

(function() {
  "use strict";
  angular.module("NUSAP", ['ng-slide-down']).controller('CapCalCtrl', function($scope) {});

}).call(this);
*/
