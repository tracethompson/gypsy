angular.module('gypsy.twitter', [])

.controller('GypsyController', function ($scope, $location, Tweets) {
  // Your code here
  $scope.handle = {};

  $scope.getTweets = function () {
    console.log("entered add Tweets in controller");
    $scope.loading = true;
    Tweets.addLink($scope.handle.name)
      .then(function () {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.addTweets = function(){
    Tweets.addTweets();
  }
});
