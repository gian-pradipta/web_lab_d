import Knex from "knex";
import config from "./knexfile.js";
import { IDatabase } from "../interfaces/DatabaseInterfaces/IDatabase";

export class PGDatabase implements IDatabase {
    public builder: Knex.Knex;
    constructor() {
        this.builder = Knex(config.pg);
    }
    // public async createAllTables() : Promise<void> {
    //     await this.pool.query(`-- Table: public.answers
    //         CREATE TABLE IF NOT EXISTS public.answers
    //         (
    //             id bigint NOT NULL DEFAULT nextval('answers_id_seq'::regclass),
    //             question_id bigint NOT NULL,
    //             body text COLLATE pg_catalog."default" NOT NULL,
    //             CONSTRAINT answers_pkey PRIMARY KEY (id),
    //             CONSTRAINT fk_question_id FOREIGN KEY (question_id)
    //                 REFERENCES public.questions (id) MATCH SIMPLE
    //                 ON UPDATE CASCADE
    //                 ON DELETE CASCADE
    //         )

    //         TABLESPACE pg_default;

    //         ALTER TABLE IF EXISTS public.answers
    //             OWNER to postgres;
    // `);

    //     await this.pool.query(`
    //         CREATE TABLE IF NOT EXISTS public.questions
    //         (
    //             id bigint NOT NULL DEFAULT nextval('questions_id_seq'::regclass),
    //             name text COLLATE pg_catalog."default" NOT NULL,
    //             title text COLLATE pg_catalog."default" NOT NULL,
    //             body text COLLATE pg_catalog."default",
    //             CONSTRAINT questions_pkey PRIMARY KEY (id)
    //         )

    //         TABLESPACE pg_default;

    //         ALTER TABLE IF EXISTS public.questions
    //             OWNER to postgres;
    //     `);
    // }
}
