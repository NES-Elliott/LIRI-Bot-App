var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
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
	});
};

function spotifySong(songName) { // This will display the information of the song that user inputs, Artist, Song Name, Preview Link, Album. If no song is provided then your program defaults to "The Sign" by Ace of Base
	songName = songName || process.argv.slice(3).join(" ");
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
		console.log("\nPreview Link: " + data.tracks.items[0].preview_url);
		console.log("\n-----------------------");

		fs.appendFile("../log.txt",
			"\nSong Name: " + data.tracks.items[0].name +
			"\nArtist: " + data.tracks.items[0].artists[0].name +
			"\nAlbum: " + data.tracks.items[0].album.name +
			"\nPreview Link: " + data.tracks.items[0].preview_url +
			"\n-----------------------",
		function(err) {
			if (err) {
				return console.log(err);
			}
		})
	}).catch(function(err) {
		return console.log('Error occurred: ' + err);
	});
};

function movie(movieName) { // This will display the information of the movie that user inputs, Title, Year, IMDB Rating, Rotten Tomatoes Rating, Country of production, Language, Plot, Actors.
	movieName = movieName || process.argv.slice(3).join(" ");
	if (movieName === "") {
		movieName = "Mr. Nobody";
	}

	request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieName, function (err, response, body) {
		if (!err && response.statusCode === 200) {
			console.log("\nMovie Title: " + JSON.parse(body).Title);
			console.log("\nReleased: " + JSON.parse(body).Released);
			console.log("\n IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
			console.log("\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("\n Country Produced In: " + JSON.parse(body).Country);
			console.log("\n Language(s): " + JSON.parse(body).Language);
			console.log("\n Plot: " + JSON.parse(body).Plot);
			console.log("\n Actors: " + JSON.parse(body).Actors);
			console.log("\n-----------------------");
		} else {
			return console.log(err);
		}

		fs.appendFile("../log.txt",
			"\nMovie Title: " + JSON.parse(body).Title +
			"\nReleased: " + JSON.parse(body).Released +
			"\n IMDB Rating: " + JSON.parse(body).Ratings[0].Value +
			"\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
			"\n Country Produced In: " + JSON.parse(body).Country +
			"\n Language(s): " + JSON.parse(body).Language +
			"\n Plot: " + JSON.parse(body).Plot +
			"\n Actors: " + JSON.parse(body).Actors +
			"\n-----------------------",
		function(err) {
			if (err) {
				return console.log(err);
			}
		})
	});
};

function directions() { // This will read commands from a text document and executes functions based on it
	fs.readFile("../commands.txt", "utf8", function(err, data) {
		if (err) {
			return console.log(err);
		}

		commandArray = data.split("\r\n");
		// console.log(commandArray);
		for (var i = 0; i < commandArray.length; i++) {
			if (commandArray[i].split(",")[0] === "spotify-this-song") {
				spotifySong(commandArray[i].split(",")[1]);
			}
			if (commandArray[i].split(",")[0] === "movie-this") {
				movie(commandArray[i].split(",")[1]);
			}
		}
	});
};

var arg = process.argv[2];
switch (arg) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifySong();
	break;

	case "movie-this":
	movie();
	break;

	case "do-what-it-says":
	directions();
	break;
}