angular.module('myApp').controller('hospitalDashboardController', ['$scope', '$http', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {

    $scope.loaded = true;

    $scope.getpatientDetails = function () {

        $http.get('/api/getPatients').success(function (data) {
            $scope.result = data.result;
            console.log(JSON.stringify(data.result[0]));

            var dataResults = [];
            for (var i = 0 in $scope.result) {
                dataResults.push({
                    Name: $scope.result[i].patient_name,
                    Occupation: $scope.result[i].patient_occ,
                    Village_Town: $scope.result[i].City,
                    Age: $scope.result[i].patient_age,
                    Date_Reported: $scope.result[i].date_updated,
                    Key_Symptoms: $scope.result[i].Symptoms_reported
                });
            }
            var sample = dataResults[0],
                dtColumns = []

            //create columns based on first row in dataset
            for (var key in sample) dtColumns.push(
                DTColumnBuilder.newColumn(key).withTitle(key)
            )


            $scope.dtColumns = dtColumns //headers

            //create options
            $scope.dtOptions = DTOptionsBuilder.newOptions()
                .withOption('data', dataResults)
                .withPaginationType('full_numbers')
                .withDisplayLength('5')
                .withOption('lengthMenu', [5, 10, 15])

            //initialize the dataTable
            angular.element('#example').attr('datatable', '')
            $compile(angular.element('#example'))($scope)

            $scope.loaded = false;

        }).error(function (data) {
            console.log('Error: ' + data);
        });
    };

    $scope.queryBlockchain = function () {
        $http({
            method: "GET",
            url: "http://10.53.18.86:4000/channels/mychannel/chaincodes/mycc?peer=peer0.org1.example.com&fcn=query&args=%5B%27%27%2C%27%27%5D",
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Mzc1Njc2ODYsInVzZXJuYW1lIjoiSmltMSIsIm9yZ05hbWUiOiJPcmcxIiwiaWF0IjoxNTM3NTMxNjg2fQ.XrscjHVFpV-nZdCvLnP5YF0IRm3eXOtz31X_mtxqlvA',
                'content-type': 'application/json'
            }
        }).success(function (response) {
            console.log(response);
        }).error(function (error) {
            console.log(error);
        });
    };

    $scope.getpatientDetails();
    $scope.queryBlockchain();

}]);




