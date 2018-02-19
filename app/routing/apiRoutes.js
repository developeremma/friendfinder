// Your apiRoutes.js file should contain two routes:
// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

var friends = require("../data/friends.js");

module.exports = function(app){
	//GET route with the url /api/friends
	app.get('/api/friends', function(req,res){
		res.json(friends);
	});
//POST routes
	app.post('/api/friends', function(req, res){
		var newFriendAns = req.body.scores;
		var scoresList = [];
		var friendCounter = 0;
		var match = 0;

// With that done, compare the difference between current user's scores against those from other users, question by question. Add up the differences to calculate the totalDifference.
// Example:
// User 1: [5, 1, 4, 4, 5, 1, 2, 5, 4, 1]
// User 2: [3, 2, 6, 4, 5, 1, 2, 5, 4, 1]
// Total Difference: 2 + 1 + 2 = 5
// Remember to use the absolute value of the differences. Put another way: no negative solutions! Your app should calculate both 5-3 and 3-5 as 2, and so on.
		for(var i=0; i<friends.length; i++){
			var scoresDiff = 0;

			for (var j=0; j < newFriendAns.length; j++){
				scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendAns[j])));
			}
			scoresList.push(scoresDiff);
		}
// The closest match will be the user with the least amount of difference.
		for(var i=0; i<scoresList.length; i++){
			if(scoresList[i] <= scoresList[match]){
				match = i;
			}
		}
//return the perfect friend
		var perfectFriend = friends[match];
		res.json(perfectFriend);

		friends.push(req.body);
	});

};
