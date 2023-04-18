import userSchema from "../models/userSchema";
import orderLink from "../models/orderLink";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import orderForm from "../models/orderForm";
import crypto from "crypto";

const url = "http://localhost:7000/api/user";

export const createUser = async (req: Request, res: Response) => {
	try {
		const { name, email } = req.body;

		const creating = await userSchema.create({
			name,
			email,
		});

		return res.status(200).json({
			message: "user created successfully",
			data: creating,
		});
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
			err,
		});
	}
};

export const createOrderLink = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;

		const getOneUser = await userSchema.findOne(email);

		const generateNumber = Math.floor(Math.random() * 300000) + 26246426;

		const token = jwt.sign(
			generateNumber.toLocaleString(),
			"tsjntka-5ngnsjt-5ng9885",
		);

		if (getOneUser?.name) {
			const creating = await orderLink.create({
				user: getOneUser?._id,
				link: `${url}/${getOneUser?.name}/orderlink/order/${token}`,
			});
			return res.status(200).json({
				message: "success",
				data: creating,
			});
		} else {
			return res.status(404).json({
				message: "user not found",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
		});
	}
};

export const MakeOrder = async (req: Request, res: Response) => {
	try {
		const { userName, customerName, customerEmail } = req.body;

		// adding all the items property from req.body
		const item = req.body.items.map((item: any) => {
			return {
				name: item.name,
				price: item.price * item.portion,
				portion: item.portion,
			};
		});

		const calculateCost = req.body.items.reduce((acc: number, item: any) => {
			return acc + item.price * item.portion;
		}, 0);

		const getOneUser = await userSchema.findOne({ name: userName });
		const getOrderLink = await orderLink.findOne({ user: getOneUser?._id });

		const orderCode = crypto.randomBytes(2).toString("hex");

		if (getOneUser?.name && getOrderLink) {
			const createOrderForm = await orderForm.create({
				customerName,
				customerEmail,
				items: item,
				totalCost: calculateCost,
				code: orderCode,
			});

			await createOrderForm.save();

			getOrderLink?.orders.push(createOrderForm);

			await getOrderLink!.save();

			return res.status(200).json({
				message: "order purchased successfully",
			});
		} else {
			return res.status(404).json({
				message: "user not found",
			});
		}
	} catch (err) {
		return res.status(404).json({
			message: "an error occured",
		});
	}
};
