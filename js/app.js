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
  this.signupData={};                                           /* initialize a empty JSON*/
  $scope.signup=function() {
    var request=$http({
      method: "POST",
      url: URL + "signup",
      data: this.signupData
    });
    request.success(function(data){                              /* capturing response*/
      var response=angular.fromJson(data);                        /* converts Json to array*/
      if(!response["error"]){
        sessionStorage.userId=response["id"];
        sessionStorage.email=response["email"];
        sessionStorage.password=response["password"];
        $location.path('/dashboard');
      } else {
        $scope.responseMessage = response["message"][0];
      }
      console.log(response);                                     /* DEBUGGING AT CLIENT SIDE*/
    });
    request.error(function(data){                                 /* data here is response that is thrown*/
      console.log(data);
    });
  }
}]);

app.controller('loginCtrl', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies) {
   var request = null;
   var now = new Date(),
   expDate = new Date(now.getFullYear(), now.getMonth()+6, now.getDate());
   if($cookies.get('email')) {
       this.loginData.email = $cookies.get('email');
       $scope.rememberMe = true;
   }
   $scope.login = function() {
       var request = $http({
           method: "POST",
           url: URL + "login",
           crossDomain: true,
           headers: {
               "content-type": "application/json"
           },
           data: this.loginData
       });
       request.success(function(data) {
           var response = angular.fromJson(data);
           if($scope.rememberMe) {
               $cookies.put('email', this.loginData.email,{
                 expires: expDate
               });
           } else {
               $scope.rememberMe = false;
               $cookies.remove("email");
           }
           if(!response["error"]) {
               sessionStorage.email = response["email"];
               sessionStorage.password = response["password"];
               sessionStorage.userId = response["id"];
               $location.url('/dashboard');
           } else {
               $scope.responseMessage = response["message"][0];
           }

       });
       request.error(function(data) {
           console.log(data);
       });
   }
}]);

app.controller('dashboardCtrl', ['$scope', '$location', '$http', '$cookies', function($scope, $location, $http, $cookies) {

}]);
