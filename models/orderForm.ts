import mongoose from "mongoose";

const mySchema = new mongoose.Schema(
	{
		customerName: { type: String, required: true },
		customerEmail: { type: String, required: true },
		items: [
			{
				name: { type: String, required: true },
				price: { type: Number, required: true },
				portion: { type: Number, default: 1 },
			},
		],

		totalCost: {
			type: Number,
		},

		isDelievered: {
			type: Boolean,
			default: false,
		},

		code: {
			type: String,
		},
	},
	{ timestamps: true },
);

export default mongoose.model("orders", mySchema);
