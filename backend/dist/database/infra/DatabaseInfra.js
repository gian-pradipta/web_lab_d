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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInfrastructure = void 0;
class DatabaseInfrastructure {
    constructor(db) {
        this.db = db;
    }
    createTableUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )`);
        });
    }
    createTableQuestion() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.exec(`CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL
        )`);
        });
    }
    createAllTables() {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.createTableUser();
            yield this.createTableQuestion();
        });
    }
}
exports.DatabaseInfrastructure = DatabaseInfrastructure;
//# sourceMappingURL=DatabaseInfra.js.map