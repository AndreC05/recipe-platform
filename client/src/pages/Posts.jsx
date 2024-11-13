export default function Posts({ postsArray }) {
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
        </div>
      ))}
    </div>
  );
}
