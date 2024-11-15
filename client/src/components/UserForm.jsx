import { useEffect, useState } from "react";

export default function UserForm() {
  //------------------------------------------Form
  const [formValues, setFormValues] = useState({
    author_id: "",
    title: "",
    category_id: "",
    content: "",
  });

  const [isValid, setIsValid] = useState(false); //used to check that a category was selected

  //----------------------------------------------Category select dropdown validation

  useEffect(() => {
    setIsValid(formValues.category_id ? true : false);
  }, [formValues.category_id]);

  //----------------------------------------------Handle submit of form
  async function handleSubmit(event) {
    event.preventDefault();

    const dataToPost = { ...formValues };
    console.log(dataToPost);
    await handlePost(dataToPost);

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
    await fetch("http://localhost:8080/recipe_posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="author_id">Username:</label>
      <input
        type="text"
        id="author_id"
        name="author_id"
        value={formValues.author_id}
        onChange={handleInputChange}
        minLength={3}
        maxLength={20}
        required
      />
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
      <label htmlFor="content">Recipe:</label>
      <textarea
        type="text"
        id="content"
        name="content"
        value={formValues.content}
        onChange={handleInputChange}
        minLength={20}
        maxLength={1500}
        required
      />
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
      {!isValid && <p>You must choose a category</p>}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
