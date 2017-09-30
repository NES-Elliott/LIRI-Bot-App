var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var twitter = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
var spotify = new Spotify({
	id: keys.spotifyKeys.client_id,
	secret: keys.spotifyKeys.client_secret
});

function myTweets() { // This will show your last 20 tweets and when they were created at in your terminal/bash window.
	var params = {screen_name: "NES_Elliott"};
	twitter.get("statuses/user_timeline", params, function(err, tweets, response) {
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

function spotifySong() { // This will display the information of the song that user inputs, Artist, Song Name, Preview Link, Album. If no song is provided then your program defaults to "The Sign" by Ace of Base
	var songName = process.argv.slice(3).join(" ");
	if (songName === "") {
		songName = "The Sign";
	}

	spotify.search({
		type: 'track',
		query: songName
	}).then(function(data) {
		console.log("\nSong Name: " + data.tracks.items[0].name);
		console.log("\nArtist: " + data.tracks.items[0].artists[0].name);
		console.log("\nAlbum: " + data.tracks.items[0].album.name);
		console.log("\nPreview Link: " + data.tracks.href);
	}).catch(function(err) {
		return console.log('Error occurred: ' + err);
	})
};

function movie() {};
function directions() {};

var arg = process.argv[2];
switch (arg) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifySong();
	break;

	case "movie-this":
	withdraw();
	break;

	case "do-what-it-says":
	lotto();
	break;
}