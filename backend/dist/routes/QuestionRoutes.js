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
exports.QuestionRoutes = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
class QuestionRoutes {
    constructor(controller) {
        this.router = (0, express_1.Router)();
        this.controller = controller;
    }
    getRoutes() {
        this.router.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () { this.controller.getAllQuestions(req, res); }));
        this.router.post("/", QuestionRoutes.insertRules, (req, res) => __awaiter(this, void 0, void 0, function* () { this.controller.insertQuestion(req, res); }));
        this.router.delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () { this.controller.deleteQuestion; }));
        this.router.get("/refresh", (req, res) => __awaiter(this, void 0, void 0, function* () { this.controller.logConnector; }));
        return this.router;
    }
}
exports.QuestionRoutes = QuestionRoutes;
QuestionRoutes.insertRules = [
    (0, express_validator_1.body)("title")
        .notEmpty()
        .withMessage("Judul harus berisi!"),
    (0, express_validator_1.body)("body")
        .exists()
        .withMessage("Deskripsi harus ada")
];
//# sourceMappingURL=QuestionRoutes.js.map