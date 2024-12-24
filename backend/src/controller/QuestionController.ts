import { validationResult } from "express-validator";
import { QuestionService } from "../service/QuestionService";
import { Request, Response } from "express"

export class QuestionController {
    private service : QuestionService;
    private static clients : any[] = [];

    constructor(service : QuestionService) {
        this.service = service;
    }

    public static notifyAllClients(clients : any, topic : string, data : any) : void {
        const dataString = JSON.stringify(data);
        for (const client of clients)
            client.write(`event: ${topic}\ndata: ${dataString}\n\n`);
    }
    
    public logConnector(req : Request, res : Response) : void {
        try {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
        } catch (err) {
            console.log(err.message);
        }
        req.on("close", () => {
            QuestionController.clients = QuestionController.clients.filter((client) => client !== res);
            res.end();
        }); 
        QuestionController.clients.push(res);
        res.flushHeaders();
    }

    public async getAllQuestions(req : Request, res : Response) {
        const response = await this.service.getAllQuestions();
        return res.status(response.status).json(response);
    }

    public async getQuestion(req : Request, res : Response) {
        const id : number = Number(req.params.id);
        const response = await this.service.getQuestion(id);
        return res.status(response.status).json(response);
    }

    public async insertQuestion(req : Request, res : Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errMessages = errors.array().map((error) => { return error.msg; });
            const response = {status: 201, success: false, message:"Gagal Insert data", errors: errMessages};
            return res.status(response.status).json(response);
        }
        const body = req.body;
        const response = await this.service.insertQuestion({name: body.name, title: body.title, body: body.body});
        if (response.status == 200) {
            QuestionController.notifyAllClients(QuestionController.clients, "insert", response)
        }
        return res.status(response.status).json(response);
    }
    
    public async deleteQuestion(req : Request, res : Response) {
        const id : number = Number(req.params.id);
        const response = await this.service.deleteQuestion(id);
        if (response.success) {
            QuestionController.notifyAllClients(QuestionController.clients, "delete", response)
        }
        return res.status(response.status).json(response);
    }
}