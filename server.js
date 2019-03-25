const votes = require("./api/votes");
const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`server running on port ${port}`);
});

app.use("/api/question/", votes);

app.set("trust proxy", true);
