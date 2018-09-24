angular.module('myApp').controller('hospitalDashboardController', ['$scope', '$http', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder','$window', function ($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder,$window) {

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
        var token = $window.localStorage.getItem('token');
        $http({
            method: "GET",
            url: "http://10.53.18.86:4000/channels/mychannel/chaincodes/mycc?peer=peer0.org1.example.com&fcn=query&args=%5B%27%27%2C%27%27%5D",
            headers: {
                'Authorization': 'Bearer '+token,
                'content-type': 'application/json'
            }
        }).success(function (response) {
            console.log(response);
        }).error(function (error) {
            console.log(error);
        });
    };
     
    $scope.invokeBlockchain = function (data,callback) {
        var token = $window.localStorage.getItem('token');
        
        $http({
            method: "POST",
            url: "http://10.53.18.86:4000/channels/mychannel/chaincodes/mycc",
            headers: {
                'Authorization': 'Bearer '+ token,
                'content-type': 'application/json'
            },
            data:JSON.stringify(data)
        }).success(function (response) {
            callback(response,null);
        }).error(function (error) {
            callback(null,error);
        });
    };



    $scope.getpatientDetails();
    $scope.queryBlockchain();


    $scope.showMessagePopup = function(number,ngo){
        document.getElementById("ph-Number").value = number;
        document.getElementById("associatedWith").value = ngo;

    }
    $scope.sendMessage = function(){
        var isRequest = document.getElementById("requestSupply").checked;
        var requestMessage = document.getElementById("requestMessage").value;
        var ngoName =document.getElementById("associatedWith").value
        var number = document.getElementById("ph-Number").value;
        var requestId = "Req"+Date.now();
        alert(isRequest);
        if(isRequest){
            var args = [requestId,"AIMS",requestMessage,number];
            var peers =["peer0.org1.example.com"];
            data={
                "peers": peers,
                "fcn":"hospitalInvoke",
                "args":args
            }
            $scope.invokeBlockchain(data,function callback(data,error){
                alert("Making 2nd req");
                var args = [requestId,ngoName];
                var peers =["peer0.org1.example.com"];
                data={
                    "peers": peers,
                    "fcn":"ngoInvoke",
                    "args":args
                }
                $scope.invokeBlockchain(data);
            });
        }
	}

    $scope.getVolunteerDetails = function () {

        $http.get('/api/getVolunteers').success(function (data) {
		    debugger;
            $scope.volunteers = data.result;
            console.log("Volunteer");
            console.log(JSON.stringify(data));
            $scope.loaded = false ; 
        }).error(function (data) {            
            console.log('Error: ' + data);
        });
    };
	$scope.getVolunteerDetails();
}]);




