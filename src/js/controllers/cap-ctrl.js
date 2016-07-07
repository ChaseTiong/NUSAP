

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
    
    
    var totalGradedMC = 0;
    var totalGradePoint = 0;
    //$scope.capResult = 0;
    //$scope.showSem1 = false;
    
    $scope.changeValue = function(currentMod , oldModValue){
        
        if(currentMod.selectedModSuStatus === "Exempted" || currentMod.selectedModSuStatus === "Waived" || currentMod.selectedModSuStatus === "Yes"){
            //console.log(currentMod.ModuleGrade);
            currentMod.selectedModGrade = "-";
            currentMod.ModuleGrade = "-";
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
            if(oldModValue.selectedModSuStatus === "No" && oldModValue.selectedModGrade !== null){
                totalGradedMC = totalGradedMC - parseInt(oldModValue.ModuleCredit);
                totalGradePoint = totalGradePoint - (convertGradeLetter(oldModValue.selectedModGrade) * oldModValue.ModuleCredit);
            }
            
            if(currentMod.selectedModSuStatus === "No" && currentMod.selectedModGrade !== null){
                totalGradedMC = totalGradedMC + parseInt(currentMod.ModuleCredit);
                totalGradePoint = totalGradePoint + (convertGradeLetter(currentMod.selectedModGrade) * currentMod.ModuleCredit);
            }
            
            $scope.capResult = (totalGradePoint / totalGradedMC).toFixed(2);
            if(isNaN($scope.capResult)){
                $scope.capResult = "0.00";
            }    
            
        
            //console.log(currentMod);
            //console.log(oldModValue);
            //console.log("Total graded Mc : " + totalGradedMC);
            //console.log("Total Graded point : " + totalGradePoint);
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



