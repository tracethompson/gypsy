angular.module('gypsy.services', [])

.factory('Tweets', function ($http) {

  var twitter = {}

  
  var getTweets = function(handle){
    var params = {handle: handle}
    return $http({
      method: 'GET',
      url: '/api/tweets',
      params: params
    })
  };


  var tweetsFormat = function(tweets){
    var formattedTweets = [];

    _.each(tweets, function(tweet, index){

      formattedTweets[index] = {
        id: tweet.id_str,
        userid: tweet.user.id_str,
        sourceid: "twitter",
        contenttype: "text/html",
        language: 'en',
        content: tweet.text
      }
    })
    return formattedTweets;
  }


  var addTweets = function(tweets){
  
    return $http({
      method: 'POST',
      data: {
        contentItems: tweets
      },
      url: "/api/watson",
      dataType: 'json',
    })
    .success(function(resp) {
      return resp
    })
    .catch(function(err) {
      console.log(err);
    })
  };

  return {
    getTweets: getTweets,
    addTweets: addTweets,
    tweetsFormat: tweetsFormat
  };

})




