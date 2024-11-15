import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import { useEffect, useState } from "react";

export default function App() {
  const [authors, setAuthors] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    async function getAuthors() {
      const response = await fetch("http://localhost:8080/recipe_authors");
      const data = await response.json();
      setAuthors(data);
    }

    getAuthors();
  }, []);

  console.log(authors);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/about"} element={<AboutPage />} />
        <Route path={"/posts"} element={<Posts />} />
        <Route path={"*"} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
