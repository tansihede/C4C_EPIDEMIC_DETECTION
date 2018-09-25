angular.module('myApp').controller('logoutController', ['$scope','$http','$window','$rootScope','$location','$route',function($scope,$http,$window,$rootScope,$location,$route) {
        
  $scope.logout = function(){
	   
	  $http.get('/logout').success(function(data) {
	    $location.path('/');
	   }).error(function(data) {
	     // alert('Invalid Username or Password')
	        console.log('Error: ' + data);
	    });
	  }
	    
	    
	    $scope.logout();

}]);