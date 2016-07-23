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
    $scope.dashboardLoading = false;
    $scope.searchLoading = true;
    //if(sessionStorage.dashboardLoading != true){
    $timeout(function () {
      $scope.dashboardLoading = true;
          
    }, 6000);

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
                    }
                    //found 6MC Internship options
                    else if(internshipModules[1].indexOf(module) != -1){
                        internshipModules[1].splice(internshipModules[1].indexOf(module),1);
                        sessionStorage.setItem("internshipModules",JSON.stringify(internshipModules));
                        internshipRequiredMc = internshipRequiredMc - 6;
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
//                    if(mathSciRequiredMc <= 0){
//                        mathSciRequiredMc = 0;
//                        sessionStorage.setItem("mathSciRequiredMc", mathSciRequiredMc);
//                    }
                
                var breathDepthModules = JSON.parse(sessionStorage.getItem("breathDepthModules"));
                var breathDepthRequiredMc = parseInt(sessionStorage.getItem("breathDepthRequiredMc"));
                //var mathTakenMod = JSON.parse(sessionStorage.getItem("modsTaken"));
                angular.forEach($scope.preclusionList, function(module,moduleIndex){
                   //var selectedModule = $scope.preclusionList[];
                    if(breathDepthModules.indexOf(module) != -1){
                        breathDepthModules.splice(breathDepthModules.indexOf(module), 1);
                        sessionStorage.setItem("breathDepthModules",JSON.stringify(breathDepthModules));
//                        angular.forEach(mathTakenMod,function(mathMod,mathModIndex){
//                           if(mathMod.ModuleCode === module){
//                               mathSciRequiredMc = mathSciRequiredMc - 4;
//                           } 
//                        });
                        breathDepthRequiredMc = breathDepthRequiredMc - 4;
                        sessionStorage.setItem("breathDepthRequiredMc", breathDepthRequiredMc);
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
                   }
                }); 
                    
                //console.log(ULRModules);
                //console.log(ULRRequiredMc); 
                

                
                //calculating core progress barchart
                $scope.$applyAsync(function(){
                    $scope.currentULR = ((20 - (ULRRequiredMc)) / 20 * 100).toFixed(0) + "%";
                    $scope.currentCore = ((120 - (breathDepthRequiredMc + coreRequireMc + projectRequiredMc + internshipRequiredMc + mathSciRequiredMc)) / 120 * 100).toFixed(0) + "%";
                });
                
                //debuging type:core
                //console.log("result :");
                //console.log(coreModules);
                    
                
                //console.log(coreModules);
                //console.log(coreRequireMc);
                //console.log(JSON.parse(sessionStorage.getItem("coreModules")));
                //var matricYear = sessionStorage.getItem("matricYear");
                //start to populate barchart with modules Taken & preclusion list
                //$scope.barChartModTaken = JSON.parse(sessionStorage.getItem("modsTaken"));
                //console.log("barChartModules");
                //console.log($scope.barChartModTaken);
//                getMajReq().then(
//                    function(majReq){
//                        //getting matric year to access json data
//                        var mYear = "matric" + matricYear;
//                        var result = (majReq.data[mYear]);
//                        var preclusionList = JSON.parse(sessionStorage.getItem("preclusionList"));
//                        //debug
//                        //console.log(result.length);
//                        //console.log(result[0].totalModules.length);
//                        //end debug
//                        var coreModules = result[0].totalModules[0].mods;
//                        //console.log(coreModules);
//                        console.log($scope.preclusionList);
//                        console.log($scope.preclusionList.length);
//                        for(var i = 0; i < $scope.preclusionList.length; i ++){
//                            //console.log("current Module : ");
//                            //console.log(preclusionList[i]);
//                            if(coreModules.indexOf(preclusionList[i]) != -1){
//                                coreModules.splice(coreModules.indexOf(preclusionList[i],1));
//                                console.log(coreModules);
//                            }
//                        }

//                    }
//                );
                //end of populate barchart                         
            }
            
           
        );  
        // console.log(precludedList);
        //return JSON.stringify(precludedList);
    }    
 
    $scope.modList = [];
    $scope.plannedMods = {
        selected: null,
        years: {"2015/2016": [], "2016/2017": []}
    };
    $scope.notPrecluded = true;
    $scope.prerequisiteNotFulfill = true;
    /*need to push takenMods into plannedMods into a nested array similar to the $scope.lists below
    $scope.lists = [
        {
            label: "Men",
            allowedTypes: ['man'],
            max: 4,
            people: [
                {name: "Bob", type: "man"},
                {name: "Charlie", type: "man"},
                {name: "Dave", type: "man"}
            ]
        },
        {
            label: "Women",
            allowedTypes: ['woman'],
            max: 4,
            people: [
                {name: "Alice", type: "woman"},
                {name: "Eve", type: "woman"},
                {name: "Peggy", type: "woman"}
            ]
        },
        {
            label: "People",
            allowedTypes: ['man', 'woman'],
            max: 6,
            people: [
                {name: "Frank", type: "man"},
                {name: "Mallory", type: "woman"},
                {name: "Alex", type: "unknown"},
                {name: "Oscar", type: "man"},
                {name: "Wendy", type: "woman"}
            ]
        }
    ];*/
    
    //Populate search bar modules
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
        //console.log("previous Text : " + previousText);
        //$scope.modList = [];
        //angular.forEach($scope.tempModList, function(value,key){
        if(currentText.length < 1){
            $scope.modList = $scope.tempModList;
            $scope.isUpdated = true;
        } else if(oldText.length < currentText.length){
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
        }else{
            if($scope.isUpdate == false){
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
            //console.log(resultArr);
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
                                                $scope.overallProgress = (totalCreditTaken / 160 * 100).toFixed(0) + "%";
                                            });
                                            
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
                                                totalCreditTaken = totalCreditTaken + parseInt(responseModInfo.data.ModuleCredit);
                                                sessionStorage.setItem("totalCreditTaken",totalCreditTaken);
                                                generatePreclusionList(responseModInfo.data.ModuleCode, userModsTaken[key].Semester, userModsTaken[key].AcadYear);
                                                //console.log("Success : " + responseModInfo.data.ModuleCode);
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
                                                    Semester        : userModsTaken[key].Semester
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
                                                        selectedModSuStatus : "No",
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