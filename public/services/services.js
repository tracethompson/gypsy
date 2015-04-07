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

  var addTweets = function(data){
    console.log("entered addTweets");
    var info = {info : "hello my name is trace I am 21 I am not sad I am happy kind of I live in SF I skateboard I study at makersquare."}
    
    return $http({
      method: 'POST',
      url: "/watsonPost",
      data: JSON.stringify(info)
    })
    .success(function(resp) {
      console.log(resp);
    })
    .catch(function(err) {
      console.log(err);
    })
  };

  return {
    getTweets: getTweets,
    addTweets: addTweets
  };

})




