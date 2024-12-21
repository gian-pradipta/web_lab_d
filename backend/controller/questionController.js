import questionService from "../models/service/questionService.js";
import { validationResult } from "express-validator"
import questionControllerHelper from "./questionControllerHelper.js";

let clients = [];

async function refresh(req, res) {
    try {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
    } catch (err) {
        console.log(err.message);
    }
    req.on("close", () => {
        clients = clients.filter((client) => client !== res);
        res.end();
    }); 
    clients.push(res);
    res.flushHeaders();

}

async function getAllQuestions(req, res) {
    const response = await questionService.getAllQuestions();
    return res.status(response.statusCode).json(response.getJSON());
}

async function insertQuestion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errMessages = errors.array().map((error) => { return error.msg; });
        const response = questionControllerHelper.getValidationErrorResponse(errMessages);
        return res.status(response.statusCode).json(response.getJSON());
    }
    const body = req.body;
    const response = await questionService.insertQuestion(body.name, body.title, body.body);
    if (response.statusCode == 200) {
        for (const client of clients)
            client.write(`event: insert\ndata: {"operation": "insert"}\n\n`);
    }
    return res.status(response.statusCode).json(response.getJSON());
}

async function deleteQuestion(req, res) {
    const id = req.params.id;
    const response = await questionService.deleteQuestion(id);
    if (response.statusCode == 200) {
        for (const client of clients)
            client.write(`event: delete\ndata: {"operation": "delete"}\n\n`);
    }
    return res.status(response.statusCode).json(response.getJSON());
}

const questionController = {
    getAllQuestions,
    insertQuestion,
    deleteQuestion,
    refresh
};

export default questionController;