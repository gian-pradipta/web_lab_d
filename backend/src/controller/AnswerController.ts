import { validationResult } from "express-validator";
import { Request, Response } from "express"
import { AnswerService } from "../service/AnswerService";

export class AnswerController {
    private service : AnswerService;
    
    constructor(service : AnswerService) {
        this.service = service;
    }

    public async getAllAnswers(req : Request, res : Response) {
        const response = await this.service.getAllAnswers();
        return res.status(response.status).json(response);
    }

    public async getAllAnswersToQuestion(req : Request, res : Response) {
        const question_id : number = Number(req.params.question_id);
        const response = await this.service.getAllAnswersToQuestion(question_id);
        return res.status(response.status).json(response);
    }

    public async getAnswer(req : Request, res : Response) {
        const id : number = Number(req.params.id);
        const response = await this.service.getAnswer(id);
        return res.status(response.status).json(response);
    }

    public async insertAnswer(req : Request, res : Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMessages = errors.array().map((error) => { return error.msg; });
            const response = {status: 201, success: false, message:"Gagal Insert data", errors: errMessages};
            return res.status(response.status).json(response);
        }
        const body = req.body;
        const response = await this.service.insertAnswer({question_id: body.question_id, body: body.body});
        return res.status(response.status).json(response);
    }
    
    public async deleteAnswer(req : Request, res : Response) {
        const id : number = Number(req.params.id);
        const response = await this.service.deleteAnswer(id);
        return res.status(response.status).json(response);
    }
}
