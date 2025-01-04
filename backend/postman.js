const { Pool } = require("pg");

const pool = new Pool(
    {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "B3rasm3ntah",
        database: "lab_d"
    }
);
const getAllQuestions = async () => {
    try {
        const res = await pool.query("SELECT * FROM answers");
        console.log(res.rows);
    } catch (e) {
        console.log(e.message);
    } finally {
        pool.end();
    }
};

const insert = async () => {
    try {
        const res = await pool.query(`INSERT INTO answers (question_id, body) VALUES ($1, $2)`, [1, "dua"]);
        console.log(res.rows);
    } catch (e) {
        console.log(e.message);
    } finally {
        pool.end();
    }
};


const del = async () => {
    try {
        const res = await pool.query(`DELETE FROM questions WHERE id = $1`, [406]);
        console.log(res);
    } catch (e) {
        console.log(e.message);
    } finally {
        pool.end();
    }
};

// insert();
// getAllQuestions();
del();
