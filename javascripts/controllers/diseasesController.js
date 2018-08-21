angular.module('myApp').controller('diseasesController', ['$scope',function($scope) {

  /*  alert("fine");*/
	
    
    $scope.tagData = [
          {text: "Lorem", weight: 15, link: "https://google.com"}, //if your tag has a link.
          {text: "Ipsum", weight: 9},
          {text: "Dolor", weight: 6},
          {text: "Sit", weight: 7},
          {text: "Amet", weight: 5}
          // ...as many words as you want
      ];
   
}]);