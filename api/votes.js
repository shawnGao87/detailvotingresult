const express = require("express");
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const config = require("../config/config");
const { username, password, conString } = config;
const uri = `mongodb+srv://${username}:${password}@${conString}`;
const client = new MongoClient(uri, { useNewUrlParser: true });

router.get("/:num", (req, res) => {
	const num = req.params.num;
	const questionNumKey = "Question " + num;
	const questionExpKey = "Question " + num + " Explanation";
	const aggregrateion = [
		{
			$project: {
				qVote: { $toObjectId: `$${questionNumKey}` },
				qExp: `$${questionExpKey}`
			}
		},
		{
			$lookup: {
				from: "user",
				localField: "qVote",
				foreignField: "_id",
				as: "user"
			}
		},
		{
			$project: {
				qVote: {
					$concat: [
						{ $arrayElemAt: ["$user.firstName", 0] },
						" ",
						{ $arrayElemAt: ["$user.lastName", 0] }
					]
				},
				qComments: "$qExp"
			}
		},
		{
			$group: {
				// equivalent to _id: $"Question 1"
				_id: "$qVote",
				comments: { $push: "$qComments" },
				count: { $sum: 1 }
			}
		}
	];
	client.connect(err => {
		client
			.db("moodle")
			.collection("vote")
			.aggregate(aggregrateion)
			.toArray()
			.then(data =>
				res.status(200).send({
					success: true,
					votes: data
				})
			)
			.close.catch(e => console.log(e));
		//close connection after reading data
		client.close();
	});
});

module.exports = router;
