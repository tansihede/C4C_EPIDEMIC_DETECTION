angular.module('myApp').controller('symptomController', ['$scope', '$http', function ($scope, $http) {

	 
    $scope.getSymptoms = function () {

        $http.get('/api/getSymptoms').success(function (data) {
            $scope.result = data.result;
            console.log(JSON.stringify(data));

        }).error(function (data) {            
            console.log('Error: ' + data);
        });
    }; 

    $scope.getSymptoms();

}]);
