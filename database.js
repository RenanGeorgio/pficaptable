const { Pool }  = require('pg');
const dotenv = require("dotenv");

dotenv.config({path: './db.env'}) 


export const pool = new Pool({
    host:process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

pool.on("connect", () => {
    console.log("Conectado a base de dados");
})

pool.on("end", () => {
    console.log("Conexao finalizada");
})
