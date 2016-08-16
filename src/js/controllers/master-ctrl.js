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
    //history.replaceState({} , null, "index.html");
	return vars;
}  

var userName;
var studentId;
sessionStorage.setItem("totalCreditTaken" , 0);

angular.module('NUSAP')
    .controller('MasterCtrl', ['$scope', '$cookieStore', '$http', '$location', '$window', '$q', '$log', '$timeout', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, $http, $location, $window, $q, $log, $timeout) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    //refreshed page
    $window.onload = function() {
        //console.log("page refreshed");
        $scope.capResult = "0.00";
        totalGradedMC = 0;
        totalGradePoint = 0;
        sessionStorage.setItem("totalGradedPoint", 0);
        sessionStorage.setItem("totalGradedMC", 0);
    }    
    
    $scope.$on('$stateChangeSuccess', function () {
        $scope.dashboardLoading = false;
        $scope.searchLoading = true;
        $timeout(function () {
            $scope.dashboardLoading = true;  
        }, 6000);

    });
//    $scope.dashboardLoading = false;
//    $scope.searchLoading = true;
    //if(sessionStorage.dashboardLoading != true){

    //}
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
        $scope.toDisplayMessage = true;
	
	}
    
    
//    var reqToGetProfile = {
//        method : 'GET',
//        url    : 'index.php?id=profile&token=' + token
//    };
    
    function getMajReq(){
        return $http({
           method : 'GET',
           url    : 'index.php?id=majorReq&maj=cs'
        });
    }
    
