import express, { Request, Response } from "express";

const port: number = 7000;
import mongoose from "mongoose";
import user from "./routes/allRoutes";

const app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost/saltDB").then(() => {
	console.log("connected");
});

app.use("/api/user", user );

const server = app.listen(port, () => {
	console.log("listening on port ");
});
