import express from "express";
import createAllTables from "./infra/create_tables.js"
import dotenv from "dotenv"
import userRouter from "./routes/UserRoute.js";
import questionRoutes from "./routes/questionRoutes.js"
import cors from "cors"

dotenv.config();
const app = express();
app.use(cors());

async function main() {
  await createAllTables();
  const PORT = process.env.PORT || 8080;
  app.use(express.json());
  app.use("/api/users", userRouter);
  app.use('/api/questions', questionRoutes);
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });  
}

main();


