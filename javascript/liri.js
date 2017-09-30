var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var keys = require("./keys.js");
var client = new twitter({
	consumer_key: keys.consumer_key,
	consumer_secret: keys.consumer_secret,
	access_token_key: keys.access_token_key,
	access_token_secret: keys.access_token_secret
});

function myTweets() { // This will show your last 20 tweets and when they were created at in your terminal/bash window.
	var params = {screen_name: "NES_Elliott"};
	client.get("statuses/user_timeline", params, function(err, tweets, response) {
		if (err) {
			return console.log(err);
		} else {
			console.log("\n");

			var searchUpTo = 20;
			if (tweets.length < searchUpTo) {
				searchUpTo = tweets.length;
			}

			for (var i = 0; i < searchUpTo; i++) {
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
				console.log("--------------------");
			}
		}
	})
};

function spotifySong() {
	console.log("Hello World");
}

var arg = process.argv[2];
switch (arg) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifySong();
	break;

	// case "movie-this":
	// withdraw();
	// break;

	// case "do-what-it-says":
	// lotto();
	// break;
}