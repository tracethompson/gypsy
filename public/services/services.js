angular.module('gypsy.services', [])

.factory('Tweets', function ($http) {
  // Your code here
  var getTweets = function(){
    console.log("entered services getTweets");
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(function(resp) { 
      return resp.data//?????
    })
  }

  var addLink = function(url){
    return $http({
      method: 'POST',
      url: '/api/links',
      data: url
    })
    .success(function(resp) {
      console.log(resp);
      console.log("response url: ",resp.url)
      console.log("base url: ",resp.base_url);
    })
    .catch(function(err) {
      console.log(err);
    })
  };

  return {
    getTweets: getTweets
  };

})
