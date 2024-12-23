import { config } from "dotenv";
import express, { Express } from "express";
import cors from "cors"
import { Database } from "sqlite";
import initializeDb from "./database/db";
import { QuestionRepository } from "./repositories/QuestionRepository";
import { QuestionService } from "./service/QuestionService";
import { QuestionController } from "./controller/QuestionController";
import { QuestionRoutes } from "./routes/QuestionRoutes";
import { DatabaseInfrastructure } from "./database/infra/DatabaseInfra";

config();
const app : Express = express();
app.use(cors());

async function main() {
  const PORT = process.env.PORT || 8080;
  app.use(express.json());
  const db : Database = await initializeDb();
  const dbInfra = new DatabaseInfrastructure(db);
  await dbInfra.createAllTables();
  const questionRepository : QuestionRepository = new QuestionRepository(db);
  const questionService : QuestionService = new QuestionService(questionRepository);
  const questionController : QuestionController = new QuestionController(questionService);
  const questionRoutes : QuestionRoutes = new QuestionRoutes(questionController);
  app.use('/api/questions', questionRoutes.getRoutes());
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });  
}

main();


