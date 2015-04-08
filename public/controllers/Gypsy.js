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
    Tweets.getTweets($scope.handle.name)
      .then(function (tweets) {
        var formattedTweets = Tweets.tweetsFormat(tweets.data)
        $scope.addTweets(formattedTweets);
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  $scope.addTweets = function(formattedTweets){
    Tweets.addTweets(formattedTweets)
      .then(function (profile) {
        $scope.profile = flatten(profile.data.tree);
        profileFormatter($scope.profile)
      })
  }

  var profileFormatter = function(profile) {
    $scope.bigfive = [];
    $scope.needs = [];
    $scope.values = [];
    console.log("profile: ", profile);
    for(var i = 1; i < 36; i ++){
      $scope.bigfive.push(profile[i])
    }
    for(var i = 37; i < 49; i++){
      $scope.needs.push(profile[i])
    }
    for(var i = 50; i < profile.length; i++){
      $scope.values.push(profile[i])
    } 

    console.log("bigfive: ", $scope.bigfive)
    console.log("needs: ", $scope.needs)
    console.log("values: ", $scope.values)
  }

});
