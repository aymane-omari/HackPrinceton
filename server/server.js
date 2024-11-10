const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 8080;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp
	},
});

const upload = multer({ storage: storage });

// Enable CORS for React Native app
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.post("/transcribe", upload.single("audio"), (req, res) => {
	if (req.file) {
		console.log("success!!!");
		res.json({ message: "File uploaded successfully", file: req.file });
	} else {
		console.log("failure!!!");
		res.status(400).json({ message: "No file uploaded" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
