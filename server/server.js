import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

// Endpoints
//Root route
app.get("/", function (_, response) {
  response.json("Welcome to the Root Route!");
});
