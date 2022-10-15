import express from "express";
import cors from "cors";
//import pool from "./createPool.js"
import pool from "./localPool.js";
const app = express();
const port = 4000;


app.use(cors())
app.use(express.json())

app.get('/quotes', async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM quotes ORDER BY id ASC');
        res.contentType('application/json').status(200)
        res.send(rows)
    } catch (error) {
        console.log(error.message)
    }
});

app.get('/quotes/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query('SELECT quote FROM quotes WHERE id = $1;', [id]);
        res.contentType('application/json').status(200)
        res.send(rows)
    } catch (error) {
        console.log(error.message)
    }
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
});