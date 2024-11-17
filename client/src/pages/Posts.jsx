import { useEffect, useState } from "react";

export default function Posts({ userLogin }) {
  //------------------------------------------------------------Constants
  const [postsArray, setPostsArray] = useState([]);

  //--------------------------------------------------------------Fetch Posts
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        "https://recipe-platform-002u.onrender.com/recipe_posts"
      );
      const data = await response.json();
      setPostsArray(data);
    }

    getPosts();
  }, []);

  //---------------------------------------------------------------Handle Likes
  async function handleLike(post) {
    // id of post to update
    const body = { id: post.id };

    //make put request
    await fetch("https://recipe-platform-002u.onrender.com/recipe_posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    //update number of likes on the updated post (to update displayed number)
    setPostsArray((oldPosts) =>
      oldPosts.map((postIndex) =>
        postIndex.id === post.id
          ? { ...postIndex, likes: postIndex.likes + 1 }
          : postIndex
      )
    );
  }

  //---------------------------------------------------------------Handle Delete
  async function handleDelete(post) {
    if (userLogin.author_name === post.author) {
      // id of post to delete
      const body = { id: post.id };

      //make delete request
      await fetch("https://recipe-platform-002u.onrender.com/recipe_posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      //delete post from postsArray (to update displayed posts)
      setPostsArray((oldPosts) =>
        oldPosts.filter((postIndex) => postIndex.id !== post.id)
      );

      alert("Your post has ben deleted");
    } else {
      alert("Only the author of this post can delete it");
    }
  }

  return (
    <div className="postsPage">
      <h2 id="pageTitle">Welcome to the Posts page!!</h2>
      {postsArray.map((post) => (
        <div key={post.id} className="post">
          <h2 id="authorDisplay">Author: {post.author}</h2>
          <h3 id="recipeDisplay">Recipe: {post.title}</h3>
          <h4 id="categoryDisplay">Category: {post.category}</h4>
          <p id="contentDisplay">{post.content}</p>
          <h4 id="dateDisplay">Date: {post.post_date}</h4>
          <p id="likesDisplay">Likes: {post.likes}</p>
          <button onClick={() => handleLike(post)} id="likeBtn">
            Like
          </button>
          <button onClick={() => handleDelete(post)} id="deleteBtn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
