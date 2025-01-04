import { config } from "dotenv";
import express, { Express } from "express";
import cors from "cors"
import { QuestionRepository } from "./repositories/QuestionRepository";
import { QuestionService } from "./service/QuestionService";
import { QuestionController } from "./controller/QuestionController";
import { QuestionRoutes } from "./routes/QuestionRoutes";
import { AnswerRepository } from "./repositories/AnswerRepository";
import { AnswerService } from "./service/AnswerService";
import { AnswerController } from "./controller/AnswerController";
import { AnswerRoutes } from "./routes/AnswerRoutes";
import { PGDatabase } from "./database/PGDatabase";
import { IDatabase } from "./interfaces/DatabaseInterfaces/IDatabase";
import { SQLiteDatabase } from "./database/SQLiteDatabase";

config();
const app : Express = express();
app.use(cors());

function initAnswerRoutes(db : IDatabase) : AnswerRoutes{
  const answerRepository : AnswerRepository = new AnswerRepository(db);
  const answerService : AnswerService = new AnswerService(answerRepository);
  const answerController : AnswerController = new AnswerController(answerService);
  const answerRoutes : AnswerRoutes = new AnswerRoutes(answerController);
  return answerRoutes;
}

function initQuestionRoutes(db : IDatabase) : QuestionRoutes{
  const questionRepository : QuestionRepository = new QuestionRepository(db);
  const questionService : QuestionService = new QuestionService(questionRepository);
  const questionController : QuestionController = new QuestionController(questionService);
  const questionRoutes : QuestionRoutes = new QuestionRoutes(questionController);
  return questionRoutes;
}

async function main() {
  const PORT = process.env.PORT || 8080;
  app.use(express.json());
  const db : IDatabase = new PGDatabase();
  const answerRoutes = initAnswerRoutes(db);
  const questionRoutes  = initQuestionRoutes(db);
  app.use('/api/questions', questionRoutes.getRoutes());
  app.use("/api/answers", answerRoutes.getRoutes());
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });  
}

main();


