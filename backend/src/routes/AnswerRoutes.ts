import { Router } from "express"
import { body } from "express-validator";
import { AnswerController } from "../controller/AnswerController";

export class AnswerRoutes {
    private router : Router;
    private controller : AnswerController;
    private static insertRules = [
        body("question_id")
            .notEmpty()
            .withMessage("question id harus berisi!"),
        body("body")
            .exists()
            .withMessage("Deskripsi harus ada")
    ]

    constructor(controller : AnswerController) {
        this.router = Router();
        this.controller = controller;
    }

    public getRoutes() {
        this.router.get("/", async (req, res) => {this.controller.getAllAnswers(req, res)});
        this.router.get("/:id", async (req, res) => {this.controller.getAnswer(req, res)});
        this.router.get("/question/:id", async (req, res) => {this.controller.getAllAnswersToQuestion(req, res)})
        this.router.post("/", 
            AnswerRoutes.insertRules,
            async (req, res) => {this.controller.insertAnswer(req, res)});
        this.router.delete("/:id", async (req, res) => {this.controller.deleteAnswer(req, res)});
        return this.router;
    }
}