
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
            templateUrl: 'views/login/signin.html',
            controller: 'userController'
        }).when('/dashboard', {
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'dashboardController'
        }).when('/hospital', {
            templateUrl: 'views/hospital/hospitalDashboard.html',
            controller: 'hospitalDashboardController'
        }).when('/patientDetails', {
            templateUrl: 'views/hospital/patientDetails.html',
            controller: 'userController'                    // correct controller to be changed
        }).when('/symptomAnalysis', {
            templateUrl: 'views/hospital/symptomAnalysis.html',
            controller: 'userController'                    // correct controller to be changed
        }).
    otherwise({redirectTo:'/'})

    
$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
}); 
  
});


myAppModule.run(function($rootScope, $location){
  $rootScope.$on('routeChangeSuccess', function(event, next, current){
    if ($location.path() == '/login') {
      $rootscope.isLoggedinHospital =  false;
    };
  });
});