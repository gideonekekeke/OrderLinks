import mongoose from "mongoose";

const mySchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},

		link: {
			type: String,
		},

		orders: [],
	},
	{ timestamps: true },
);

export default mongoose.model("orderlinks", mySchema);
