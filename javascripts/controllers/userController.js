
angular.module('myApp').controller('userController', ['$scope','$http','$window','$rootScope','$location',function($scope,$http,$window,$rootScope,$location) {
	//require('angular-tag-cloud')
  $scope.login = function(){
    console.log("login page data is called")
      
  var params = {
    'username':$scope.username,
    'password':$scope.password
  };
 
$http.post('/login',params).success(function(data) {
  $rootScope.isLoggedinHospital = true;
  $window.localStorage.setItem("isLoggedinHospital", false);  
//  alert(data);
  
  $window.localStorage.setItem('userlabel', data.username );      

      
  var userlabel = $window.localStorage.getItem('userlabel'); 
  $rootScope.userlabel = userlabel;
      
  $window.localStorage.setItem("isLoggedinHospital", true);  
  if($scope.username=="hospital"){
      $location.path('/hospital');
  }

  if($scope.username=="dashboard"){
      $location.path('/dashboard');
  }
  

  

}).error(function(data) {
  alert('Invalid Username or Password')
      console.log('Error: ' + data);
  });
    };

}]);








