var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        console.log(req.body, 10);
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };



        //take the result of the user's survey POST and parse it.
        var userData = req.body;
        var userScores = userData.userData.scores;

        console.log(userData);
        console.log(userScores)

        //variable to calculate difference between the user's scores and the scores of each user in the database

        var totalDifference = 0;

        //loop through all the friend posiibilities in the database.
        for (var i = 0; i < friends.length; i++) {

          //  console.log(friends[i]);
            totalDifference = 0;

            console.log(friends[i].scores.length)
            //then loop through all ths scores of each friend. Nested for loop:
            for (var j = 0; j < friends[i].scores.length; j++) {
                // calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                //if the sum of differences is less then the difference of the current "best match"
                if (totalDifference <= bestMatch.friendDifference) {

                    //reset the bestMatch to be the new friend.
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        //Finally save the data to the database which happens after the check, otherwise,
        //the database will always return that the user is the user's best friend.
        friends.push(userData);

        //return a JSON with the user's bestMatch. This will be used by the HTML in the next page
        res.json(bestMatch);
    });

}