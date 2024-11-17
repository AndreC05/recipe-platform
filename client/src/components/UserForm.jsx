import { useEffect, useState } from "react";

export default function UserForm({ userLogin, allAuthors, setAllAuthors }) {
  //------------------------------------------Form
  const [formValues, setFormValues] = useState({
    author_id: "",
    title: "",
    category_id: "",
    content: "",
  });

  const [isValid, setIsValid] = useState(false); //used to check that a category was selected

  //----------------------------------------------------GET all authors
  useEffect(() => {
    async function getAuthors() {
      const response = await fetch(
        "https://recipe-platform-002u.onrender.com/recipe_authors"
      );
      const data = await response.json();
      setAllAuthors(data);
    }

    getAuthors();
  }, []);

  //----------------------------------------------Category select dropdown validation

  useEffect(() => {
    setIsValid(formValues.category_id ? true : false);
  }, [formValues.category_id]);

  //----------------------------------------------Handle submit of form
  async function handleSubmit(event) {
    event.preventDefault();

    // find author in allAuthors
    const matchingAuthor = allAuthors.find(
      (author) => author.name === userLogin.author_name
    );

    //update formValues with the matching author_id
    const updatedFormValues = {
      ...formValues,
      author_id: matchingAuthor.id,
    };

    await handlePost(updatedFormValues);

    //reset form values after submitting
    setFormValues({
      author_id: "",
      title: "",
      category_id: "",
      content: "",
    });
  }

  //--------------------------------------------------Handle changes in inputs
  function handleInputChange(event) {
    setFormValues({
      ...formValues,
      [event.target.name]:
        event.target.name === "category_id"
          ? Number(event.target.value)
          : event.target.value, //convert category to number
    });
  }

  //------------------------------------------------------Handle Post request
  async function handlePost(data) {
    await fetch("https://recipe-platform-002u.onrender.com/recipe_posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="userForm">
      <div className="title">
        <label htmlFor="title">Recipe Name:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleInputChange}
          minLength={5}
          maxLength={50}
          required
        />
      </div>
      <div className="content">
        <label htmlFor="content">Recipe:</label>
        <textarea
          type="text"
          id="content"
          name="content"
          value={formValues.content}
          onChange={handleInputChange}
          minLength={20}
          maxLength={3000}
          required
        />
      </div>
      <div className="category">
        <label htmlFor="category_id">Category:</label>
        <select
          id="category_id"
          name="category_id"
          value={formValues.category_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a Category</option>
          <option value={1}>Breakfast recipes</option>
          <option value={2}>Lunch recipes</option>
          <option value={3}>Dinner recipes</option>
          <option value={4}>Dessert recipes</option>
          <option value={5}>Salad recipes</option>
          <option value={6}>Snack recipes</option>
        </select>
      </div>
      <div className="warning">
        {!isValid && <p>You must choose a category</p>}
      </div>
      <div className="submitBtn">
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
}
