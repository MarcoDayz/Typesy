import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
    user: "postgres user name", //username set on postgres
    password: "", //pass word set in postgres
    host:"localhost", //localhost
    port: 5432, //port number default in postgres
    database: "database_name" //database name in postgres to access
    });

export default pool;