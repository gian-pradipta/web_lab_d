import express from "express";
import questionController from "../controller/questionController.js";
import questionRouteHelper from "./questionRouteHelper.js";


const router = express.Router()

router.get("/",questionController.getAllQuestions);
router.post("/", 
    questionRouteHelper.getInsertQuestionValidationRules(),
questionController.insertQuestion)
router.delete("/:id", questionController.deleteQuestion);
router.get("/refresh", questionController.refresh);

const userRouter = router;
export default userRouter;