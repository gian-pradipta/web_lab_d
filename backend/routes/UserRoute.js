import express from "express";
import userController from "../controller/userController.js";

const router = express.Router()

router.get("/", userController.getAllUsers);
router.post("/", userController.insertUser)

const userRouter = router;
export default userRouter;