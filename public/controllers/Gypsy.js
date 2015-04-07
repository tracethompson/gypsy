angular.module('gypsy.twitter', [])

.controller('GypsyController', function ($scope, $location, Tweets) {
  // Your code here
  $scope.handle = {};

  /**
   * Returns a 'flattened' version of the traits tree, to display it as a list
   * @return array of {id:string, title:boolean, value:string} objects
   */
  function flatten( /*object*/ tree) {
    var arr = [],
      f = function(t, level) {
        if (!t) return;
        if (level > 0 && (!t.children || level !== 2)) {
          arr.push({
            'id': t.name,
            'title': t.children ? true : false,
            'value': (typeof (t.percentage) !== 'undefined') ? Math.floor(t.percentage * 100) + '%' : '',
            'sampling_error': (typeof (t.sampling_error) !== 'undefined') ? Math.floor(t.sampling_error * 100) + '%' : ''
          });
        }
        if (t.children && t.id !== 'sbh') {
          for (var i = 0; i < t.children.length; i++) {
            f(t.children[i], level + 1);
          }
        }
      };
    f(tree, 0);
    return arr;
  }


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
    Tweets.addTweets()
      .then(function (profile) {
        console.log("profile: ",flatten(profile.data.tree))
        $scope.profile = flatten(profile.data.tree);
      })
  }
});
