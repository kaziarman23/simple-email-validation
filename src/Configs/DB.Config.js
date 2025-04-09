import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

pool.getConnection((error, connection) => {
  if (error) {
    console.error("Database connection failed: ", error);
  } else {
    console.log("Database Connected Successfully.");
    connection.release();
  }
});

// Create Tables
const createUserTable = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isVerified BOOLEAN DEFAULT FALSE,
    verificationCode VARCHAR(6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

pool
  .promise()
  .execute(createUserTable)
  .then(() => {
    console.log("user table is ready");
  })
  .catch((error) => {
    console.log("Error while creating user table", error);
  });

export default pool.promise();
