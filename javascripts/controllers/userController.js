
angular.module('myApp').controller('userController', ['$scope','$http','$window','$rootScope','$location','$routeParams','$timeout',function($scope,$http,$window,$rootScope,$location,$routeParams,$timeout) {

  $scope.loggedinUserType = $routeParams.name;
  $scope.loaded=true;
  $timeout(function() {$scope.loaded=false; }, 1000); 
    
  $scope.login = function(){
    console.log("login page data is called")
      
  var params = {
    'username':$scope.username,
    'password':$scope.password
  };
 
$http.post('/login',params).success(function(data) {
   
  $window.localStorage.setItem('userlabel', data.username );      
      
  var userlabel = $window.localStorage.getItem('userlabel'); 
  $rootScope.userlabel = userlabel;
      
  $window.localStorage.setItem("isLoggedinHospital", true);  
  
  if($scope.loggedinUserType=="hospital"){
	  $location.path('/hospital/dashboard');
  }

  if($scope.loggedinUserType=="ngo"){
      $location.path('/ngo/dashboard');
  }
  

}).error(function(data) {
  alert('Invalid Username or Password')
      console.log('Error: ' + data);
  });
    };

    
    

    
}]);




