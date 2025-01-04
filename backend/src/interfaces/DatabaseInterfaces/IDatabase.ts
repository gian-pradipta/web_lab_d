import Knex from "knex"

export interface IDatabase {
    builder : Knex.Knex;
}