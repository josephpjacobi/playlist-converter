import express from "express";
import cors from "cors";

const app = express();

const port = 8000;

app.use(cors());

app.get("/", (req, res, next) => {
	console.log("hello");

	res.send({ response: "hello world" });
});

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});
