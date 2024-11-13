import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Posts from "./pages/Posts";
import Header from "./components/Header";

export default function App() {
  //------------------------------------------------------------Constants
  const [postsArray, setPostsArray] = useState([]);

  //--------------------------------------------------------------Fetch Posts
  useEffect(() => {
    async function getPosts() {
      const response = await fetch("http://localhost:8080/recipe_posts");
      const data = await response.json();
      setPostsArray(data);
      console.log(data);
    }

    getPosts();
  }, []);

  // console.log(postsArray);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/posts"} element={<Posts postsArray={postsArray} />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
