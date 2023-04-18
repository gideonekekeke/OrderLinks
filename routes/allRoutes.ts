import {
	createOrderLink,
	createUser,
	MakeOrder,
} from "../controllers/allController";
import { Router } from "express";
const router = Router();

router.post("/register/now", createUser);
router.post("/orderlink", createOrderLink);
router.post("/ordernow", MakeOrder);

export default router;
