

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
    .controller('CapCalCtrl', ['$scope', '$cookieStore', '$http', '$location', '$window', CapCalCtrl]);



function CapCalCtrl($scope, $cookieStore, $http, $location, $window) {
    var totalGradedMC = 0;
    var totalGradePoint = 0;
    
    //function to generate preclusion list
    function generatePreclusionList(moduleCode, moduleSemester, moduleAcadYear){
        getModInfo(moduleCode, moduleSemester, moduleAcadYear).then(
            function(response){
                //console.log(response.data.Preclusion);
                if(response.data !== ""){
                    var precludedMods = [];
                    if(response.data.Preclusion !== undefined){
                        $scope.preclusionList.push(moduleCode);
                        precludedMods = response.data.Preclusion.split(",");
                        angular.forEach(precludedMods, function(selected,index){
                            //$scope.preclusionList.push(precludedMods[index].trim());
                            //console.log($scope.preclusionList);
                            if(precludedMods[index].trim().indexOf("or") == -1 && precludedMods[index].trim().indexOf("OR") == -1 && precludedMods[index].trim().indexOf("and") == -1 && precludedMods[index].trim().indexOf("/") == -1){
                                if(precludedMods[index].trim().length < 9){
                                    $scope.preclusionList.push(precludedMods[index].trim());
                                }
                            //    console.log($scope.preclusionList);
                            } else if(precludedMods[index].trim().indexOf(" or ") != -1){
                                //further split the result
                                var tempArray = [];
                                tempArray = precludedMods[index].trim().split(" or ");
                                angular.forEach(tempArray, function(furtherSelected, i){
                                   if(tempArray[i].indexOf(" OR ") == -1){
                                       if(tempArray[i].trim().length < 9){
                                           $scope.preclusionList.push(tempArray[i].trim()); 
                                       }
                                   }else{
                                       var tempArray2 = [];
                                       tempArray2 = tempArray[i].trim().split(" OR ");
                                       angular.forEach(tempArray2, function(selected2, i2){
                                           if(tempArray2[i2].trim().length < 9){
                                               $scope.preclusionList.push(tempArray2[i2].trim());
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
                                    }
                                   
                                });
                            } else if(precludedMods[index].trim().indexOf(" and ") != -1){
                                var tempArray = [];
                                tempArray = precludedMods[index].trim().split(" and ");
                                angular.forEach(tempArray, function(furtherSelected, i){
                                   //if(tempArray[i].indexOf(" OR ") == -1){
                                    if(tempArray[i].trim().length < 9){
                                       $scope.preclusionList.push(tempArray[i].trim()); 
                                    }
                                   
                                });
                            } else if(precludedMods[index].trim().indexOf("/") != -1){
                                var tempArray = [];
                                tempArray = precludedMods[index].trim().split("/");
                                angular.forEach(tempArray, function(furtherSelected, i){
                                   //if(tempArray[i].indexOf(" OR ") == -1){
                                    if(tempArray[i].trim().length < 9){
                                       $scope.preclusionList.push(tempArray[i].trim()); 
                                    }
                                   
                                });
                            }
                            
                        });
                    }                    
                }
                //console.log($scope.preclusionList);
                sessionStorage.setItem("preclusionList",JSON.stringify($scope.preclusionList)); 
            }
            
        );        
    }
    
    //console.log($scope.showYear1Sem1);
    //console.log(JSON.parse(sessionStorage.getItem("modsTaken")));
    $scope.preclusionList = [];
    var modulesTaken = JSON.parse(sessionStorage.getItem("modsTaken"));
    angular.forEach(modulesTaken, function(value,key){
        generatePreclusionList((modulesTaken[key].ModuleCode).toUpperCase(), modulesTaken[key].Semester, modulesTaken[key].AcadYear);
//        getModInfo((modulesTaken[key].ModuleCode).toUpperCase(), modulesTaken[key].Semester, modulesTaken[key].AcadYear).then(
//            function(response){
//                //console.log(response.data.Preclusion);
//                if(response.data !== ""){
//                    var precludedMods = [];
//                    if(response.data.Preclusion !== undefined){
//                        $scope.preclusionList.push(modulesTaken[key].ModuleCode.toUpperCase());
//                        precludedMods = response.data.Preclusion.split(",");
//                        angular.forEach(precludedMods, function(selected,index){
//                            //$scope.preclusionList.push(precludedMods[index].trim());
//                            //console.log($scope.preclusionList);
//                            if(precludedMods[index].trim().indexOf("or") == -1 && precludedMods[index].trim().indexOf("OR") == -1 && precludedMods[index].trim().indexOf("and") == -1 && precludedMods[index].trim().indexOf("/") == -1){
//                                if(precludedMods[index].trim().length < 9){
//                                    $scope.preclusionList.push(precludedMods[index].trim());
//                                }
//                            //    console.log($scope.preclusionList);
//                            } else if(precludedMods[index].trim().indexOf(" or ") != -1){
//                                //further split the result
//                                var tempArray = [];
//                                tempArray = precludedMods[index].trim().split(" or ");
//                                angular.forEach(tempArray, function(furtherSelected, i){
//                                   if(tempArray[i].indexOf(" OR ") == -1){
//                                       if(tempArray[i].trim().length < 9){
//                                           $scope.preclusionList.push(tempArray[i].trim()); 
//                                       }
//                                   }else{
//                                       var tempArray2 = [];
//                                       tempArray2 = tempArray[i].trim().split(" OR ");
//                                       angular.forEach(tempArray2, function(selected2, i2){
//                                           if(tempArray2[i2].trim().length < 9){
//                                               $scope.preclusionList.push(tempArray2[i2].trim());
//                                           }
//                                       });
//                                   }
//                                   
//                                });
//                            } else if(precludedMods[index].trim().indexOf(" OR ") != -1){
//                                //further split the result
//                                var tempArray = [];
//                                tempArray = precludedMods[index].trim().split(" OR ");
//                                angular.forEach(tempArray, function(furtherSelected, i){
//                                   //if(tempArray[i].indexOf(" OR ") == -1){
//                                    if(tempArray[i].trim().length < 9){
//                                       $scope.preclusionList.push(tempArray[i].trim()); 
//                                    }
//                                   
//                                });
//                            } else if(precludedMods[index].trim().indexOf(" and ") != -1){
//                                var tempArray = [];
//                                tempArray = precludedMods[index].trim().split(" and ");
//                                angular.forEach(tempArray, function(furtherSelected, i){
//                                   //if(tempArray[i].indexOf(" OR ") == -1){
//                                    if(tempArray[i].trim().length < 9){
//                                       $scope.preclusionList.push(tempArray[i].trim()); 
//                                    }
//                                   
//                                });
//                            } else if(precludedMods[index].trim().indexOf("/") != -1){
//                                var tempArray = [];
//                                tempArray = precludedMods[index].trim().split("/");
//                                angular.forEach(tempArray, function(furtherSelected, i){
//                                   //if(tempArray[i].indexOf(" OR ") == -1){
//                                    if(tempArray[i].trim().length < 9){
//                                       $scope.preclusionList.push(tempArray[i].trim()); 
//                                    }
//                                   
//                                });
//                            }
//                            
//                        });
//                    }                    
//                }
//                //console.log($scope.preclusionList);
//                sessionStorage.setItem("preclusionList",JSON.stringify($scope.preclusionList)); 
//            }
//            
//        );
           
    });

    
    $scope.addSemester = function(){
        //console.log("test");
        var currentTotalSem = [];
//        $scope.showYear2Sem1 = !$scope.showYear2Sem1;
        var currentTotalSemCount = JSON.parse(sessionStorage.getItem("userSem")).length;
        currentTotalSem = JSON.parse(sessionStorage.getItem("userSem"));
        //console.log(currentTotalSem);
        
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
                    Semester        : nextSem
                }
            );
        }
        $scope.modsPerSem.push($scope.tempStorage);
        
        //console.log($scope.showYear2Sem1);
    }
    
    $scope.addModule = function(){
        $scope.modsPerSem[0].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[0]).substring(0,9),
            Semester        : 1 
        });
    }
    
    $scope.addModule1 = function(){
        $scope.modsPerSem[1].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[1]).substring(0,9),
            Semester        : 1 
        });
    }
    
    
    //year 2 sem 1
    $scope.addModule2 = function(){
        $scope.modsPerSem[2].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[2]).substring(0,9),
            Semester        : 1 
        });
    }
    
    //year 2 sem 2
    $scope.addModule3 = function(){
        $scope.modsPerSem[3].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[3]).substring(0,9),
            Semester        : 1 
        });
    }
    
    //year 3 sem 1
    $scope.addModule4 = function(){
        $scope.modsPerSem[4].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[4]).substring(0,9),
            Semester        : 1 
        });
    }
    
    //year 3 sem 2
    $scope.addModule5 = function(){
        $scope.modsPerSem[5].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[5]).substring(0,9),
            Semester        : 1 
        });
    }
    
    //year 4 sem 1
    $scope.addModule6 = function(){
        $scope.modsPerSem[6].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[6]).substring(0,9),
            Semester        : 1 
        });
    }
    
    //year 4 sem 2
    $scope.addModule7 = function(){
        $scope.modsPerSem[7].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[7]).substring(0,9),
            Semester        : 1 
        });
    }
    
    //year 5 sem 1
    $scope.addModule8 = function(){
        $scope.modsPerSem[8].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[8]).substring(0,9),
            Semester        : 1 
        });
    }
    
    $scope.addModule9 = function(){
        $scope.modsPerSem[9].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[9]).substring(0,9),
            Semester        : 1 
        });
    }    

    $scope.addModule10 = function(){
        $scope.modsPerSem[10].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[10]).substring(0,9),
            Semester        : 1 
        });
    }  
    
    $scope.addModule11 = function(){
        $scope.modsPerSem[11].push({
            ModuleCode      : "",
            ModuleTitle     : "",
            ModuleCredit    : "",
            ModuleStatus    : "Normal",
            ModuleSuStatus  : ["-"],
            selectedModSuStatus : null,
            selectedModGrade: null,
            ModuleGrade     : ["-"],
            AcadYear        : (JSON.parse(sessionStorage.getItem("userSem"))[11]).substring(0,9),
            Semester        : 1 
        });
    }    
     
    
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
    // do something
        //console.log("page loaded");
        $scope.capResult = "0.00";
        //$scope.showYear1Sem1 = $scope.showYear1Sem1;
        //console.log(sessionStorage.getItem("totalGradedPoint"));
        //console.log(sessionStorage.getItem("totalGradedMC"));
        if(isNaN(parseInt(sessionStorage.getItem("totalGradedMC"))) || isNaN(parseInt(sessionStorage.getItem("totalGradedPoint")))){
            totalGradedMC = 0;
            totalGradePoint = 0;
        }else {
            totalGradedMC = parseInt(sessionStorage.getItem("totalGradedMC"));   
            totalGradePoint = parseInt(sessionStorage.getItem("totalGradedPoint"));
            $scope.capResult = (totalGradePoint / totalGradedMC).toFixed(2);
            if(isNaN($scope.capResult)){
                $scope.capResult = "0.00";   
            }
        }
    });
    
    function getModInfo(modCode, modSem, modAcadYear){
        return $http({
            method : 'GET',
            url    : 'index.php?id=checkMod&modCode=' + modCode + '&sem=' + modSem + '&acadYear=' + modAcadYear           
        });            
    }
     
    
    $scope.searchMod = function(selectedModule, selectedOldModule){
        var updatedList = JSON.parse(sessionStorage.getItem("preclusionList"));
        getModInfo((selectedModule.ModuleCode).toUpperCase(), selectedModule.Semester, selectedModule.AcadYear).then(
            function(responseModInfo){
                
                //if found modules from nusmod api
                if(responseModInfo.data !== ""){
                    var isPrecluded = false;
                    angular.forEach(updatedList,function(value,key){
                       if(selectedModule.ModuleCode === $scope.preclusionList[key]){
                           isPrecluded = true;
                           //console.log("found");
                           return "";   
                       }
                    });
                    
                    if(isPrecluded == false){
                        $scope.preclusionList.push(responseModInfo.data.ModuleCode);
                        generatePreclusionList((selectedModule.ModuleCode).toUpperCase(), selectedModule.Semester, selectedModule.AcadYear);
                        sessionStorage.setItem("preclusionList",JSON.stringify($scope.preclusionList));
                        
                        selectedModule.ModuleTitle = responseModInfo.data.ModuleTitle;
                        selectedModule.ModuleCredit = responseModInfo.data.ModuleCredit;
                        selectedModule.ModuleSuStatus = ["No","Yes","Exempted","Waived"];
                        selectedModule.ModuleGrade = ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"];
                        selectedModule.modFound = true;
                        selectedModule.selectedModGrade = "-";
                        selectedModule.selectedModSuStatus = "-";
                    } else{
                        selectedModule.ModuleTitle = "Modules Taken/Precluded";
                        selectedModule.ModuleCredit = "-";
                        selectedModule.ModuleSuStatus = ["-"];
                        selectedModule.ModuleGrade = ["-"];
                        selectedModule.modFound = false;
                        selectedModule.selectedModGrade = "-";
                        selectedModule.selectedModSuStatus = "-";
                    }
                    // debug print out found modules
                    console.log(responseModInfo);
                
                //if cant found from modules from nusmod api
                }else{
                    
                    selectedModule.ModuleSuStatus = ["-"];
                    selectedModule.ModuleGrade = ["-"];
                    selectedModule.selectedModGrade = null;
                    selectedModule.selectedModSuStatus = null;
                    if(selectedModule.ModuleCode.length >= 6){
                        selectedModule.ModuleTitle = "Module Not Available";
                    }else{
                        if(selectedOldModule.ModuleCredit !== "" && (selectedOldModule.selectedModGrade !== null && selectedOldModule.selectedModGrade !== "-")){
                            
                            //module was deleted 
                            if(selectedOldModule.modFound === true && selectedOldModule.selectedModSuStatus === "No"){
                                //console.log("do calculation");
                                totalGradedMC = totalGradedMC - parseInt(selectedOldModule.ModuleCredit);
                                totalGradePoint = totalGradePoint - (convertGradeLetter(selectedOldModule.selectedModGrade) * selectedOldModule.ModuleCredit);
                                selectedModule.modFound = false;
                                
                                $scope.capResult = (totalGradePoint / totalGradedMC).toFixed(2);
                                if(isNaN($scope.capResult)){
                                    $scope.capResult = "0.00";
                                }    

                                if(isNaN(totalGradedMC) || isNaN(totalGradePoint)){
                                    totalGradedMC = 0;
                                    totalGradePoint = 0;
                                }
                            }
                            
                            //to remove modules from preclusion list
                            
                        }
                        selectedModule.ModuleTitle = "";
                    }
                    selectedModule.ModuleCredit = "";
                    selectedModule.selectedModGrade = "-";
                    selectedModule.selectedModSuStatus = "-";
                }
            }
        );
    }
    //$scope.capResult = 0;
    //$scope.showSem1 = false;
    
    $scope.changeValue = function(currentMod , oldModValue){
        
        
        
        if(currentMod.selectedModSuStatus === "Exempted" || currentMod.selectedModSuStatus === "Waived" || currentMod.selectedModSuStatus === "Yes"){
            //console.log(currentMod.ModuleGrade);
            currentMod.selectedModGrade = "-";
            currentMod.ModuleGrade = ["-"];
            //currentMod.ModuleGrade.unshift("-");
            //currentMod.ModuleGrade = JSON.parse(currentMod.ModuleGrade)[0];
            //Trying to implemet auto "-" when exempted and waived selected
        } else{
            currentMod.ModuleGrade = ["A+","A","A-","B+","B","B-","C+","C","D+","D","F"];
        }
        
        sessionStorage.setItem(currentMod.ModuleCode, JSON.stringify(
            {
                ModuleTitle     : currentMod.ModuleTitle,
                ModuleCredit    : currentMod.ModuleCredit,
                ModuleStatus    : currentMod.ModuleStatus,
                ModuleSuStatus  : currentMod.ModuleSuStatus,
                selectedModSuStatus : currentMod.selectedModSuStatus,
                selectedModGrade: currentMod.selectedModGrade,
                ModuleGrade     : currentMod.selectedModGrade,
                AcadYear        : currentMod.AcadYear,
                Semester        : currentMod.Semester
            }
        ));
        
        $scope.$applyAsync(function(){
            //deduct the old calculated grade point and grade mc when value changed

            if(oldModValue.selectedModSuStatus === "No" && (oldModValue.selectedModGrade !== null && oldModValue.selectedModGrade !== "-")){

                if(oldModValue.selectedModGrade !== undefined){
                    totalGradedMC = totalGradedMC - parseInt(oldModValue.ModuleCredit);
                    totalGradePoint = totalGradePoint - (convertGradeLetter(oldModValue.selectedModGrade) * oldModValue.ModuleCredit);
                }
            }
            
            
            if(currentMod.selectedModSuStatus === "No" && (currentMod.selectedModGrade !== null && currentMod.selectedModGrade !== "-") && convertGradeLetter(currentMod.selectedModGrade) !== 0){

                totalGradedMC = totalGradedMC + parseInt(currentMod.ModuleCredit);
                totalGradePoint = totalGradePoint + (convertGradeLetter(currentMod.selectedModGrade) * currentMod.ModuleCredit);
            }
            
            $scope.capResult = (totalGradePoint / totalGradedMC).toFixed(2);
            if(isNaN($scope.capResult)){
                $scope.capResult = "0.00";
            }    
            
            if(isNaN(totalGradedMC) || isNaN(totalGradePoint)){
                totalGradedMC = 0;
                totalGradePoint = 0;
            }
        
            console.log("Total graded Mc : " + totalGradedMC);
            console.log("Total Graded point : " + totalGradePoint);
            sessionStorage.setItem("totalGradedMC",totalGradedMC);
            sessionStorage.setItem("totalGradedPoint",totalGradePoint);
        });
        
        
        
    }
    
    function convertGradeLetter(grade){
        if(grade === "A+" || grade === "A"){
            return 5.0;
        } else if (grade === "A-"){
            return 4.5;
        } else if (grade === "B+"){
            return 4.0;
        } else if (grade === "B"){
            return 3.5;
        } else if (grade === "B-"){
            return 3.0;
        } else if (grade === "C+"){
            return 2.5;
        } else if (grade === "C"){
            return 2.0;
        } else if (grade === "D+"){
            return 1.5;
        } else if (grade === "D"){
            return 1.0;
        } else {
            return 0;
        }
    }
    
    //$scope.capResult = 2;
    
//    angular.forEach($scope.takenMods, function(value,key){
//        $scope.modules = {
//            selectedModSuStatus : $scope.takenMods[key].ModuleSuStatus[0],
//            selectedModGrade    : $scope.takenMods[key].ModuleGrade[0]
//        };
//    });

}    



