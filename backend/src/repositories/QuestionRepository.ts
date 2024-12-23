import { Database } from "sqlite";
import { QuestionBody } from "../types/QuestionTypes/QuestionTypes";

export class QuestionRepository {
    private db : Database;

    constructor(db : Database) {
        this.db = db;
    }

    public async getAllQuestions() : Promise<QuestionBody[]> {
        const data : QuestionBody[] = await this.db.all("SELECT * FROM questions order by id desc");
        return data;
    }

    public async insertQuestion(newQuestion : QuestionBody) : Promise<QuestionBody> {
        const response = await this.db.run(`INSERT INTO questions (title, name, body) VALUES(?, ?, ?)`, [newQuestion.title, newQuestion.name, newQuestion.body]);
        newQuestion.id = response.lastID;
        return newQuestion;
    }

    public async deleteQuestion(id : number) : Promise<number> {
        const response = await this.db.run(`DELETE FROM questions WHERE id = ?`, [id]);
        if (response.changes == 0) throw new Error("Gagal Delete data, data tidak ditemukan");
        return id;
    }
}