angular.module('gypsy', [
  'gypsy.services',
  'gypsy.twitter',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'views/gypsy.html',
      controller: 'GypsyController'
    })
    .when('/', {
      redirectTo: '/home'
    })
    .otherwise({
      redirectTo: '/home'
    })
})