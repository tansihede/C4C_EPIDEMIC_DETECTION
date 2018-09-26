

angular.module('myApp').controller('dashboardController', ['$scope','$window','$http',function($scope,$window,$http) {

  /*  alert("fine");*/
    $scope.userlabel = "John";
    $scope.requests=[];
    $scope.queryBlockchain = function () {
      var token = $window.localStorage.getItem('token');
      $http({
          method: "GET",
          url: "http://10.53.18.86:4000/channels/mychannel/chaincodes/mycc?peer=peer0.org2.example.com&fcn=query&args=%5B%27%27%2C%27%27%5D",
          withCredentials : false , 
          headers: {
              'Authorization': 'Bearer '+token,
              'content-type': 'application/json'
          }
      }).success(function (response) {
         $scope.requests =response.responce;
         console.log(response);
      }).error(function (error) {
          console.log(error);
      });
  };
  $scope.queryBlockchain();
   
}]);


