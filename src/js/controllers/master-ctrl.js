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
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$http', '$location', '$window', '$q', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $http, $location, $window, $q) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    function get(url) {
        var deferred = $q.defer();
        $http(url)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }
    
    
    var mobileView = 992;
	$scope.username = "";
	$scope.showProfile = function(){
		$scope.userProfile = !$scope.userProfile;
	
	}
    
    
//    var reqToGetProfile = {
//        method : 'GET',
//        url    : 'index.php?id=profile&token=' + token
//    };
        
    function getUserProfile(){
        return $http( {
            method : 'GET',
            url    : 'index.php?id=profile&token=' + token
        });
    }
    
//    var reqForModTaken = {
//        method : 'GET',
//        url    : 'index.php?id=modsTaken&token=' + token +'&studentID=' + responseProfile.data.Results[0].UserID
//    };
    
    function getModTaken(userID){
        return $http({
            method : 'GET',
            url    : 'index.php?id=modsTaken&token=' + token +'&studentID=' + userID
        });
    }
    
//    var reqModInfo = {
//        method : 'GET',
//        url    : 'index.php?id=checkMod&modCode=' + currentMod + '&sem=' + semester
//    }
    
    function getModInfo(modCode, modSem){
        return $http({
            method : 'GET',
            url    : 'index.php?id=checkMod&modCode=' + modCode + '&sem=' + modSem            
        });            
    }
    
	$scope.getProfile = function(){
    
		getUserProfile().then(
			function (responseProfile) {
                $scope.username = responseProfile.data.Results[0].Name;
                sessionStorage.setItem("userName", $scope.username);
                sessionStorage.setItem("netid", responseProfile.data.Results[0].UserID);

                sessionStorage.setItem("matricYear", responseProfile.data.Results[0].MatriculationYear);
                
                
                //To sync with profile view, retreiving modules taken by the user    
//                var reqForModTaken = {
//                    method : 'GET',
//                    url    : 'index.php?id=modsTaken&token=' + token +'&studentID=' + responseProfile.data.Results[0].UserID
//                }
                
                getModTaken(responseProfile.data.Results[0].UserID).then(
                    function (responseModTaken) {
                        $scope.modsCount = responseModTaken.data.Results.length;
                        sessionStorage.setItem("modsTaken", JSON.stringify(responseModTaken.data.Results));
                        //Debugging
                        //This is how you retreive the array
                        //console.log(JSON.parse(sessionStorage.getItem("modsTaken")));
                        //console.log(response.data.Results);
                        $scope.takenMods = [];
                        $scope.specialMods = [];

                    //$scope.takenMods = response.data.Results;
                        var count = 0;
                        //var deferredCount = $q.defer();
                        //async(deferredCount.resolve, deferredCount.reject);
                        
                        //userModsTaken variable contains all mods taken
                        var userModsTaken = JSON.parse(sessionStorage.getItem("modsTaken"));
                        
                        var totalModsCount = JSON.parse(sessionStorage.getItem("modsTaken")).length;
                        console.log("total mods : " + totalModsCount);
                        
                        //use a unique mod count to keep track poly mod/ unique mod
                        
                        angular.forEach(userModsTaken, function(value,key){
                            //console.log("key : " + userModsTaken[key].ModuleCode);
                            if(userModsTaken[key].Semester == 1){
                                getModInfo(userModsTaken[key].ModuleCode, userModsTaken[key].Semester). then(
                                    function(responseModInfo) {
                                        if(responseModInfo.data === ""){
                                            //console.log("Failed : " + userModsTaken[key].ModuleCode);
                                            $scope.takenMods.push({
                                                ModuleCode      : userModsTaken[key].ModuleCode,
                                                ModuleTitle     : userModsTaken[key].ModuleTitle,
                                                ModuleCredit    : 4,
                                                ModuleStatus    : "Exempted",
                                                ModuleSuStatus  : ["Exempted"],
                                                selectedModSuStatus : null,
                                                selectedModGrade: null,
                                                ModuleGrade     : ["-"],
                                                AcadYear        : userModsTaken[key].AcadYear,
                                                Semester        : userModsTaken[key].Semester
                                            });
                                            
                                            sessionStorage.setItem(userModsTaken[key].ModuleCode,JSON.stringify(
                                                {
                                                    ModuleTitle     : userModsTaken[key].ModuleTitle,
                                                    ModuleCredit    : 4,
                                                    ModuleStatus    : "Exempted",
                                                    ModuleSuStatus  : "Yes",
                                                    selectedModSuStatus : null,
                                                    selectedModGrade: null,
                                                    ModuleGrade     : "-",
                                                    AcadYear        : userModsTaken[key].AcadYear,
                                                    Semester        : userModsTaken[key].Semester
                                                }
                                            ));
                                        } else{
                                            console.log("Success : " + responseModInfo.data.ModuleCode);
                                            $scope.takenMods.push({
                                                ModuleCode      : responseModInfo.data.ModuleCode,
                                                ModuleTitle     : responseModInfo.data.ModuleTitle,
                                                ModuleCredit    : responseModInfo.data.ModuleCredit,
                                                ModuleStatus    : "Normal",
                                                ModuleSuStatus  : ["No","Yes","Exempted","Waived"],
                                                selectedModSuStatus : null,
                                                selectedModGrade: null,
                                                ModuleGrade     : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                                AcadYear        : userModsTaken[key].AcadYear,
                                                Semester        : userModsTaken[key].Semester
                                            });
                                            
                                            sessionStorage.setItem(responseModInfo.data.ModuleCode,JSON.stringify(
                                                {
                                                    ModuleTitle     : responseModInfo.data.ModuleTitle,
                                                    ModuleCredit    : responseModInfo.data.ModuleCredit,
                                                    ModuleStatus    : "Normal",
                                                    ModuleSuStatus  : "No",
                                                    selectedModSuStatus : null,
                                                    selectedModGrade: null,
                                                    ModuleGrade     : "-",
                                                    AcadYear        : userModsTaken[key].AcadYear,
                                                    Semester        : userModsTaken[key].Semester
                                                }
                                            ));
                                            
                                        }
                                    }
                                );
                            }
                            
                        });
                        
//                        angular.forEach($scope.takenMods, function(value,key){
//                            $scope.modules = {
//                                selectedModSuStatus : $scope.takenMods[key].ModuleSuStatus[0],
//                                selectedModGrade    : $scope.takenMods[key].ModuleGrade[0]
//                            };
//                        });
                        
                    }, function (responseModTaken) {
                        console.log("error no mods found");
                        // Failure Function
                        
                    }
                );        
                
            }, function (responseProfile) {
			// Failure Function
                console.log("Invalid User");
                $scope.username = "Invalid User";
			}
		);
	}
	
	$scope.logout = function(){
		sessionStorage.clear();
		$scope.$applyAsync(function(){
    		$scope.showMenu = false;
		});
        //for Server implementation
		//window.location = "http://188.166.249.181/nusap/dist";
        
        //for localhost implementation
        window.location = "http://localhost:8888/dist"
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
    /*
	$scope.modsTaken = function(){
		var req = {
			method : 'GET',
			url    : 'index.php?id=modsTaken&token=' + token +'&studentID=' + sessionStorage['netid']
		}
		$http(req).then(
			function (response) {
                sessionStorage.setItem("test","Success");
                $scope.modsCount = response.data.Results.length;
                sessionStorage.setItem("ModsTaken", JSON.stringify(response.data.Results));
                //console.log(JSON.parse(sessionStorage.getItem("ModsTaken")));
                //console.log(response.data.Results);
                $scope.takenMods = [];
                $scope.specialMods = [];
                var specialModsCount = 0;
                
                //$scope.takenMods = response.data.Results;
                var count = 0;
                //use a unique mod count to keep track poly mod/ unique mod
                for(var i = 0; i < $scope.modsCount; i ++){
                    //geting the result from IVLE API
                   
                  
                    //accessing NUSmods API
                    if(response.data.Results[i].Semester == 1){
                        
                        
                        //$scope.$applyAsync(function(){
                            var currentMod = response.data.Results[i].ModuleCode;
                            console.log("currentmod: " + currentMod);
                            var currentTitle = response.data.Results[i].ModuleTitle;
                            console.log("curr title: " + currentTitle);
                            var semester = response.data.Results[i].Semester;
                        
                        
                            $scope.specialMods.push({
                                ModuleCode: currentMod,
                                ModuleTitle: currentTitle,
                                ModuleCredit: 4
                            });
                            console.log(currentMod);
                            var modsReq = {
                                method : 'GET',
                                url    : 'index.php?id=checkMod&modCode=' + currentMod + '&sem=' + semester
                            }
                            $http(modsReq). then(
                                function (response2) {
                                    console.log("current count : " + count);
                                   
                                    if(response2.data == ""){
                                        
                                        $scope.takenMods.push({
                                            ModuleCode: $scope.specialMods[count].ModuleCode,
                                            ModuleTitle: $scope.specialMods[count].ModuleTitle,
                                            ModuleCredit: $scope.specialMods[count].ModuleCredit
                                        });
                                    }
                                    else{
                                        $scope.takenMods.push({
                                            ModuleCode: response2.data.ModuleCode,
                                            ModuleTitle: response2.data.ModuleTitle,
                                            ModuleCredit: response2.data.ModuleCredit
                                            
                                        });
                                    }
                                    count = count + 1;
                                    console.log($scope.takenMods[count]);
                                    
                                },function (response2){
                                    console.log("error");
                                }
                            );
                        //});
                        
                        //$scope.takenMods[count] = response.data.Results[i];
                        
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
	*/
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