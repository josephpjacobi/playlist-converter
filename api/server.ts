import express from "express";
import cors from "cors";

const app = express();

const port = 8000;

app.use(cors());

app.get("/", (req, res, next) => {
	const { query } = req;
	console.log(query);

	res.send({ response: "hello world" });
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
