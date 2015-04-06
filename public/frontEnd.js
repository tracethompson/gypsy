angular.module('gypsy', [
  'gypsy.services',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '../views/body.jade',
      controller: 'GypsyController'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .otherwise({
      redirectTo: '/home'
    })
})