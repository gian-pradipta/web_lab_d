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
exports.QuestionService = void 0;
class QuestionService {
    constructor(repo) {
        this.repo = repo;
    }
    getAllQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                const data = yield this.repo.getAllQuestions();
                response = { status: 200, success: true, message: "Berhasil ambil data", data: data };
            }
            catch (error) {
                console.log(error.message);
                // response = new QuestionResponse(400, true, "Gagal ambil data", data=null, error.message);
                response = {
                    status: 400,
                    success: false,
                    message: "Gagal ambil data",
                    errors: error.message,
                };
            }
            return response;
        });
    }
    insertQuestion(newQuestion) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                if (!newQuestion.name)
                    newQuestion.name = "Anonymous";
                const result = yield this.repo.insertQuestion(newQuestion);
                response = { status: 200, success: true, message: "Berhasil Insert data", inserted_data: result };
            }
            catch (err) {
                response = { status: 201, success: false, message: "Gagal Insert data", errors: [err.message] };
            }
            return response;
        });
    }
    deleteQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            try {
                yield this.repo.deleteQuestion(id);
                response = { status: 200, success: true, message: "Berhasil Hapus data", last_id: id };
            }
            catch (err) {
                response = { status: 404, success: false, message: "Gagal Delete data", errors: [err.message] };
            }
            return response;
        });
    }
}
exports.QuestionService = QuestionService;
//# sourceMappingURL=QuestionService.js.map