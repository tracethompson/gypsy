var express = require('express'), // used for logging incoming request
bodyParser  = require('body-parser'),
watson = require('watson-developer-cloud-alpha'),
bluemix = require('./config/bluemix'),
extend = require('util')._extend,
Twitter = require('twitter'),
Q       = require('q')


// setup middleware
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views


// render index page
app.get('/', function(req, res){
	res.render('index');
});


// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.


// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);
// Start server
app.listen(port, host);
console.log('App started on port ' + port);


/* ---- 
      

    SEND SHIT TO WATSON HERE

*/

var credentials = extend({
    version: 'v2',
    url: "https://gateway.watsonplatform.net/personality-insights/api",
    username: 'e9ac95ba-7cc2-4afb-9ce1-352a4ef0d872',
    password: "e9fTbIKcNWCd"
}, bluemix.getServiceCreds('personality_insights')); // VCAP_SERVICES
var personalityInsights = new watson.personality_insights(credentials);


app.post('/api/watson', function(req, res){

   personalityInsights.profile(req.body, function(err, profile) {
    if (err) {
      if (err.message){
        console.log(err.message);
        err = { error: err.message };
      }
      return res.status(err.code || 500).json(err || 'Error processing the request');
    }
    else
      return res.json(profile);
  });
});



/*------           


GET TWEETS HERE 


*/
var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});


app.get('/api/tweets', function(req, res){
  var twitterHandle = req.query.handle;
  console.log("handle: ", twitterHandle);
 
  var params = {screen_name: twitterHandle, count: 100, trim_user: 1};
  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response){
    if (!error) {
      console.log("tweets recieved");
      return res.json(tweets);
    } else {
      throw error;
    }
  });


/* DONE GETTING TWEETS */


})
