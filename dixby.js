var Twitter = require('twitter');
var spotify = require('spotify');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");


// Turn User Request into a variable
var userRequest = process.argv[2];
//console.log(userRequest)
var title = process.argv[3];
//console.log(title);


// Twitter THIS FUNCTION

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
	});
	

function myTweets () {

client.get('statuses/user_timeline', {q:"@agbarlow3", count: 20 }, function(error, tweets, response) {
   for (var i = 0; i < 20; i++) {
 	console.log(tweets[i].text);
 	}  
});	
}


//SPOTIFY THIS FUNCTION

function spotifyThis (title) {
//var title = process.argv[3];

if (title === undefined) {
	title = "ace of base"
}
 
spotify.search({ type: 'track', query: title }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	//console.log(JSON.stringify(data).album);
    console.log("Artists: " + data.tracks.items[0].artists[0].name);
    console.log("Song's Name: " + data.tracks.items[0].name);
    console.log("Preview Song here: " + data.tracks.items[0].preview_url);
    console.log("Song's Album: " + data.tracks.items[0].album.name);
});
}


// MOVIE THIS FUNCTION

function movieThis (title) {
// var title = process.argv[3];

if (title === undefined) {
title = 'Mr. Nobody';
console.log ("If you haven't watched " + title + "then you should definitely check it out.  Here is some information on it:" );

}

request("http://www.omdbapi.com/?t="+ title + "&y=&plot=short&r=json", function(error, response, body) {  
  if (!error && response.statusCode === 200) {
    console.log("Title of the movie" + JSON.parse(body).Title);
    console.log("Year this movie was released: " + JSON.parse(body).Year);
    console.log("This movie is IMDB rated: " + JSON.parse(body).imdbRating);
	console.log("This movie was produced in: " + JSON.parse(body).Country);
	console.log("The language of this movie is: " + JSON.parse(body).Language);
	console.log("The Plot of the movie: " + JSON.parse(body).Plot);
	console.log("Actors in this movie: " + JSON.parse(body).Actors);
	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	console.log("Rotten Tomatoes Website: https://www.rottentomatoes.com/ ");
  } 
});
}



if (userRequest === 'do-what-it-says') {
fs.readFile("random.txt", "utf8", function(err, data) {
var output = data.split(",");
var userRequest = output[0];
var title = output[1]

if (userRequest === 'my-tweets') {
myTweets();
}

if (userRequest === 'movie-this') {
movieThis(title);
}

if (userRequest === 'spotify-this-song') {
spotifyThis(title); 
}
}); 


}



if (userRequest === 'my-tweets') {
myTweets();
}

if (userRequest === 'movie-this') {
movieThis(title);
}

if (userRequest === 'spotify-this-song') {
spotifyThis(title);
}

