import { useEffect } from "react";

export default function UserLogin({
  setIsLoginValid,
  userLogin,
  setUserLogin,
  allAuthors,
  setAllAuthors,
}) {
  //--------------------------------------------------Handle changes in inputs
  function handleInputChange(event) {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  }

  //----------------------------------------------Handle submit of form
  async function handleSubmit(event) {
    event.preventDefault();

    const username = userLogin.author_name;
    const usernameExists = allAuthors.some((author) => author.name == username);

    if (usernameExists) {
      alert(`Welcome back ${username}!`);
    } else {
      const dataToPost = { ...userLogin };
      await handlePost(dataToPost);
      alert(`Welcome to the GENERIC RECIPE PLATFORM ${username}!`);
    }

    setIsLoginValid(true);
  }

  //------------------------------------------------------Handle Post request
  async function handlePost(data) {
    await fetch("http://localhost:8080/recipe_authors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  //----------------------------------------------------GET all authors
  useEffect(() => {
    async function getAuthors() {
      const response = await fetch("http://localhost:8080/recipe_authors");
      const data = await response.json();
      setAllAuthors(data);
    }

    getAuthors();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="userLogin">
      <p>Please enter your username before proceeding</p>
      <label htmlFor="author_name">Username: </label>
      <input
        type="text"
        id="author_name"
        name="author_name"
        value={userLogin.author_name}
        onChange={handleInputChange}
        minLength={3}
        maxLength={20}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
