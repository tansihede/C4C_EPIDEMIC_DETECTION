angular.module('myApp').controller('userController', ['$scope', '$http', '$window', '$rootScope', '$location', '$routeParams', '$timeout', function ($scope, $http, $window, $rootScope, $location, $routeParams, $timeout) {

  $scope.loggedinUserType = $routeParams.name;
  $scope.loaded = true;
  $timeout(function () {
    $scope.loaded = false;
  }, 1000);

  $scope.login = function (type) {
    console.log("login page data is called")

    var params = {
      'username': $scope.username,
      'password': $scope.password
    };




    $http.post('/login', params).success(function (data) {

      $window.localStorage.setItem('userlabel', data.username);

      var userlabel = $window.localStorage.getItem('userlabel');
      $rootScope.userlabel = userlabel;

      $window.localStorage.setItem("isLoggedinHospital", true);

      if (type== "Org1") {

        $http({
          method: "POST",
          url: "http://10.53.18.86:4000/loginUsers",
          withCredentials : false , 
          headers: {
            'content-type': 'application/json'
          },
          data: {
            "username": $scope.username,
            "orgName": "Org1",
            "secret": $scope.password
          }
        }).success(function (response) {
          $window.localStorage.setItem('token', response.token);
          $location.path('/hospital/dashboard');
        }).error(function (error) {
          console.log(error);
          alert(error);
        });
        
          
        
      }

      if (type== "Org2") {
        $http({
          method: "POST",
          withCredentials : false , 
          url: "http://10.53.18.86:4000/loginUsers",
          headers: {
            'content-type': 'application/json'
          },
          data: {
            "username": $scope.username,
            "orgName": "Org2",
            "secret": $scope.password
          }
        }).success(function (response) {
          $window.localStorage.setItem('token', response.token);
          $location.path('/ngo/dashboard');
        }).error(function (error) {
          console.log(error);
          alert(error);
        });
      }


    }).error(function (data) {
      alert('Invalid Username or Password')
      console.log('Error: ' + data);
    });
  };

  $scope.loginToBlockchain = function (username, password, type) {
    $http({
      method: "POST",
      url: "http://10.53.18.86:4000/loginUsers",
      withCredentials : false , 
      headers: {
        'content-type': 'application/json'
      },
      data: {
        "username": username,
        "orgName": type,
        "secret": password
      }
    }).success(function (response) {
      return response;
    }).error(function (error) {
      console.log(error);
      alert(error);
    });
  };



  $scope.registerToBlockchain = function (entity, type) {
    $http({
      method: "POST",
      url: "http://10.53.18.86:4000/users",
      withCredentials : false , 
      headers: {
        'content-type': 'application/json'
      },
      data: {
        "username": entity.userName,
        "orgName": type,
        "secret": entity.password
      }
    }).success(function (response) {
      console.log(response);
      $.ajax({
        url: "http://" + $(location).attr('host') + "/api/addHospital",
        type: 'POST',
        data: JSON.stringify(entity),
        contentType: 'application/json',
        success: function (data) {
          console.log("Data saved to Db");

        },
        error: function (err, exception) {
          alert("errror")
        },
      });
    }).error(function (error) {
      console.log(error);
    });
  };



  $scope.registerHospital = function () {
    var newHospital = {};
    newHospital.name = $("#inputName").val();
    newHospital.phno = $("#inputPhno").val();
    newHospital.specialization = $("#inputSpecilization").val();
    newHospital.country = $("#inputCountry").val();
    newHospital.state = $("#inputState").val();
    newHospital.zip = $("#inputZip").val();
    newHospital.userName = $("#inputUserName").val();
    newHospital.password = $("#inputPassword").val();
    //newVaolunteer.zip=$("#confirmPassword").val();
    $scope.registerToBlockchain(newHospital, "Org1")

  };

  $scope.registerNGO = function () {
    var newHospital = {};
    newHospital.name = $("#inputName").val();
    newHospital.phno = $("#inputPhno").val();
    newHospital.specialization = $("#inputSpecilization").val();
    newHospital.country = $("#inputCountry").val();
    newHospital.state = $("#inputState").val();
    newHospital.zip = $("#inputZip").val();
    newHospital.userName = $("#inputUserName").val();
    newHospital.password = $("#inputPassword").val();
    //newVaolunteer.zip=$("#confirmPassword").val();

    $scope.registerToBlockchain(newHospital, "Org2")
  };


}]);