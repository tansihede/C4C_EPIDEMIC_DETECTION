angular.module('myApp').controller('hospitalDashboardController', ['$scope', '$http', function ($scope, $http) {

	 
    $scope.getpatientDetails = function () {

        $http.get('/api/getPatients').success(function (data) {
            $scope.result = data.result;
            console.log(JSON.stringify(data));

        }).error(function (data) {            
            console.log('Error: ' + data);
        });
    }; 

    $scope.getpatientDetails();
    
	$scope.sendMessage = function(number){
		document.getElementById("ph-Number").value = number;

	}

}]);
