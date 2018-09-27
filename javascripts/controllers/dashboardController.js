

angular.module('myApp').controller('dashboardController', ['$scope','$window','$http',function($scope,$window,$http) {

  /*  alert("fine");*/
    $scope.userlabel = "John";
    $scope.requests=[];
    $scope.approveFlag = true;

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
         $scope.requests =response.responce.reverse();
         console.log(response);
      }).error(function (error) {
          console.log(error);
      });
  };
  $scope.queryBlockchain();

    /** Function to Approve supply chain **/
 	$scope.approveRequest = function(requestId) {
        var token = $window.localStorage.getItem('token');
        var args = [requestId];
        var peers =["peer0.org1.example.com"];
        var data={
            "peers": peers,
            "fcn":"volunteerInvoke",
            "args":args
        }

        $http({
            method: "POST",
            withCredentials : false , 
            url: "http://10.53.18.86:4000/channels/mychannel/chaincodes/mycc",
            headers: {
                'Authorization': 'Bearer '+ token,
                'content-type': 'application/json'
            },
            data:JSON.stringify(data)
        }).success(function (response) {
           $scope.queryBlockchain();
            console.log("Approved")
        }).error(function (error) {
             console.log("Approve Failed")
        });
	 
 	}  // Approve supply chain

    $scope.supplyChainPopup = function(hospitalSuccess, ngoSuccess, volunteerSuccess, assetRequested){
        
        if(hospitalSuccess){
             document.getElementById("hospitalSuccess").setAttribute("class", "li complete");
        }
        if(ngoSuccess){
            document.getElementById("ngoSuccess").setAttribute("class", "li complete");
        }
        if(volunteerSuccess){
             document.getElementById("volunteerSuccess").setAttribute("class", "li complete");
        }
        if(assetRequested){
            document.getElementById("assetRequested").setAttribute("class", "li complete");
        }
    }






}]);


