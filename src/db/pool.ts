import { Pool } from "pg";
import "dotenv/config";

module.exports = new Pool({
	connectionString: process.env.DB_CONNECTION_STRING,
});
