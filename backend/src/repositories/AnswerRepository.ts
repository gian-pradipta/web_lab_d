import Knex from "knex";
import { IDatabase } from "../interfaces/DatabaseInterfaces/IDatabase";
import { AnswerBody } from "../types/AnswerTypes/AnswerTypes";
import { RepositoryResult } from "../types/RepositoryTypes/RepositoryTypes";

export class AnswerRepository {
    private table : string;
    private builder : Knex.Knex;
    constructor(db : IDatabase) {
        this.table = "answers";
        this.builder = db.builder;
    }
    
    public async getAllAnswers() : Promise<AnswerBody[]> {
        const data : AnswerBody[] = await this.builder(this.table).select("*").orderBy("id");
        return data;
    }

    public async getAnswer(id : number) : Promise<AnswerBody | null> {
        const [ data ] = await this.builder<AnswerBody>(this.table).select("*").where("id", "=", id).orderBy("id");
        return data;
    }

    public async getAllAnswersToQuestion(question_id : number) : Promise<AnswerBody[] | null> {
        const data= await this.builder<AnswerBody>(this.table)
        .select("*")
        .where("question_id", "=", question_id)
        .orderBy("id");
        return data;
    }

    public async insertAnswer(newAnswer : AnswerBody) : Promise<RepositoryResult<AnswerBody>> {
        const response = await this.builder(this.table)
        .insert(newAnswer)
        .returning("id");
        newAnswer.id = Number(response[0].id);
        const res : RepositoryResult<AnswerBody> = {
            operation: "insert",
            lastId: newAnswer.id,
            lastRecord: [newAnswer],
            rowsAffected: response.length,
        }
        return res;
    }

    public async deleteAnswer(id : number) : Promise<RepositoryResult<AnswerBody>> {
        let res : RepositoryResult<AnswerBody>;
        const response = await this.builder(this.table).where("id", "=", id).returning("*");
        if (response.length == 0) throw new Error("Gagal Delete data, data tidak ditemukan");
        res.lastId = id;
        res.operation = "delete";
        res.rowsAffected = response.length;
        res.lastRecord = response;
        return res;
    }
}