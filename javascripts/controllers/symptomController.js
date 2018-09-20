angular.module('myApp').controller('symptomController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

	
//	$scope.loaded = true;
	$scope.success_true = false;
    $scope.result = {};
    
	$scope.getSymptoms = function () {

		
		var patientdata = { 
				       'patientName' : $scope.inputName ,
				       'patientAge':  $scope.inputAge ,
				       'patientOccupation' : $scope.inputOccupation,
				       'patientSymptoms' : $scope.inputSymptoms,
				       'patientCountry' : $scope.inputCountry,
				       'patientState' : $scope.inputState,
				       'patientZip' : $scope.inputZip 
				       };
		
		  $http({
	            method : "GET",
	            url : "/api/getSymptoms",
	            params: patientdata
	          }).then(function mySuccess(data) {
	        	  $scope.result = data.data.result;
	        	  $scope.success_true = true;
	        	  console.log(data);
	            }, function myError(data) {
	            	 console.log('Error: ' + JSON.stringify(data));
	          }); 
		  
    };


}]);
