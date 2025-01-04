import { QuestionBody } from "../types/QuestionTypes/QuestionTypes";
import { IDatabase } from "../interfaces/DatabaseInterfaces/IDatabase";
import Knex from "knex"
import { RepositoryResult } from "../types/RepositoryTypes/RepositoryTypes";

export class QuestionRepository {
	private table: string;
	private builder: Knex.Knex;
	constructor(db: IDatabase) {
		this.table = "questions";
		this.builder = db.builder;
	}

	public async getAllQuestions(): Promise<QuestionBody[]> {
		const data: QuestionBody[] = await this.builder(this.table).select("*").orderBy("id", "desc");
		return data;
	}


	public async getQuestion(id: number): Promise<QuestionBody | null> {
		const [data] = await this.builder(this.table).select("*").where("id", "=", id).orderBy("id", "desc");
		return data;
	}

	public async insertQuestion(newQuestion: QuestionBody): Promise<RepositoryResult<QuestionBody>> {

		const insertedRows = await this.builder(this.table).insert(newQuestion).returning("id");
		const newId: number = Number(insertedRows[0].id);
		newQuestion.id = newId;
		const result: RepositoryResult<QuestionBody> = {
			lastId: newId,
			operation: "insert",
			rowsAffected: insertedRows.length,
			lastRecord: [newQuestion],
		};
		return result;
	}

	public async deleteQuestion(id: number): Promise<RepositoryResult<QuestionBody>> {
		const response: QuestionBody[] = await this.builder(this.table).where("id", "=", id).delete().returning("*");
		if (response.length <= 0) throw new Error("Gagal Delete data, data tidak ditemukan");
		const res: RepositoryResult<QuestionBody> = {
			lastId: id,
			operation: "delete",
			rowsAffected: response.length,
			lastRecord: response,
		};
		return res;
	}
}