//    getMajReq().then(
//        function(response){
//            console.log("testing json file");
//            console.log(response.data.matric2015.ULR);
//        }
//    );
    
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

   //Functions to start getting JSON data of Degree Requirements
    function getCoreModules(){
        var coreModules = [];
        getMajReq().then(
            function(majReq){
                var matricYear = (JSON.parse(sessionStorage.getItem("matricYear")));
                matricYear = parseInt(matricYear);
                if(matricYear < 2015){
                    matricYear = 2015;
                }
                //console.log(matricYear);
                //getting matric year to access json data type : core
                var mYear = "matric" + matricYear;
                var result = (majReq.data[mYear]);
                coreModules = result[0].totalModules[0].mods;
                var requiredMc = result[0].requiredMc;
                //console.log("test");
                sessionStorage.setItem("coreRequiredMc",requiredMc);
                sessionStorage.setItem("coreModules",JSON.stringify(coreModules));
                //console.log(coreModules);
            } 
        );
    }
    
    function getProject8thMcModules(){
        var project8thMcModules = [];
        getMajReq().then(
            function(majReq){
                var matricYear = (JSON.parse(sessionStorage.getItem("matricYear")));
                matricYear = parseInt(matricYear);
                if(matricYear < 2015){
                    matricYear = 2015;
                }                
                //console.log(matricYear);
                //getting matric year to access json data type : 8thMC
                var mYear = "matric" + matricYear;
                var result = (majReq.data[mYear]);
                var totalModsLength = result[1].totalModules.length;
                for(var i = 0; i < totalModsLength; i ++){
                    project8thMcModules.push(result[1].totalModules[i].mods);
                }
                var requiredMc = result[1].requiredMc;
                //console.log("test");
                sessionStorage.setItem("projectRequiredMc",requiredMc);
                sessionStorage.setItem("project8thMcModules",JSON.stringify(project8thMcModules));
                //console.log(coreModules);
            }  
        );
    }
    
    function getInternshipModules(){
        var internshipModules = [];
        getMajReq().then(
            function(majReq){
                var matricYear = (JSON.parse(sessionStorage.getItem("matricYear")));
                matricYear = parseInt(matricYear);
                if(matricYear < 2015){
                    matricYear = 2015;
                }                
                //console.log(matricYear);
                //getting matric year to access json data type : 8thMC
                var mYear = "matric" + matricYear;
                var result = (majReq.data[mYear]);
                var totalModsLength = result[2].totalModules.length;
                for(var i = 0; i < totalModsLength; i ++){
                    internshipModules.push(result[2].totalModules[i].mods);
                }
                var requiredMc = result[2].requiredMc;
                //console.log("test");
                sessionStorage.setItem("internshipRequiredMc",requiredMc);
                sessionStorage.setItem("internshipModules",JSON.stringify(internshipModules));
                //console.log(coreModules);
            }  
        );
    }
    
    function getMathSciModules(){
        var mathSciModules = [];
        getMajReq().then(
            function(majReq){
                var matricYear = (JSON.parse(sessionStorage.getItem("matricYear")));
                matricYear = parseInt(matricYear);
                if(matricYear < 2015){
                    matricYear = 2015;
                }                
                //console.log(matricYear);
                //getting matric year to access json data type : core
                var mYear = "matric" + matricYear;
                var result = (majReq.data[mYear]);
                mathSciModules = result[3].totalModules[0].mods;
                var requiredMc = result[3].requiredMc;
                sessionStorage.setItem("mathSciRequiredMc",requiredMc);
                sessionStorage.setItem("mathSciModules",JSON.stringify(mathSciModules));
            } 
        );
    }   
    
    function getBreathDepthModules(){
        var breathDepthModules = [];
        getMajReq().then(
            function(majReq){
                var matricYear = (JSON.parse(sessionStorage.getItem("matricYear")));
                matricYear = parseInt(matricYear);
                if(matricYear < 2015){
                    matricYear = 2015;
                }                
                //console.log(matricYear);
                //getting matric year to access json data type : core
                var mYear = "matric" + matricYear;
                var result = (majReq.data[mYear]);
                breathDepthModules = result[4].totalModules[0].mods;
                var requiredMc = result[4].requiredMc;
                sessionStorage.setItem("breathDepthRequiredMc",requiredMc);
                sessionStorage.setItem("breathDepthModules",JSON.stringify(breathDepthModules));
            } 
        );        
    }
    
    function getULRModules(){
        var ULRModules = [];
        getMajReq().then(
            function(majReq){
                var matricYear = (JSON.parse(sessionStorage.getItem("matricYear")));
                matricYear = parseInt(matricYear);
                if(matricYear < 2015){
                    matricYear = 2015;
                }                
                //console.log(matricYear);
                //getting matric year to access json data type : core
                var mYear = "matric" + matricYear;
                var result = (majReq.data[mYear]);
                ULRModules = result[5].totalModules[0].mods;
                var requiredMc = result[5].requiredMc;
                sessionStorage.setItem("ULRRequiredMc",requiredMc);
                sessionStorage.setItem("ULRModules",JSON.stringify(ULRModules));
            } 
        );        
    }    
    //End of functions of getting Degree Requirements    
    


    
    $scope.preclusionList = [];
    
    function generatePreclusionList(moduleCode, moduleSemester, moduleAcadYear){
        
        getModInfo(moduleCode, moduleSemester, moduleAcadYear).then(
            function(response){
                //console.log(response.data.Preclusion);
                if(response.data !== ""){
                    var precludedMods = [];
                    //var precludedList = [];
                    $scope.preclusionList.push(moduleCode);
                    if(response.data.Preclusion !== undefined){
                        
                        precludedMods = response.data.Preclusion.split(",");
                        angular.forEach(precludedMods, function(selected,index){
                            //$scope.preclusionList.push(precludedMods[index].trim());
                            //console.log($scope.preclusionList);
                            if(precludedMods[index].trim().indexOf("or") == -1 && precludedMods[index].trim().indexOf("OR") == -1 && precludedMods[index].trim().indexOf("and") == -1 && precludedMods[index].trim().indexOf("/") == -1){
                                if(precludedMods[index].trim().length < 9){
                                    $scope.preclusionList.push(precludedMods[index].trim());
                                    //precludedList.push(precludedMods[index].trim());
                                }
                            //console.log($scope.preclusionList);
                            } else if(precludedMods[index].trim().indexOf(" or ") != -1){
                                //further split the result
                                var tempArray = [];
                                tempArray = precludedMods[index].trim().split(" or ");
                                angular.forEach(tempArray, function(furtherSelected, i){
                                   if(tempArray[i].indexOf(" OR ") == -1){
                                       if(tempArray[i].trim().length < 9){
                                           $scope.preclusionList.push(tempArray[i].trim()); 
                                           //precludedList.push(tempArray[i].trim());
                                       }
                                   }else{
                                       var tempArray2 = [];
                                       tempArray2 = tempArray[i].trim().split(" OR ");
                                       angular.forEach(tempArray2, function(selected2, i2){
                                           if(tempArray2[i2].trim().length < 9){
                                               $scope.preclusionList.push(tempArray2[i2].trim());
                                               //precludedList.push(tempArray2[i2].trim());
                                           }
                                       });
                                   }
                                   
                                });
                            } else if(precludedMods[index].trim().indexOf(" OR ") != -1){
                                //further split the result
                                var tempArray = [];
                                tempArray = precludedMods[index].trim().split(" OR ");
                                angular.forEach(tempArray, function(furtherSelected, i){
                                   //if(tempArray[i].indexOf(" OR ") == -1){
                                    if(tempArray[i].trim().length < 9){
                                       $scope.preclusionList.push(tempArray[i].trim());
                                        //precludedList.push(tempArray[i].trim());
                                    }
                                   
                                });
                            } else if(precludedMods[index].trim().indexOf(" and ") != -1){
                                var tempArray = [];
                                tempArray = precludedMods[index].trim().split(" and ");
                                angular.forEach(tempArray, function(furtherSelected, i){
                                   //if(tempArray[i].indexOf(" OR ") == -1){
                                    if(tempArray[i].trim().length < 9){
                                       $scope.preclusionList.push(tempArray[i].trim()); 
                                        //precludedList.push(tempArray[i].trim());
                                    }
                                   
                                });
                            } else if(precludedMods[index].trim().indexOf("/") != -1){
                                var tempArray = [];
                                tempArray = precludedMods[index].trim().split("/");
                                angular.forEach(tempArray, function(furtherSelected, i){
                                   //if(tempArray[i].indexOf(" OR ") == -1){
                                    if(tempArray[i].trim().length < 9){
                                       $scope.preclusionList.push(tempArray[i].trim());
                                        //precludedList.push(tempArray[i].trim());
                                    }
                                   
                                });
                            }
                            
                        });
                    }                    
                }
                //console.log($scope.preclusionList);
                sessionStorage.setItem("preclusionList",JSON.stringify($scope.preclusionList)); 
                var UEModules = JSON.parse(sessionStorage.getItem("UEModules"));
                
                var UERequireMC = parseInt(sessionStorage.getItem("UERequiredMc"));
               //Start to populate barchart informations
                var coreModules = JSON.parse(sessionStorage.getItem("coreModules"));
                var coreRequireMc = parseInt(sessionStorage.getItem("coreRequiredMc"));
                angular.forEach($scope.preclusionList, function(module,moduleIndex){
                   //var selectedModule = $scope.preclusionList[moduleIndex];
                   if(coreModules.indexOf(module) != -1){
                       coreModules.splice(coreModules.indexOf(module), 1);
                       sessionStorage.setItem("coreModules",JSON.stringify(coreModules));
                       coreRequireMc = coreRequireMc - 4;
                       if(coreRequireMc <= 0){
                           coreRequireMc = 0;
                       }
                       sessionStorage.setItem("coreRequiredMc", coreRequireMc);
                       angular.forEach(UEModules,function(UEMod,UEModIndex){
                           if(UEMod.ModuleCode === module){
                               UEModules.splice(UEModules.indexOf(UEMod),1);
                               sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                           }
                           
                        });
                   }
                });
                angular.forEach(UEModules,function(UEMod,UEModIndex){
                    //Special Modules 
                    if(UEMod.ModuleCode === ("CS1101S")){
                        UEModules.splice(UEModules.indexOf(UEMod),1);
                        sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                    }
                    if(UEMod.ModuleCode === ("CS1010R")){
                        UEModules.splice(UEModules.indexOf(UEMod),1);
                        sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                    }
                    if(UEMod.ModuleCode === ("CS2103")){
                        UEModules.splice(UEModules.indexOf(UEMod),1);
                        sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                    }
                    if(UEMod.ModuleCode === ("IS2101")){
                        UEModules.splice(UEModules.indexOf(UEMod),1);
                        sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                    }
                    if(UEMod.ModuleCode === ("ES1102")){
                        UEModules.splice(UEModules.indexOf(UEMod),1);
                        sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                    }
                    if(UEMod.ModuleCode === ("ES1103")){
                        UEModules.splice(UEModules.indexOf(UEMod),1);
                        sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                    }
                    if(UEMod.ModuleCode === ("CFG1010")){
                        UEModules.splice(UEModules.indexOf(UEMod),1);
                        sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                    }
                });
                
                
                var project8thMcModules = JSON.parse(sessionStorage.getItem("project8thMcModules"));
                var projectRequiredMc = parseInt(sessionStorage.getItem("projectRequiredMc"));
                angular.forEach($scope.preclusionList, function(module,moduleIndex){
                   //var selectedModule = $scope.preclusionList[moduleIndex];
                   angular.forEach(project8thMcModules, function(arrayModule, arrayIndex){
                      var selected8thMcCombination = arrayModule;
                      if(arrayModule.indexOf(module) != -1){
                          arrayModule.splice(arrayModule.indexOf(module),1);
                          sessionStorage.setItem("project8thMcModules", JSON.stringify(project8thMcModules));
                          projectRequiredMc = projectRequiredMc - 4;
                          if(projectRequiredMc <= 0){
                              projectRequiredMc = 0;
                          }
                          sessionStorage.setItem("projectRequiredMc", projectRequiredMc);
                          angular.forEach(UEModules,function(UEMod,UEModIndex){
                              if(UEMod.ModuleCode === module){
                                  UEModules.splice(UEModules.indexOf(UEMod),1);
                                  sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                              }
                          });
                      } 
                   });
                });
                
                var internshipModules = JSON.parse(sessionStorage.getItem("internshipModules"));
                var internshipRequiredMc = parseInt(sessionStorage.getItem("internshipRequiredMc"));
                angular.forEach($scope.preclusionList, function(module,moduleIndex){
                    //var selectedModule = $scope.preclusionList[moduleIndex];
                    
                    //found 12MC Internship option
                    if(internshipModules[0].indexOf(module) != -1){
                        internshipModules[0].splice(internshipModules[0].indexOf(module),1);
                        sessionStorage.setItem("internshipModules",JSON.stringify(internshipModules));
                        internshipRequiredMc = internshipRequiredMc - 12;
                        angular.forEach(UEModules,function(UEMod,UEModIndex){
                              if(UEMod.ModuleCode === module){
                                  UEModules.splice(UEModules.indexOf(UEMod),1);
                                  sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                              }
                        });
                    }
                    //found 6MC Internship options
                    else if(internshipModules[1].indexOf(module) != -1){
                        internshipModules[1].splice(internshipModules[1].indexOf(module),1);
                        sessionStorage.setItem("internshipModules",JSON.stringify(internshipModules));
                        internshipRequiredMc = internshipRequiredMc - 6;
                        angular.forEach(UEModules,function(UEMod,UEModIndex){
                              if(UEMod.ModuleCode === module){
                                  UEModules.splice(UEModules.indexOf(UEMod),1);
                                  sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                              }
                        });
                    }
                    sessionStorage.setItem("internshipRequiredMc", internshipRequiredMc);
                });
                
                var mathSciModules = JSON.parse(sessionStorage.getItem("mathSciModules"));
                var mathSciRequiredMc = parseInt(sessionStorage.getItem("mathSciRequiredMc"));
                var mathTakenMod = JSON.parse(sessionStorage.getItem("modsTaken"));
                angular.forEach($scope.preclusionList, function(module,moduleIndex){
                   //var selectedModule = $scope.preclusionList[];
                    if(mathSciModules.indexOf(module) != -1){
                        mathSciModules.splice(mathSciModules.indexOf(module), 1);
                        sessionStorage.setItem("mathSciModules",JSON.stringify(mathSciModules));
                        angular.forEach(mathTakenMod,function(mathMod,mathModIndex){
                           if(mathMod.ModuleCode === module){
                               mathSciRequiredMc = mathSciRequiredMc - 4;
                           } 
                        });
                        angular.forEach(UEModules,function(UEMod,UEModIndex){
                              if(UEMod.ModuleCode === module){
                                  UEModules.splice(UEModules.indexOf(UEMod),1);
                                  sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                              }
                        });
                        sessionStorage.setItem("mathSciRequiredMc", mathSciRequiredMc);
                   }
                }); 
        
                //H2 Maths requirement
                if((mathSciModules.indexOf("MA1521") == -1) && (mathSciModules.indexOf("MA1301") != -1)){
                    mathSciModules.splice(mathSciModules.indexOf("MA1301"), 1);
                    sessionStorage.setItem("mathSciModules",JSON.stringify(mathSciModules));
                    mathSciRequiredMc = mathSciRequiredMc - 4;
                    sessionStorage.setItem("mathSciRequiredMc", mathSciRequiredMc);                    
                }
                
                var breathDepthModules = JSON.parse(sessionStorage.getItem("breathDepthModules"));
                var breathDepthRequiredMc = parseInt(sessionStorage.getItem("breathDepthRequiredMc"));
                //var mathTakenMod = JSON.parse(sessionStorage.getItem("modsTaken"));
                angular.forEach($scope.preclusionList, function(module,moduleIndex){
                   //var selectedModule = $scope.preclusionList[];
                    if(breathDepthModules.indexOf(module) != -1){
                        if(breathDepthRequiredMc <= 0){
                            if(UEModules.indexOf(module) != -1){
                                UEModules.splice(UEModules.indexOf(module),1);
                                sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                                UERequireMC = UERequireMC - 4;
                                sessionStorage.setItem("UERequiredMc",UERequireMC);
                            }
                        }
                        breathDepthModules.splice(breathDepthModules.indexOf(module), 1);
                        sessionStorage.setItem("breathDepthModules",JSON.stringify(breathDepthModules));
                        breathDepthRequiredMc = breathDepthRequiredMc - 4;
                        sessionStorage.setItem("breathDepthRequiredMc", breathDepthRequiredMc);
                        angular.forEach(UEModules,function(UEMod,UEModIndex){
                              if(UEMod.ModuleCode === module){
                                  UEModules.splice(UEModules.indexOf(UEMod),1);
                                  sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                              }
                        });
                    }
                }); 
                
                var ULRModules = JSON.parse(sessionStorage.getItem("ULRModules"));
                var ULRRequiredMc = parseInt(sessionStorage.getItem("ULRRequiredMc"));
                var ULRTakenMod = JSON.parse(sessionStorage.getItem("modsTaken"));
                angular.forEach($scope.preclusionList, function(module,moduleIndex){
                   //var selectedModule = $scope.preclusionList[];
                    if(ULRModules.indexOf(module) != -1){
                        ULRModules.splice(ULRModules.indexOf(module), 1);
                        sessionStorage.setItem("ULRModules",JSON.stringify(ULRModules));
                        angular.forEach(ULRTakenMod,function(ULRMod,ULRModIndex){
                           if(ULRMod.ModuleCode === module){
                               ULRRequiredMc = ULRRequiredMc - 4;
                           } 
                        });
                        sessionStorage.setItem("ULRRequiredMc", ULRRequiredMc);
                        angular.forEach(UEModules,function(UEMod,UEModIndex){
                              if(UEMod.ModuleCode === module){
                                  UEModules.splice(UEModules.indexOf(UEMod),1);
                                  sessionStorage.setItem("UEModules",JSON.stringify(UEModules));
                              }
                        });
                   }
                }); 

                //calculating core progress barchart
                $scope.$applyAsync(function(){
                    $scope.currentULR = ((20 - (ULRRequiredMc)) / 20 * 100).toFixed(0);
                    $scope.currentCore = ((120 - (breathDepthRequiredMc + coreRequireMc + projectRequiredMc + internshipRequiredMc + mathSciRequiredMc)) / 120 * 100).toFixed(0);
                    if(UEModules.length >= 0){
                        $scope.currentUE = (UEModules.length / 5 * 100).toFixed(0);
                        //console.log($scope.currentUE);
                    } else{
                        $scope.currentUE = 0;
                    }
                    $scope.overallProgress = (parseInt($scope.currentULR) + parseInt($scope.currentCore) + parseInt($scope.currentUE)) / 3;
                    //console.log($scope.overallProgress);
                    
                    $scope.overallProgress = ($scope.overallProgress).toFixed(0) + "%";
                    $scope.currentULR = $scope.currentULR + "%";
                    $scope.currentCore = $scope.currentCore + "%";
                    if($scope.currentUE > 100){
                        $scope.currentUE = "100%";
                    } else{
                        $scope.currentUE = $scope.currentUE + "%";
                    }
                });
                       
            }           
        );  
        // console.log(precludedList);
        //return JSON.stringify(precludedList);
    }    
 
    $scope.modList = [];
    $scope.notPrecluded = true;
    $scope.prerequisiteNotFulfill = true;
   
    
