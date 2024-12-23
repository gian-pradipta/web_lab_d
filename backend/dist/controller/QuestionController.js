"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const express_validator_1 = require("express-validator");
class QuestionController {
    constructor(service) {
        this.service = service;
    }
    static notifyAllClients(clients, topic, data) {
        const dataString = JSON.stringify(data);
        for (const client of clients)
            client.write(`event: ${topic}\ndata: ${dataString}\n\n`);
    }
    logConnector(req, res) {
        try {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");
        }
        catch (err) {
            console.log(err.message);
        }
        req.on("close", () => {
            QuestionController.clients = QuestionController.clients.filter((client) => client !== res);
            res.end();
        });
        QuestionController.clients.push(res);
        res.flushHeaders();
    }
    getAllQuestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.getAllQuestions();
            return res.status(response.status).json(response);
        });
    }
    insertQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                const errMessages = errors.array().map((error) => { return error.msg; });
                const response = { status: 201, success: false, message: "Gagal Insert data", errors: errMessages };
                return res.status(response.status).json(response);
            }
            const body = req.body;
            const response = yield this.service.insertQuestion({ name: body.name, title: body.title, body: body.body });
            if (response.status == 200) {
                QuestionController.notifyAllClients(QuestionController.clients, "insert", response);
            }
            return res.status(response.status).json(response);
        });
    }
    deleteQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const response = yield this.service.deleteQuestion(id);
            if (response.success) {
                QuestionController.notifyAllClients(QuestionController.clients, "delete", response);
            }
            return res.status(response.status).json(response);
        });
    }
}
exports.QuestionController = QuestionController;
//# sourceMappingURL=QuestionController.js.map