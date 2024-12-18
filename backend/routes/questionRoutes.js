import express from "express";
import questionController from "../controller/questionController.js";

const router = express.Router()

router.get("/", questionController.getAllQuestions);
router.post("/", questionController.insertQuestion)

const userRouter = router;
export default userRouter;