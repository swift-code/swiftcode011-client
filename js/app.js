var app = angular.module('swiftCodeApp', ['ngRoute', 'ngCookies']);
var URL = "http://betsol.org:9000/";

//------------------------------------------
//     ROUTING
//------------------------------------------
app.config(function($routeProvider) {
   $routeProvider
    .when('/', {                        /*switch MVC usage */
        redirectTo: '/login'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
    })
    .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'signupCtrl'
    })
    .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
//signup controller
app.controller('signupCtrl',['$scope','$location','$http',function($scope,$location,$http){
  this.signupData={}; /* initialize a empty JSON*/
  $scope.signup=function() {
    var request=$http({
      method: "POST",
      url: URL + "signup",
      data: this.signupData
    });
    request.success(function(data){                              /* capturing response*/
      var response=angular.fromJson(data);                       /* converts Json to array*/
      console.log(response);                                     /* DEBUGGING AT CLIENT SIDE*/
    });
    request.error(function(data){                                 /* data here is response that is thrown*/
      console.log(data);
    });
  }
}]);

app.controller('loginCtrl', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies) {

}]);

app.controller('dashboardCtrl', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies) {

}]);
