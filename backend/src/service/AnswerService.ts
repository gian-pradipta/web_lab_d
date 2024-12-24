import { DeleteResponse, ErrorResponse, GetResponse, InsertResponse } from "../interfaces/APIResponseInterface/APIResponseInterface";
import { AnswerRepository } from "../repositories/AnswerRepository";
import { AnswerBody } from "../types/AnswerTypes/AnswerTypes";

export class AnswerService {
    private repo : AnswerRepository;
    constructor(repo : AnswerRepository) {
        this.repo = repo;
    }

    public async getAllAnswers() : Promise<ErrorResponse | GetResponse<AnswerBody>> {
        let response : ErrorResponse | GetResponse<AnswerBody>;
        try {
            const data = await this.repo.getAllAnswers();
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

    public async getAnswer(id : number) : Promise<ErrorResponse | GetResponse<AnswerBody>> {
        let response : ErrorResponse | GetResponse<AnswerBody>;
        try {
            const data = await this.repo.getAnswer(id);
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

    public async getAllAnswersToQuestion(question_id : number) : Promise<ErrorResponse | GetResponse<AnswerBody>>{
        let response : ErrorResponse | GetResponse<AnswerBody>;
        try {
            const data = await this.repo.getAllAnswersToQuestion(question_id);
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

    public async  insertAnswer(newAnswer : AnswerBody) : Promise<ErrorResponse | InsertResponse<AnswerBody>> {
        let response : ErrorResponse | InsertResponse<AnswerBody>;
        try {
            const result = await this.repo.insertAnswer(newAnswer);
            response = {status: 200, success: true, message: "Berhasil Insert data", inserted_data : result};
        } catch (err) {
            response = {status: 201, success: false, message: "Gagal Insert data", errors: [err.message]};
        }
        return response;
    }

    public async deleteAnswer(id : number) : Promise<ErrorResponse | DeleteResponse> {
        let response : ErrorResponse | DeleteResponse;
        try {
            await this.repo.deleteAnswer(id);
            response = {status: 200, success: true, message: "Berhasil Hapus data", last_id: id};
        } catch (err) {
            response = {status: 404, success: false, message: "Gagal Delete data", errors: [err.message]};
        }
        return response;
    }
} 