import { IDatabase } from "../interfaces/DatabaseInterfaces/IDatabase";
import { AnswerBody } from "../types/AnswerTypes/AnswerTypes";

export class AnswerRepository {
    constructor(private db : IDatabase) {}

    public async getAllAnswers() : Promise<AnswerBody[]> {
        const data : AnswerBody[] = await this.db.query("SELECT * FROM answers order by id desc");
        return data;
    }

    public async getAnswer(id : number) : Promise<AnswerBody | null> {
        const [ data ] = await this.db.query<AnswerBody>("SELECT * FROM answers WHERE id = ? order by id desc", [id]);
        return data;
    }

    public async getAllAnswersToQuestion(question_id : number) : Promise<AnswerBody[] | null> {
        const data= await this.db.query<AnswerBody>("SELECT * FROM answers WHERE question_id = ? order by id desc", [question_id]);
        return data;
    }

    public async insertAnswer(newAnswer : AnswerBody) : Promise<AnswerBody> {
        const response = await this.db.execute(`INSERT INTO answers (question_id, body) VALUES(?, ?)`, [newAnswer.question_id, newAnswer.body]);
        newAnswer.id = response.lastID;
        return newAnswer;
    }

    public async deleteAnswer(id : number) : Promise<number> {
        const response = await this.db.execute(`DELETE FROM answers WHERE id = ?`, [id]);
        if (response.changes == 0) throw new Error("Gagal Delete data, data tidak ditemukan");
        return id;
    }
}