require("dotenv").config();
const mongoose = require("mongoose");

let isConnected = false;

async function connectToDatabase() {
	if (isConnected) {
		return;
	}

	if (!process.env.MONGO_URI) {
		throw new Error("MONGO_URI is not defined");
	}

	await mongoose.connect(process.env.MONGO_URI);
	isConnected = true;
}

module.exports = async (req, res) => {
	try {
		await connectToDatabase();
		const app = require("../app");
		return app(req, res);
	} catch (error) {
		console.error("Serverless startup error:", error);
		return res.status(500).json({ message: "Server failed to start" });
	}
};
