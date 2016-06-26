

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
    
    $scope.testMcs = function(){
       var modsReq = {
            method : 'GET',
            url    : 'index.php?id=checkMod&modCode=CP3200'
        }
        $http(modsReq). then(
            function (response2) {
                $scope.testResults = response2.data.ModuleCredit;
            },function (response2){
                console.log("error");
            }
        );  
    }
    
	$scope.modsTaken = function(){
		var req = {
			method : 'GET',
			url    : 'index.php?id=modsTaken&token=' + token +'&studentID=' + sessionStorage['netid']
		}
		$http(req).then(
			function (response) {
                $scope.modsCount = response.data.Results.length;
                $scope.takenMods = [];
                //$scope.takenMods = response.data.Results;
                var count = 0;
                for(var i = 0; i < $scope.modsCount; i ++){
                    //geting the result from IVLE API
                   
                  
                    //accessing NUSmods API
                    if(response.data.Results[i].Semester == 1){
                        $scope.takenMods[count] = {}
                        
                        
                        var currentMod = response.data.Results[i].ModuleCode;
                        $scope.$applyAsync(function(){
                            console.log(currentMod);
                            var modsReq = {
                                method : 'GET',
                                url    : 'index.php?id=checkMod&modCode=' + currentMod
                            }
                            $http(modsReq). then(
                                function (response2) {
                                    $scope.credit = {}
                                    if(response2.data.ModuleCredit != null){
                                        $scope.credit = {
                                            "ModuleCredit":response2.data.ModuleCredit
                                        }
                                    } else {
                                        $scope.credit = {
                                            "ModuleCredit": 10
                                        }
                                    }
                                    //$scope.credit = {
                                    //    "ModuleCredit":4
                                    //}
                                    console.log($scope.credit);
                                    angular.extend(response.data.Results[i],$scope.credit);
                                    console.log(response.data.Results[i]);
                                    //var unit = new function(){                       
                                    //    this.ModuleCredit = response2.data.ModuleCredit;
                                    //};
                                    //if(unit != undefined){
                                    //    $scope.takenMods[count].push(unit);
                                    //}
                                    //$scope.creditUnit = unit;
                                    //var unit = "test"
                                    //$scope.takenMods[count].ModuleCode = unit;
                                },function (response2){
                                    console.log("error");
                                }
                            );
                        });
                        
                        $scope.takenMods[count] = response.data.Results[i];
                        count ++;
                    }
                }
                //$scope.mods = response.data.Results.length;
                //console.log(response.data.Results[0].Name);
			//sessionStorage.setItem("userName", $scope.username);
			//sessionStorage.setItem("netid", response.data.Results[0].UserID);
			// success function
			//console.log(response.data.Results[0]);
			//$scope.username = response.data;
			}, function (response) {
                console.log("error");
			// Failure Function
			//$scope.username = "Invalid User";
			}
		);
	}    
	
}    


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
