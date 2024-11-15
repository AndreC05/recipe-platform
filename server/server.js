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

// /authors GET
app.get("/recipe_authors", async (_, response) => {
  const result = await db.query(
    `SELECT recipe_authors.id, recipe_authors.name FROM recipe_authors`
  );

  const authors = result.rows;
  response.send(authors);
});

// /authors POST
app.post("/recipe_authors", async (request, response) => {
  //get request body
  const { name } = request.body;

  //query to database
  const insertData = await db.query(
    `INSERT INTO recipe_authors (name) VALUES ($1)`,
    [name]
  );

  //response
  response.json(insertData);
});

// /recipe_posts GET
app.get("/recipe_posts", async (_, response) => {
  const result = await db.query(
    `SELECT recipe_posts.id, recipe_authors.name AS author, recipe_posts.title, recipe_posts.content, recipe_categories.name AS category, TO_CHAR(recipe_posts.post_date, 'DD-MM-YYYY') AS post_date, recipe_posts.likes FROM recipe_posts JOIN recipe_categories ON recipe_posts.category_id = recipe_categories.id JOIN recipe_authors ON recipe_posts.author_id = recipe_authors.id ORDER BY recipe_posts.id DESC`
  );

  const recipe_posts = result.rows;

  response.send(recipe_posts);
});

// /recipe_posts POST
app.post("/recipe_posts", async (request, response) => {
  //get request body
  const { author_id, title, content, category_id } = request.body;

  //query to database
  const insertData = await db.query(
    `INSERT INTO recipe_posts (author_id, title, content, category_id) VALUES ($1, $2, $3, $4)`,
    [author_id, title, content, category_id]
  );

  //response
  response.json(insertData);
});

// /recipe_posts put
app.put("/recipe_posts", async (request, response) => {
  const { id } = request.body;
  const updateLikes = await db.query(
    `UPDATE recipe_posts SET likes = likes + 1 WHERE id = ${id}`
  );
  response.send(updateLikes);
});

// /recipe_posts DELETE
app.delete("/recipe_posts", async (request, response) => {
  const { id } = request.body;
  const deletePost = await db.query(
    `DELETE FROM recipe_posts WHERE id = ${id}`
  );
  response.send(deletePost);
});

//------------------------------------------------------------------------------Port
app.listen("8080", () => {
  console.log("Server running on port 8080");
});
