import { QuestionBody } from "../types/QuestionTypes/QuestionTypes";
import { IDatabase } from "../interfaces/DatabaseInterfaces/IDatabase";

export class QuestionRepository {
    private db : IDatabase;

    constructor(db : IDatabase) {
        this.db = db;
    }

    public async getAllQuestions() : Promise<QuestionBody[]> {
        const data : QuestionBody[] = await this.db.query("SELECT * FROM questions order by id desc");
        return data;
    }

    public async insertQuestion(newQuestion : QuestionBody) : Promise<QuestionBody> {
        const response = await this.db.execute(`INSERT INTO questions (title, name, body) VALUES(?, ?, ?)`, [newQuestion.title, newQuestion.name, newQuestion.body]);
        newQuestion.id = response.lastID;
        return newQuestion;
    }

    public async deleteQuestion(id : number) : Promise<number> {
        const response = await this.db.execute(`DELETE FROM questions WHERE id = ?`, [id]);
        if (response.changes == 0) throw new Error("Gagal Delete data, data tidak ditemukan");
        return id;
    }
}