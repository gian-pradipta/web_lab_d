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
exports.QuestionRepository = void 0;
class QuestionRepository {
    constructor(db) {
        this.db = db;
    }
    getAllQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.db.all("SELECT * FROM questions order by id desc");
            return data;
        });
    }
    insertQuestion(newQuestion) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.run(`INSERT INTO questions (title, name, body) VALUES(?, ?, ?)`, [newQuestion.title, newQuestion.name, newQuestion.body]);
            newQuestion.id = response.lastID;
            return newQuestion;
        });
    }
    deleteQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.run(`DELETE FROM questions WHERE id = ?`, [id]);
            if (response.changes == 0)
                throw new Error("Gagal Delete data, data tidak ditemukan");
            return id;
        });
    }
}
exports.QuestionRepository = QuestionRepository;
//# sourceMappingURL=QuestionRepository.js.map