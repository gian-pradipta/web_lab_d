import { QuestionRepository } from "../repositories/QuestionRepository";
import { DeleteResponse, ErrorResponse, GetResponse, InsertResponse } from "../types/QuestionTypes/QuestionResponseTypes";
import { QuestionBody } from "../types/QuestionTypes/QuestionTypes";

export class QuestionService {
    private repo : QuestionRepository;

    constructor(repo : QuestionRepository) {
        this.repo = repo;
    }

    public async getAllQuestions() : Promise<ErrorResponse | GetResponse> {
        let response : ErrorResponse | GetResponse;
        try {
            const data = await this.repo.getAllQuestions();
            response = {status: 200, success: true, message: "Berhasil ambil data", data: data}
        } catch (error) {
            console.log(error.message);
            response = {
                status: 400,
                success: false,
                message: "Gagal ambil data",
                errors: error.message,
            }
        }
        return response;
    }

    public async getQuestion(id : number) : Promise<ErrorResponse | GetResponse> {
        let response : ErrorResponse | GetResponse;
        try {
            const data = await this.repo.getQuestion(id);
            response = {status: 200, success: true, message: "Berhasil ambil data", data: data ? [data] : [] }
        } catch (error) {
            console.log(error.message);
            response = {
                status: 400,
                success: false,
                message: "Gagal ambil data",
                errors: error.message,
            }
        }
        return response;
    }

    public async  insertQuestion(newQuestion : QuestionBody) : Promise<ErrorResponse | InsertResponse> {
        let response : ErrorResponse | InsertResponse;
        try {
            if (!newQuestion.name) newQuestion.name = "Anonymous";
            const result = await this.repo.insertQuestion(newQuestion);
            response = {status: 200, success: true, message: "Berhasil Insert data", inserted_data : result.lastRecord[0]};
        } catch (err) {
            response = {status: 201, success: false, message: "Gagal Insert data", errors: [err.message]};
        }
        return response;
    }

    public async deleteQuestion(id : number) : Promise<ErrorResponse | DeleteResponse> {
        let response : ErrorResponse | DeleteResponse;
        try {
            await this.repo.deleteQuestion(id);
            response = {status: 200, success: true, message: "Berhasil Hapus data", last_id: id};
        } catch (err) {
            response = {status: 404, success: false, message: "Gagal Delete data", errors: [err.message]};
        }
        return response;
    }
} 