//    $scope.filterCore = function(){
////        $scope.$applyAsync(function(){
////            $scope.currentCore = "10%";
////            console.log(JSON.stringify(sessionStorage));
////        });
////        console.log("tesT");
//        $scope.$applyAsync(function(){
//            $scope.currentCore = "10%";
//            console.log(JSON.parse(sessionStorage.getItem("coreModules")));
//            
//        });
//        
//        //$scope.currentCore = ((120 - (breathDepthRequiredMc + coreRequireMc + projectRequiredMc + internshipRequiredMc + mathSciRequiredMc)) / 120 * 100).toFixed(0);
//    }
       
    //filter search bar function
    $scope.filterULR = function(){
        $scope.modList = [];
        //$scope.toDisplayMessage = false;
        $scope.$applyAsync(function(){
            var date = new Date();
            var year = date.getFullYear();
            var month = parseInt(date.getMonth()) + 1;
            var sem = 1;
            if(month < 7){
                year = parseInt(year) - 1;
                sem = 2;
            }
            var acadYear = year + "/" + (parseInt(year) + 1);
            $scope.modList.length = 0;
            $scope.searchLoading = false;
            $timeout(function () {
                $scope.searchLoading = true;
            }, 3000);
            var ULRModulesArray = JSON.parse(sessionStorage.getItem("ULRModules"));
            var currentPreclusionList = JSON.parse(sessionStorage.getItem("preclusionList"));
            
            angular.forEach(ULRModulesArray,function(ULRMod,ULRModIndex){
                getModInfo(ULRMod,sem,acadYear).then(
                    function(ULRModInfo){
                        if(ULRModInfo.data != ""){
                            //console.log(coreModInfo);
                            //console.log(coreModInfo.data.Semester);
                            //If module found is not in preclusion list, add into search value
                            if(currentPreclusionList.indexOf(ULRModInfo.data.ModuleCode) == -1){
                                $scope.modList.push({
                                    ModuleCode : ULRModInfo.data.ModuleCode,
                                    ModuleTitle : ULRModInfo.data.ModuleTitle,
                                    ModuleCredit : ULRModInfo.data.ModuleCredit,
                                    ModuleSuStatus : ["No","Yes","Exempted","Waived"],
                                    ModuleGrade : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                    modFound : true,
                                    selectedModGrade : "-",
                                    selectedModSuStatus : "No",
                                    colorCode           : "#e6d8ff"
                                });
                            }
                        }
                    }
                );
            });
        });
    }
    
    $scope.filterCore = function(){
        $scope.modList = [];
        //$scope.toDisplayMessage = false;
//        $scope.$applyAsync(function(){
//            $scope.currentCore = "10%";
//            console.log(JSON.stringify(sessionStorage));
//        });
//        console.log("tesT");
        
        $scope.$applyAsync(function(){
            $scope.searchLoading = false;
            $timeout(function () {
                $scope.searchLoading = true;
            }, 3000);
            var date = new Date();
            var year = date.getFullYear();
            var month = parseInt(date.getMonth()) + 1;
            var sem = 1;
            if(month < 7){
                year = parseInt(year) - 1;
                sem = 2;
            }
            var acadYear = year + "/" + (parseInt(year) + 1);
            //reseting UI 
            $scope.modList.length = 0; 
            var currentPreclusionList = JSON.parse(sessionStorage.getItem("preclusionList"));
            var coreModulesArray = JSON.parse(sessionStorage.getItem("coreModules"));
            var breathDepthModulesArray = JSON.parse(sessionStorage.getItem("breathDepthModules"));
            //console.log(breathDepthModulesArray);
            var internshipRequiredMc = parseInt(sessionStorage.getItem("internshipRequiredMc"));
            if(internshipRequiredMc < 12){
                var internshipModulesArray = JSON.parse(sessionStorage.getItem("internshipModules"))[1];
            } else{
                var internshipModulesArray = JSON.parse(sessionStorage.getItem("internshipModules"))[1];
                internshipModulesArray.unshift(JSON.parse(sessionStorage.getItem("internshipModules"))[0][0]);
            }
            var mathSciModulesArray = JSON.parse(sessionStorage.getItem("mathSciModules"));
            var projectModulesArray = JSON.parse(sessionStorage.getItem("project8thMcModules"));
            //console.log(coreModulesArray);
            
            //populate leftover core modules
            angular.forEach(coreModulesArray,function(coreMod,coreModIndex){
                getModInfo(coreMod,sem,acadYear).then(
                    function(coreModInfo){
                        if(coreModInfo.data != ""){
                            //console.log(coreModInfo);
                            //console.log(coreModInfo.data.Semester);
                            if(currentPreclusionList.indexOf(coreModInfo.data.ModuleCode) == -1){
                                $scope.modList.push({
                                    ModuleCode : coreModInfo.data.ModuleCode,
                                    ModuleTitle : coreModInfo.data.ModuleTitle,
                                    ModuleCredit : coreModInfo.data.ModuleCredit,
                                    ModuleSuStatus : ["No","Yes","Exempted","Waived"],
                                    ModuleGrade : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                    modFound : true,
                                    selectedModGrade : "-",
                                    selectedModSuStatus : "No",
                                    colorCode : "#c5fbff"
                                    //Semesters: coreModInfo.data.Semester
                                });
                            }
                        }
                    }
                );
            });
            
            angular.forEach(mathSciModulesArray,function(mathSciMod,mathSciModIndex){
                getModInfo(mathSciMod,sem,acadYear).then(
                    function(mathSciModInfo){
                        if(mathSciModInfo.data != ""){
                            if(currentPreclusionList.indexOf(mathSciModInfo.data.ModuleCode) == -1){
                                $scope.modList.push({
                                    ModuleCode : mathSciModInfo.data.ModuleCode,
                                    ModuleTitle : mathSciModInfo.data.ModuleTitle,
                                    ModuleCredit : mathSciModInfo.data.ModuleCredit,
                                    ModuleSuStatus : ["No","Yes","Exempted","Waived"],
                                    ModuleGrade : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                    modFound : true,
                                    selectedModGrade : "-",
                                    selectedModSuStatus : "No",
                                    colorCode : "#c5ffc3"
                                });
                            }
                        }
                    }
                );
            });            
            
            angular.forEach(internshipModulesArray,function(internshipModule,internshipModuleIndex){
                getModInfo(internshipModule,sem,acadYear).then(
                    function(internshipModInfo){
                        if(internshipModInfo.data != ""){
                            if(currentPreclusionList.indexOf(internshipModInfo.data.ModuleCode) == -1){
                                $scope.modList.push({
                                    ModuleCode : internshipModInfo.data.ModuleCode,
                                    ModuleTitle : internshipModInfo.data.ModuleTitle,
                                    ModuleCredit : internshipModInfo.data.ModuleCredit,
                                    ModuleSuStatus : ["No","Yes","Exempted","Waived"],
                                    ModuleGrade : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                    modFound : true,
                                    selectedModGrade : "-",
                                    selectedModSuStatus : "No",
                                    colorCode : "#c5fbff"
                                });
                            }
                            //console.log($scope.modList);
                        }
                    }
                );
            });

            angular.forEach(breathDepthModulesArray,function(breathDepthModule,breathDepthModuleIndex){
                getModInfo(breathDepthModule,sem,acadYear).then(
                    function(breathDepthModInfo){
                        if(breathDepthModInfo.data != ""){
                            if(currentPreclusionList.indexOf(breathDepthModInfo.data.ModuleCode) == -1){
                                $scope.modList.push({
                                    ModuleCode : breathDepthModInfo.data.ModuleCode,
                                    ModuleTitle : breathDepthModInfo.data.ModuleTitle,
                                    ModuleCredit : breathDepthModInfo.data.ModuleCredit,
                                    ModuleSuStatus : ["No","Yes","Exempted","Waived"],
                                    ModuleGrade : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                    modFound : true,
                                    selectedModGrade : "-",
                                    selectedModSuStatus : "No",
                                    colorCode : "#c5fbff"
                                });
                            }
                            //console.log($scope.modList);
                        }
                    }
                );
            });            
    
            angular.forEach(projectModulesArray,function(projectModuleArr,projectModuleArrIndex){
                for(var i = 0; i < projectModuleArr.length; i ++){
                    getModInfo(projectModuleArr[i],sem,acadYear).then(
                        function(projectModInfo){
                            if(projectModInfo.data != ""){
                                if(currentPreclusionList.indexOf(projectModInfo.data.ModuleCode) == -1){
                                    $scope.modList.push({
                                        ModuleCode : projectModInfo.data.ModuleCode,
                                        ModuleTitle : projectModInfo.data.ModuleTitle,
                                        ModuleCredit : projectModInfo.data.ModuleCredit,
                                        ModuleSuStatus : ["No","Yes","Exempted","Waived"],
                                        ModuleGrade : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                        modFound : true,
                                        selectedModGrade : "-",
                                        selectedModSuStatus : "No",
                                        colorCode : "#c5fbff"
                                    });
                                }
                                //console.log($scope.modList);
                            }
                        }
                    );
                }

            }); 
            $scope.$applyAsync(function(){
                console.log($scope.modList);
                if($scope.modList.length == 0){
                    
                        $scope.displayMessage = "No other modules left!" ;
                        $scope.toDisplayMessage = false;
                    
                } else{
                    
                        $scope.displayMessage = "" ;
                        $scope.toDisplayMessage = true;
                 
                }  
            });

        });
        
        //$scope.currentCore = ((120 - (breathDepthRequiredMc + coreRequireMc + projectRequiredMc + internshipRequiredMc + mathSciRequiredMc)) / 120 * 100).toFixed(0);
    }
    //end of search bar function
    
    
    //Populate search bar modules
    getModList().then(
        function (responseModList) {
            sessionStorage.setItem("modsList", JSON.stringify(responseModList.data));
            var moduleList = JSON.parse(sessionStorage.getItem("modsList"));
//            angular.forEach(responseModList.data, function(value,key){
//                $scope.modList.push({
//                    ModuleCode      : moduleList[key].ModuleCode,
//                    ModuleTitle     : moduleList[key].ModuleTitle,
//                    Semesters       : moduleList[key].Semesters
//                });
//            });
            //$scope.modList = moduleList;
            $scope.tempModList = moduleList;    
    });
    //$scope.tempModList = $scope.modList;
    
    $scope.isUpdated = false;
    $scope.updateModList = function(currentText){
        //$scope.searchBox = $scope.searchBox.toUpperCase();
        //console.log($scope.searchBox);
        var oldText = sessionStorage.getItem("oldText");
        if(oldText == null){
            oldText = "";
        }
        $scope.searchLoading = false;    
        $timeout(function () {
            $scope.searchLoading = true;
        }, 2000);
        //$scope.tempModList = $scope.modList;
        //console.log($scope.updateModList);
        currentText = currentText.toUpperCase();
        console.log("current Text : " + currentText);

//                                                    ModuleCode      : userModsTaken[key].ModuleCode,
//                                                    ModuleTitle     : userModsTaken[key].ModuleTitle,
//                                                    ModuleCredit    : 4,
//                                                    ModuleStatus    : "Exempted",
//                                                    ModuleSuStatus  : ["Exempted"],
//                                                    selectedModSuStatus : null,
//                                                    selectedModGrade: null,
//                                                    ModuleGrade     : ["-"],
//                                                    AcadYear        : userModsTaken[key].AcadYear,
//                                                    Semester        : userModsTaken[key].Semester,
//                                                    type            : "UE",
//                                                    colorCode       : "#ffedc4"        
        //if search box is empty
        if(currentText.length < 1){
            //$scope.modList = $scope.tempModList;
            $scope.modList = [];
            $scope.isUpdated = true;
        //if user continue typing    
        } else if(oldText.length < currentText.length){
            //console.log("enter");
            var date = new Date();
            var year = date.getFullYear();
            var month = parseInt(date.getMonth()) + 1;
            var sem = 1;
            if(month < 7){
                year = parseInt(year) - 1;
                sem = 2;
            }
            var acadYear = year + "/" + (parseInt(year) + 1);
            $scope.modList = [];
            var currentPreclusionList = JSON.parse(sessionStorage.getItem("preclusionList"));
            //console.log(acadYear);
            //console.log(sem);
            angular.forEach($scope.tempModList,function(tempMod,key){
                
            
            //for(var key = 0 ; key < $scope.tempModList.length; key ++){    
                //console.log($scope.tempModList[key].ModuleCode.startsWith(currentText));
                if($scope.tempModList[key].ModuleCode.includes(currentText)){
                    //console.log($scope.tempModList[key]);
                    if(currentPreclusionList.indexOf($scope.tempModList[key].ModuleCode) == -1){
                        //CS1010J not included in preclusion list
                        if(currentPreclusionList.indexOf("CS1010") != -1 && $scope.tempModList[key].ModuleCode === "CS1010J"){
                            
                        }else{
                            //if($scope.tempModList[key].ModuleCode.startsWith("MA")){
                                //console.log("Math");
                            //}
                            
                            //Core Module : Blue
                            //console.log(responseModInfo.data.ModuleCode);
                            var colorCode = "";
                            if(($scope.tempModList[key].ModuleCode).startsWith("CS") || ($scope.tempModList[key].ModuleCode).startsWith("CP")){
                                //console.log("TEST");
                                var colorCode = "#c5fbff";
                            }
                            //Math & Sci Module : Green
                            else if(($scope.tempModList[key].ModuleCode).startsWith("MA") || ($scope.tempModList[key].ModuleCode).startsWith("LSM") || ($scope.tempModList[key].ModuleCode).startsWith("PC") || ($scope.tempModList[key].ModuleCode).startsWith("CM") || ($scope.tempModList[key].ModuleCode).startsWith("ST") ){
                                var colorCode = "#c5ffc3";
                            }
                            //IS Module : Red
                            else if(($scope.tempModList[key].ModuleCode).startsWith("IS")){
                                var colorCode = "#fbbaca";
                            }
                            //GEM Module : orange red
                            else if(($scope.tempModList[key].ModuleCode).startsWith("GE")){
                                var colorCode = "#e6d8ff";
                            }
                            //Unrestricted Elective Module : Yellow
                            else{
                                var colorCode = "#ffedc4";
                            }
                            $scope.modList.push({
                                ModuleCode      : $scope.tempModList[key].ModuleCode,
                                ModuleTitle     : $scope.tempModList[key].ModuleTitle,
                                Semesters       : $scope.tempModList[key].Semesters,
                                ModuleCredit    : 4,
                                ModuleStatus    : "Normal",
                                ModuleSuStatus  : ["No","Yes","Exempted","Waived"],
                                selectedModSuStatus : "No",
                                selectedModGrade: null,
                                ModuleGrade     : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                AcadYear        : acadYear,
                                Semester        : sem,
                                type            : "CORE",
                                colorCode       : colorCode
                            });  
                            //console.log($scope.tempModList[key].ModuleCode);
                            //var moduleSemester = $scope.tempModList[key].Semesters;
                            //var selectedModule = $scope.tempModList[key].ModuleCode;
                            //console.log(moduleSemester);
//                            getModInfo($scope.tempModList[key].ModuleCode, sem, acadYear). then(
//                                function(responseModInfo){
//                                    
//                                    if(responseModInfo.data != ""){
//                                        
//                                        $scope.$applyAsync(function(){
//                                           $scope.modList.push({
//                                                ModuleCode      : responseModInfo.data.ModuleCode,
//                                                ModuleTitle     : responseModInfo.data.ModuleTitle,
//                                                //Semesters       : moduleSemester,
//                                                ModuleCredit    : responseModInfo.data.ModuleCredit,
//                                                ModuleStatus    : "Normal",
//                                                ModuleSuStatus  : ["No","Yes","Exempted","Waived"],
//                                                selectedModSuStatus : "No",
//                                                selectedModGrade: null,
//                                                ModuleGrade     : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
//                                                AcadYear        : acadYear,
//                                                Semester        : sem,
//                                                type            : "CORE",
//                                                colorCode       : colorCode
//                                            });  
//                                        });
//                                            
//                                    }
//                                }
//                            );
                        }
                    }
                }
            });
        //if user ??    
        }else{
            console.log("Testing ...");
            var date = new Date();
            var year = date.getFullYear();
            var month = parseInt(date.getMonth()) + 1;
            var sem = 1;
            if(month < 7){
                year = parseInt(year) - 1;
                sem = 2;
            }
            var acadYear = year + "/" + (parseInt(year) + 1);
            if($scope.isUpdated == false){
                $scope.modList = [];
                for(var key = 0 ; key < $scope.tempModList.length; key ++){    
                    //console.log($scope.tempModList[key].ModuleCode.startsWith(currentText));
                    if($scope.tempModList[key].ModuleCode.includes(currentText)){
                        $scope.modList.push({
                            ModuleCode      : $scope.tempModList[key].ModuleCode,
                            ModuleTitle     : $scope.tempModList[key].ModuleTitle,
                            Semesters       : $scope.tempModList[key].Semesters
                        });   
                    }
                }
            }
            else{
                var tempArry = $scope.modList;
                $scope.modList = [];
                for(var key = 0 ; key < tempArry.length; key ++){    
                    //console.log($scope.modList[key].ModuleCode.startsWith(currentText));
                    if(tempArry[key].ModuleCode.includes(currentText)){
                        $scope.modList.push({
                            ModuleCode      : tempArry[key].ModuleCode,
                            ModuleTitle     : tempArry[key].ModuleTitle,
                            Semesters       : tempArry[key].Semesters
                        });   
                    }
                }
            }
            sessionStorage.setItem("oldText",currentText);
        }
        //console.log($scope.modList.length);
        //console.log(currentText.length);
        $scope.$applyAsync(function(){
            if($scope.modList.length == 0 && currentText.length < 1){
                $scope.$applyAsync(function(){
                   $scope.displayMessage = "Please search for a module!";
                   $scope.toDisplayMessage = false;
                });
            }
            else if($scope.modList.length == 0){
                $scope.$applyAsync(function(){
                    $scope.displayMessage = "Module is taken/precluded!" ;
                    $scope.toDisplayMessage = false;
                }); 
            } else{
                $scope.$applyAsync(function(){
                    $scope.displayMessage = "" ;
                    $scope.toDisplayMessage = true;
                }); 
            }            
        });

            //console.log($scope.tempModList);
            //console.log($scope.modList);
        //});
        
    }
    
   //start to populate barchart with modules Taken
