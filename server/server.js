//--------------------------------------------------------------------------Import modules
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

//----------------------------------------------------------------------------Endpoints
//Root route
app.get("/", function (_, response) {
  response.json("Welcome to the Root Route!");
});

// /recipe_posts GET
app.get("/recipe_posts", async (_, response) => {
  const result = await db.query(
    `SELECT recipe_posts.id, recipe_posts.author, recipe_posts.title, recipe_posts.content, recipe_categories.name AS category, TO_CHAR(recipe_posts.post_date, 'DD-MM-YYYY') AS post_date, recipe_posts.likes FROM recipe_posts JOIN recipe_categories ON recipe_posts.category_id = recipe_categories.id ORDER BY recipe_posts.id DESC`
  );

  const recipe_posts = result.rows;

  response.send(recipe_posts);
});

// /recipe_posts POST
app.post("/recipe_posts", async (request, response) => {
  //get request body
  const { author, title, content, category_id, post_date, likes } =
    request.body;

  //query to database
  const insertData = await db.query(
    `INSERT INTO recipe_posts (author, title, content, category_id, post_date, likes) VALUES ($1, $2, $3, $4, $5, $6)`,
    [author, title, content, category_id, post_date, likes]
  );

  //response
  response.json(insertData);
});

//------------------------------------------------------------------------------Port
app.listen("8080", () => {
  console.log("Server running on port 8080");
});
