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
    
    history.replaceState({} , null, "index.html");
    //window.load
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
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$http', '$location', '$window', '$q', '$log', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $http, $location, $window, $q, $log) {
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
    
//    $scope.test = function(event){
//        $log.info($scope.searchBox);
//        $log.info(event);
//        //console.log($scope.searchBox);
//    }
//   
    
//    $scope.filterMod = function(module){
//        if(!$scope.searchBox || module.ModuleCode.toLowerCase().indexOf($scope.searchBox) != -1){
//            return true;
//        }else{
//            return false;
//        }
//    }; 
    
//    $scope.testList = [];
//    for (var i = 1; i <= 10; i++) {
//        $scope.testList.push({
//          "ModuleCode": "Code " + Math.floor(Math.random() * 100) + 1,
//          "ModuleTitle": "Title " + Math.floor(Math.random() * 100) + 1,
//          "Semesters": "Semester " + Math.floor(Math.random() * 100) + 1
//        });
//    }
        
//        if(!$scope.searchBox || (module.ModuleCode.toLowerCase().indexOf($scope.searchBox) != -1) || (module.ModuleTitle.toLowerCase.indexOf($scope.searchBox.toLowerCase()) != - 1)){
//            return true;
//        } else{
//            return false;
//        }
    

    
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
    
    function getModInfo(modCode, modSem, modAcadYear){
        return $http({
            method : 'GET',
            url    : 'index.php?id=checkMod&modCode=' + modCode + '&sem=' + modSem + '&acadYear=' + modAcadYear            
        });             
    }
    
    function getModList(){
        return $http({
            method : 'GET',
            url    : 'index.php?id=modSearch'           
        });            
    }
 
    $scope.modList = [];

    getModList().then(
        function (responseModList) {
            sessionStorage.setItem("modsList", JSON.stringify(responseModList.data));
            var moduleList = JSON.parse(sessionStorage.getItem("modsList"));
            angular.forEach(moduleList, function(value,key){
                $scope.modList.push({
                    ModuleCode      : moduleList[key].ModuleCode,
                    ModuleTitle     : moduleList[key].ModuleTitle,
                    Semesters       : moduleList[key].Semesters
                });
        });
        $scope.tempModList = $scope.modList;    
    });
    //$scope.tempModList = $scope.modList;
    
    $scope.updateModList = function(currentText){
        //$scope.tempModList = $scope.modList;
        //console.log($scope.updateModList);
        currentText = currentText.toUpperCase();
        console.log("current Text : " + currentText);
        //console.log("previous Text : " + previousText);
        $scope.modList = [];
        //angular.forEach($scope.tempModList, function(value,key){
        if(currentText.length < 1){
            $scope.modList = $scope.tempModList;
        } else{
            for(var key = 0 ; key < $scope.tempModList.length; key ++){    
                console.log($scope.tempModList[key].ModuleCode.startsWith(currentText));
                if($scope.tempModList[key].ModuleCode.startsWith(currentText)){
                    $scope.modList.push({
                        ModuleCode      : $scope.tempModList[key].ModuleCode,
                        ModuleTitle     : $scope.tempModList[key].ModuleTitle,
                        Semesters       : $scope.tempModList[key].Semesters
                    });   
                }
            }
        }
            //console.log($scope.tempModList);
            //console.log($scope.modList);
        //});
        
    }
    
	$scope.getProfile = function(){
        
        //history.replaceState({} , null, "index.html");
        
       
        function getAllAcadYear(matricYear){
            var lastYear = parseInt(JSON.parse(sessionStorage.getItem("modsTaken"))[0].AcadYear.substring(5));
            var resultArr = [];
            
            
            //Debug purpose to be deleted
            //var lastYear = 2017;
            //End of debug
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            matricYear = parseInt(matricYear);
            var semCount = 1;
            for(var i = matricYear; i <= lastYear; i ++){
                var appendYear = i + 1;
                var nextYear = appendYear;

                if(appendYear == lastYear){
                    if(month < 9){
                        appendYear = i + "/" + appendYear + "-" + semCount;
                        resultArr.push(appendYear);
                    
                        appendYear = i + 1;
                        
                        appendYear = i + "/" + appendYear + "-" + (semCount + 1);
                        resultArr.push(appendYear);
  
                    }else{
                        appendYear = i + "/" + appendYear + "-" + semCount;
                        resultArr.push(appendYear);
                    
                        appendYear = i + 1;
                        
                        appendYear = i + "/" + appendYear + "-" + (semCount + 1);
                        resultArr.push(appendYear);
                        
                        appendYear = i + 2;
                        
                        appendYear = (i + 1) + "/" + appendYear + "-" + semCount;
                        resultArr.push(appendYear);
                        
                    }
                //if the appendYear is lower than the current Year , add in sem 2
                } else if(appendYear < lastYear){
                    appendYear = i + "/" + appendYear + "-" + semCount;
                    resultArr.push(appendYear);
                    
                    appendYear = i + 1;
                    appendYear = i + "/" + appendYear + "-" + (semCount + 1);
                    resultArr.push(appendYear);
                } 
                
            }
            return resultArr;

        }
        
		getUserProfile().then(
			function (responseProfile) {
                $scope.username = responseProfile.data.Results[0].Name;
                sessionStorage.setItem("userName", $scope.username);
                sessionStorage.setItem("netid", responseProfile.data.Results[0].UserID);

                sessionStorage.setItem("matricYear", responseProfile.data.Results[0].MatriculationYear);
                
                $scope.plannerSize = [];
                $scope.unlockSem = [];
            
                //start of ruiwen code
                //default candidature: 3 years

                var year = 3;
                var matricYear = responseProfile.data.Results[0].MatriculationYear;

                for(var i=0;i<year;i++) {
                    $scope.plannerSize.push({ candidatureYear: (parseInt(matricYear)+i) + "/" + (parseInt(matricYear)+i+1), modsPerSem: 5 });
                }
                //add year
                $scope.addYear = function() {
                    year = year + 1;
                    var newYear = { candidatureYear: (parseInt(matricYear)+year-1) + "/" + (parseInt(matricYear)+year), modsPerSem: 5 }
                    $scope.plannerSize.push(newYear);
                }
                
                
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
                        
                        $scope.specialMods = [];
                        $scope.modsPerSem = [];

                    //$scope.takenMods = response.data.Results;
                        var count = 0;
                        //var deferredCount = $q.defer();
                        //async(deferredCount.resolve, deferredCount.reject);
                        
                        //userModsTaken variable contains all mods taken
                        var userModsTaken = JSON.parse(sessionStorage.getItem("modsTaken"));
                        
                        var totalModsCount = JSON.parse(sessionStorage.getItem("modsTaken")).length;
                        //console.log("total mods : " + totalModsCount);
                        
                        //getting all the academic year of the users
                        sessionStorage.setItem("userSem", JSON.stringify(getAllAcadYear(JSON.parse(sessionStorage.getItem("matricYear")))));   
                        console.log("test result : " + getAllAcadYear(JSON.parse(sessionStorage.getItem("matricYear")))); 
                        var userSem = JSON.parse(sessionStorage.getItem("userSem"));
                        var currentSem = 1;
                        //console.log(userSem[2]);
                        
                        //use a unique mod count to keep track poly mod/ unique mod
                        angular.forEach(userSem, function(result,index){
                            $scope.takenMods = [];
                            var currentSemMod = [];
                            $scope.unlockSem.push(false);
                            //console.log("current index " + index);
                            angular.forEach(userModsTaken, function(value,key){
                                //console.log("key : " + userModsTaken[key].ModuleCode);
                                //console.log(userSem[index].substring(10,11));
                                if(userModsTaken[key].Semester == userSem[index].substring(10,11) && userModsTaken[key].AcadYear == userSem[index].substring(0,9)){ 
                                    getModInfo(userModsTaken[key].ModuleCode, userModsTaken[key].Semester, userModsTaken[key].AcadYear). then(
                                        function(responseModInfo) {
                                            if(responseModInfo.data === ""){
                                                //console.log("Failed : " + userModsTaken[key].ModuleCode);
                                                currentSemMod.unshift({
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

                                                //console.log($scope.takenMods[count]);
                                                currentSemMod[0].selectedModGrade = currentSemMod[0].ModuleGrade[0];
                                                currentSemMod[0].selectedModSuStatus = currentSemMod[0].ModuleSuStatus[0];
                                                //count ++;
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
                                                //console.log("Success : " + responseModInfo.data.ModuleCode);
                                                currentSemMod.push({
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
                                                //console.log($scope.takenMods[count]);
                                                //count ++;
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
                            
                            $scope.modsPerSem.push(currentSemMod);
                            //count = 0;
                            //console.log($scope.takenMods);
                            /*$scope.$applyAsync(function(){
                                //var currentArr = $scope.takenMods;
                                var currentArr = [];
                                angular.extend($scope.takenMods,currentArr);
                                $scope.modsPerSem.push($scope.takenMods);
                                //console.log("mods per sem : " + $scope.modsPerSem[index]);
                                
                            });*/
                            
                        });
                        //console.log($scope.unlockSem);
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
		//window.location = "http://nusap.me/nusap/dist";
        
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
			//console.log("test : " + response.data);
			//console.log(response.data.Success);
            
              
            
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
                    //history.replaceState({} , null, "index.html");	 
					$scope.$applyAsync(function(){
    					$scope.showMenu = true;
                        //window.history.replaceState({} , null, "index.html");
                        
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