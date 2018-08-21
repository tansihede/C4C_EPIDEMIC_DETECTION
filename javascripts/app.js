
var myAppModule = angular.module('myApp', ['ngRoute','ngTagCloud']);

myAppModule.config(function($routeProvider,$locationProvider) {  
    $routeProvider

        .when('/email', {
            templateUrl: 'views/email.html',
            controller: 'dashboardController'        // correct controller to be changed
        }).when('/login', {
            templateUrl: 'views/login/signin.html',
            controller: 'userController'
        }).when('/outbreak', {
            templateUrl: 'views/diseases/outbreak.html',
            controller: 'diseasesController'
        }).when('/', {                                        
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'dashboardController'
        }).when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'dashboardController'
        }).
    otherwise({redirectTo:'/'})

$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
}); 
  

});