"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./database/db"));
const QuestionRepository_1 = require("./repositories/QuestionRepository");
const QuestionService_1 = require("./service/QuestionService");
const QuestionController_1 = require("./controller/QuestionController");
const QuestionRoutes_1 = require("./routes/QuestionRoutes");
const DatabaseInfra_1 = require("./database/infra/DatabaseInfra");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const PORT = process.env.PORT || 8080;
        app.use(express_1.default.json());
        const db = yield (0, db_1.default)();
        const dbInfra = new DatabaseInfra_1.DatabaseInfrastructure(db);
        yield dbInfra.createAllTables();
        const questionRepository = new QuestionRepository_1.QuestionRepository(db);
        const questionService = new QuestionService_1.QuestionService(questionRepository);
        const questionController = new QuestionController_1.QuestionController(questionService);
        const questionRoutes = new QuestionRoutes_1.QuestionRoutes(questionController);
        app.use('/api/questions', questionRoutes.getRoutes());
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    });
}
main();
//# sourceMappingURL=app.js.map