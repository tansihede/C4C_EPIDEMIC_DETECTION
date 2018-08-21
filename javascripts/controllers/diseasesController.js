angular.module('myApp').controller('diseasesController', ['$scope',function($scope) {

  /*  alert("fine");*/
	
    
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