angular.module('myApp').controller('diseasesController', ['$scope', '$http', function ($scope, $http) {

    $scope.loaded = true ; 
	$scope.getpatientDetails = function () {

        $http.get('/api/getPatients').success(function (data) {
            $scope.result = data.result;
            console.log(JSON.stringify(data));
            $scope.loaded = false ; 
        }).error(function (data) {            
            console.log('Error: ' + data);
        });
    }; 
    $scope.userlabel = "John";
    $scope.getpatientDetails();
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
	
	
	$scope.sendMessage = function(number){
		document.getElementById("ph-Number").value = number;

	}
    $scope.tagData = [
          {text: "weakness", weight: 15, link: "https://google.com"}, //if your tag has a link.
          {text: "abdominal pain", weight: 9},
          {text: "Dozy", weight: 6},
          {text: "constipation", weight: 7},
          {text: "headaches", weight: 5},
		  {text: "fever", weight: 5},
          {text: "muscle pain", weight: 2},
		  // ...as many words as you want
      ];
   
}]);