//    $scope.barChartModTaken = JSON.parse(sessionStorage.getItem("modsTaken"));
//    getMajReq().then(
//        function(majReq){
//            //getting matric year to access json data
//            var mYear = "matric" + matricYear;
//            var result = (majReq.data[mYear]);
//            //debug
//            //console.log(result.Internship.length);
//            //end debug
//
//            //checking core requirement
//            //check against preclusion list
//            console.log(JSON.parse(sessionStorage.getItem("preclusionList")));
//
//        }
//    );    
    
    
	$scope.getProfile = function(){
        
        function getAllAcadYear(matricYear){
            matricYear = parseInt(matricYear);
            var modYear = parseInt(JSON.parse(sessionStorage.getItem("modsTaken"))[0].AcadYear.substring(0,4));
            var resultArr = [];
            var date = new Date();
            var year = date.getFullYear();
            var month = parseInt(date.getMonth()) + 1;
            //console.log(month);
            for(var i = matricYear; i <= modYear; i++){
                var nextYear = i + 1;
                if(i < modYear){
                    var result = i + "/" + nextYear + "-1";
                    resultArr.push(result);
                    result = i + "/" + nextYear + "-2";
                    resultArr.push(result);
                } else{
                    if(month < 7){
                        var result = i + "/" + nextYear + "-1";
                        resultArr.push(result);
                        result = i + "/" + nextYear + "-2";
                        resultArr.push(result);
                    } else{
                        var result = i + "/" + nextYear + "-1";
                        resultArr.push(result);
                    }
                }
            }
            
            var modSem = parseInt(JSON.parse(sessionStorage.getItem("modsTaken"))[0].Semester);
            if(modSem == 2){
                var lastResult = resultArr[resultArr.length - 1];
                var result = (JSON.parse(sessionStorage.getItem("modsTaken"))[0].AcadYear.substring(0,9));
                result = result + "-2";
                resultArr.push(result);
            }
            return resultArr;
        }
        
		getUserProfile().then(
			function (responseProfile) {
                console.log(responseProfile.data);
                $scope.username = responseProfile.data.Results[0].Name;
                getCoreModules();
                getProject8thMcModules();
                getInternshipModules();
                getMathSciModules();
                getBreathDepthModules();
                getULRModules();
                sessionStorage.setItem("userName", $scope.username);
                sessionStorage.setItem("netid", responseProfile.data.Results[0].UserID);
                sessionStorage.setItem("firstMajor", responseProfile.data.Results[0].FirstMajor);
                // if the person have double major/degree set as secondMajor
                // if single major --> secondMajor == ""
                sessionStorage.setItem("secondMajor", responseProfile.data.Results[0].SecondMajor);
                sessionStorage.setItem("matricYear", responseProfile.data.Results[0].MatriculationYear);
                
                $scope.plannerSize = [];
                $scope.unlockSem = [];
            
                //start of ruiwen code
                //default candidature: 3 years

                var year = 4;
                var matricYear = responseProfile.data.Results[0].MatriculationYear;

                for(var i=0;i<year;i++) {
                    $scope.plannerSize.push({ candidatureYear: (parseInt(matricYear)+i) + "/" + (parseInt(matricYear)+i+1)});
                }
                //add year
                $scope.addYear = function() {
                    year = year + 1;
                    if(year>6){return}
                    var newYear = { candidatureYear: (parseInt(matricYear)+year-1) + "/" + (parseInt(matricYear)+year)}
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
                        sessionStorage.setItem("UEModules",JSON.stringify(responseModTaken.data.Results));
                        sessionStorage.setItem("UERequiredMc",20);
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
                                            
                                            //Initialising overall progress bar
                                            var totalCreditTaken = parseInt(sessionStorage.getItem("totalCreditTaken"));
                                            $scope.$applyAsync(function(){
                                                //$scope.overallProgress = (totalCreditTaken / 160 * 100).toFixed(0) + "%";
                                            });
                                            
                                            //Found unrestricted elective
                                            //colorcode : yellow : #ffedc4
                                            if(responseModInfo.data === ""){
                                                totalCreditTaken = totalCreditTaken + 4;
                                                sessionStorage.setItem("totalCreditTaken",totalCreditTaken);
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
                                                    Semester        : userModsTaken[key].Semester,
                                                    type            : "UE",
                                                    colorCode       : "#ffedc4"
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
                                                    Semester        : userModsTaken[key].Semester,
                                                    type            : "UE",
                                                    colorCode       : "#ffedc4"
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
                                                        Semester        : userModsTaken[key].Semester,
                                                        type            : "UE",
                                                        colorCode       : "#ffedc4"
                                                    }
                                                ));
                                            } else{
                                                totalCreditTaken = totalCreditTaken + parseInt(responseModInfo.data.ModuleCredit);
                                                sessionStorage.setItem("totalCreditTaken",totalCreditTaken);
                                                generatePreclusionList(responseModInfo.data.ModuleCode, userModsTaken[key].Semester, userModsTaken[key].AcadYear);
                                                //console.log("Success : " + responseModInfo.data.ModuleCode);
                                                //console.log(responseModInfo.data.ModuleCode);
                                                
                                                //Core Module : Blue
                                                if((responseModInfo.data.ModuleCode).indexOf("CS") != -1 || (responseModInfo.data.ModuleCode).indexOf("CP") != -1){
                                                    //console.log("TEST");
                                                    var colorCode = "#c5fbff";
                                                }
                                                //Math & Sci Module : Green
                                                else if((responseModInfo.data.ModuleCode).indexOf("MA") != -1 || (responseModInfo.data.ModuleCode).indexOf("LSM") != -1 || (responseModInfo.data.ModuleCode).indexOf("PC") != -1 || (responseModInfo.data.ModuleCode).indexOf("CM") != -1 || (responseModInfo.data.ModuleCode).indexOf("ST") != -1 ){
                                                    var colorCode = "#c5ffc3";
                                                }
                                                //IS Module : Red
                                                else if((responseModInfo.data.ModuleCode).indexOf("IS") != -1){
                                                    var colorCode = "#fbbaca";
                                                }
                                                //GEM Module : orange red
                                                else if((responseModInfo.data.ModuleCode).indexOf("GE") != -1){
                                                    var colorCode = "#e6d8ff";
                                                }
                                                //Unrestricted Elective Module : Yellow
                                                else{
                                                    var colorCode = "#ffedc4";
                                                }
                                                currentSemMod.push({
                                                    ModuleCode      : responseModInfo.data.ModuleCode,
                                                    ModuleTitle     : responseModInfo.data.ModuleTitle,
                                                    ModuleCredit    : responseModInfo.data.ModuleCredit,
                                                    ModuleStatus    : "Normal",
                                                    ModuleSuStatus  : ["No","Yes","Exempted","Waived"],
                                                    selectedModSuStatus : "No",
                                                    selectedModGrade: null,
                                                    ModuleGrade     : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                                    AcadYear        : userModsTaken[key].AcadYear,
                                                    Semester        : userModsTaken[key].Semester,
                                                    type            : "CORE",
                                                    colorCode       : colorCode
                                                });
                                                
                                                
                                                $scope.takenMods.push({
                                                    ModuleCode      : responseModInfo.data.ModuleCode,
                                                    ModuleTitle     : responseModInfo.data.ModuleTitle,
                                                    ModuleCredit    : responseModInfo.data.ModuleCredit,
                                                    ModuleStatus    : "Normal",
                                                    ModuleSuStatus  : ["No","Yes","Exempted","Waived"],
                                                    selectedModSuStatus : "No",
                                                    selectedModGrade: null,
                                                    ModuleGrade     : ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"],
                                                    AcadYear        : userModsTaken[key].AcadYear,
                                                    Semester        : userModsTaken[key].Semester,
                                                    type            : "CORE",
                                                    colorCode       : colorCode
                                                });
                                                //console.log($scope.takenMods[count]);
                                                //count ++;
                                                sessionStorage.setItem(responseModInfo.data.ModuleCode,JSON.stringify(
                                                    {
                                                        ModuleTitle     : responseModInfo.data.ModuleTitle,
                                                        ModuleCredit    : responseModInfo.data.ModuleCredit,
                                                        ModuleStatus    : "Normal",
                                                        ModuleSuStatus  : "No",
                                                        selectedModSuStatus : "No",
                                                        selectedModGrade: null,
                                                        ModuleGrade     : "-",
                                                        AcadYear        : userModsTaken[key].AcadYear,
                                                        Semester        : userModsTaken[key].Semester,
                                                        type            : "CORE",
                                                        colorCode       : colorCode
                                                    }
                                                ));

                                            }
                                        }
                                    );
                                }
                                
                            });
                            $scope.modsPerSem.push(currentSemMod);
                            //console.log($scope.modsPerSem[0].length);
                            
                            /*for(var i = 0; i <12; i ++){
                                if($scope.preclusionList.includes($scope.modsPerSem[i].ModuleCode)){
                                $scope.notPrecluded == false;
                                }
                            }*/
                            
                            //$scope.plannedMods.{{$scope.takenMods}}.push({$scope.takenMods});
                            
                            /*if($scope.takenMods.AcadYear == "2015/2016")
                                $scope.plannedMods.1.push({$scope.takenMods});
                            else
                                $scope.plannedMods.2.push({$scope.takenMods});
                            
       
                            //console.log(sessionStorage.getItem("totalCreditTaken"));
                            //$scope.overallProgress = parseInt(sessionStorage.getItem("totalCreditTaken")) / 160 * 100;
                            //console.log("debug total");
                            //console.log($scope.overallProgress);
                            //$scope.overallProgress = $scope.overallProgress + "%";
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
                        
                        $scope.addSemester = function(){
                            //console.log("test");
                            var currentTotalSem = [];
                    //        $scope.showYear2Sem1 = !$scope.showYear2Sem1;
                            var currentTotalSemCount = JSON.parse(sessionStorage.getItem("userSem")).length;
                            currentTotalSem = JSON.parse(sessionStorage.getItem("userSem"));
                            //console.log(currentTotalSemCount);
                            if (currentTotalSemCount == 12)
                                return;
                            var previousAcadSem = JSON.parse(sessionStorage.getItem("userSem"))[currentTotalSemCount - 1];
                            //check previous sem
                            var previousSem = previousAcadSem.substring(10);
                            var frontYear = parseInt(previousAcadSem.substring(0,4));
                            var backYear = parseInt(previousAcadSem.substring(5,9));
                            var nextAcadSem = "";
                            var nextSem = 0;
                            if(previousSem == 1){
                                nextSem = 2;
                                nextAcadSem = frontYear + "/" + backYear + "-" + nextSem;
                            } else{
                                nextSem = 1;
                                nextAcadSem = backYear + "/" + (backYear + 1) + "-" + nextSem;
                            }
                            currentTotalSem.push(nextAcadSem);
                            sessionStorage.setItem("userSem", JSON.stringify(currentTotalSem));   

                            $scope.unlockSem[currentTotalSemCount] = true;
                            $scope.tempStorage = [];
                            var nextSem = (currentTotalSemCount + 1) % 2;
                            if(nextSem == 0){
                                nextSem = 2;
                            }
                            //Find out the current Total Sem count --> activate $scope.semmods --> so if want to add modules --> won't cause error
                            for(var i  = 0; i < 5; i ++){
                                $scope.tempStorage.push(
                                    {
                                        ModuleCode      : "",
                                        ModuleTitle     : "",
                                        ModuleCredit    : "",
                                        ModuleStatus    : "Normal",
                                        ModuleSuStatus  : ["-"],
                                        selectedModSuStatus : "-",
                                        selectedModGrade: "-",
                                        ModuleGrade     : ["-"],
                                        AcadYear        : nextAcadSem.substring(0,9),
                                        Semester        : nextSem,
                                        type            : null,
                                        colorCode       : "#ffedc4"
                                    }
                                );
                            }
                            $scope.modsPerSem.push($scope.tempStorage);

                            //console.log($scope.showYear2Sem1);
                        }
                        
                        console.log(userSem.length);
                        for(var semCounter = userSem.length; semCounter < 8; semCounter ++){
                            $scope.addSemester();
                        }
                        console.log(userSem.length);
                        
                        //remove 1 empty mod and the mod from search list (suppose to put in dashboard.html line 195)
                        $scope.removeMod = function($index) { 
                            angular.forEach($scope.modsPerSem, function(value,sem){
                                console.log("--");
                                    if($scope.modsPerSem[sem].ModuleTitle == ""){
                                        console.log("-");
                                        $scope.modsPerSem[sem].splice(0, 1);
                                        return;   
                                    }
                                });
                            $scope.modList.splice($index, 1);
                        }
                        
                        
//                        console.log(userSem.length);
//                        for(var semCounter = userSem.length; semCounter < 8; semCounter ++){
//                            var semArray = [];
//                            for(var modCounter = 0; modCounter < 5; modCounter ++){
//                                $scope.tempStorage.push(
//                                    {
//                                        ModuleCode      : "",
//                                        ModuleTitle     : "",
//                                        ModuleCredit    : "",
//                                        ModuleStatus    : "Normal",
//                                        ModuleSuStatus  : ["-"],
//                                        selectedModSuStatus : "-",
//                                        selectedModGrade: "-",
//                                        ModuleGrade     : ["-"],
//                                        AcadYear        : nextAcadSem.substring(0,9),
//                                        Semester        : nextSem
//                                    }
//                                );
//                            }
//                        }
//                        console.log($scope.modsPerSem);
                        
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
	
    $scope.getWidth = function() {
        return window.innerWidth;
    };
    
    //mouseover and mouseout, popup module details such as module type and module title
    $(".popup").mouseover(function() {
        $(this).children(".moduleDetails").show();
    }).mouseout(function() {
        $(this).children(".moduleDetails").hide();
    });
    
    //generate shorter URL
    $(document).ready(function(){
        var url;
        new Clipboard('.invite-link');

        $.ajax({
          url: "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyBsoXP_gCh3umRVKqP5MOHfEHs1fxK84g0",
          type: "POST",
          data: JSON.stringify({ longUrl: window.location.href }),  
          contentType: "application/json",
          dataType: "json",
          success: function(data){
            url = data['id'];
            $('.invite-link').attr('data-clipboard-text', url);
          }
        });

        $('.invite-link').click(function() {
            var textbox = $("#invite-link");
            textbox.attr('value', url);
        });
    });

    //mouseover event for sidebar
//    $(document).ready(function() {
//        // Tooltip only Text
//        $('.masterTooltip').hover(function(){
//                // Hover over code
//                var title = $(this).attr('title');
//                $(this).data('tipText', title).removeAttr('title');
//                $('<p class="tooltip"></p>')
//                .text(title)
//                .appendTo('body')
//                .fadeIn('slow');
//        }, function() {
//                // Hover out code
//                $(this).attr('title', $(this).data('tipText'));
//                $('.tooltip').remove();
//        }).mousemove(function(e) {
//                var mousex = e.pageX + 20; //Get X coordinates
//                var mousey = e.pageY + 10; //Get Y coordinates
//                $('.tooltip')
//                .css({ top: mousey, left: mousex })
//        });
//    });

    
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