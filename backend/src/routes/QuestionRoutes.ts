import { Router } from "express"
import { QuestionController } from "../controller/QuestionController";
import { body } from "express-validator";

export class QuestionRoutes {
    private router : Router;
    private controller : QuestionController;
    private static insertRules = [
        body("title")
            .notEmpty()
            .withMessage("Judul harus berisi!"),
        body("body")
            .exists()
            .withMessage("Deskripsi harus ada")
    ]

    constructor(controller : QuestionController) {
        this.router = Router();
        this.controller = controller;
    }

    public getRoutes() {
        this.router.get("/", async (req, res) => {this.controller.getAllQuestions(req, res)});
        this.router.post("/", 
            QuestionRoutes.insertRules,
            async (req, res) => {this.controller.insertQuestion(req, res)});
        this.router.delete("/:id", async (req, res) => {this.controller.deleteQuestion});
        this.router.get("/refresh", async (req, res) => {this.controller.logConnector});
        return this.router;
    }
}