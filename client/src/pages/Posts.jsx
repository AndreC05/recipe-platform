import { useEffect, useState } from "react";

export default function Posts() {
  //------------------------------------------------------------Constants
  const [postsArray, setPostsArray] = useState([]);

  //--------------------------------------------------------------Fetch Posts
  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:8080/recipe_posts");
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
    await fetch("http://localhost:8080/recipe_posts", {
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
    // id of post to delete
    const body = { id: post.id };

    //make delete request
    await fetch("http://localhost:8080/recipe_posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    //delete post from postsArray (to update displayed posts)
    setPostsArray((oldPosts) =>
      oldPosts.filter((postIndex) => postIndex.id !== post.id)
    );
  }

  return (
    <div className="posts">
      <h2>Welcome to the Posts page!!</h2>
      {postsArray.map((post) => (
        <div key={post.id}>
          <h2>Author: {post.author}</h2>
          <h3>Recipe: {post.title}</h3>
          <h4>Category: {post.category}</h4>
          <p>{post.content}</p>
          <h4>Date: {post.post_date}</h4>
          <p>Likes: {post.likes}</p>
          <button onClick={() => handleLike(post)}>Like</button>
          <button onClick={() => handleDelete(post)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
