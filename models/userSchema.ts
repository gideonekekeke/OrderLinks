import mongoose from "mongoose";

interface iUser {
	name: string;
	email: string;
}

interface mainUser extends iUser, mongoose.Document {}

const mySchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},

		email: {
			type: String,
		},
	},
	{ timestamps: true },
);

export default mongoose.model<mainUser>("users", mySchema);
