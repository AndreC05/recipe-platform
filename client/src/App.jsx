import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Posts from "./pages/Posts";
import Header from "./components/Header";

export default function App() {
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [userLogin, setUserLogin] = useState({
    author_name: "",
  });
  const [allAuthors, setAllAuthors] = useState([]);

  return (
    <BrowserRouter>
      <Header isLoginValid={isLoginValid} />
      <main>
        <Routes>
          <Route
            path={"/"}
            element={
              <HomePage
                isLoginValid={isLoginValid}
                setIsLoginValid={setIsLoginValid}
                userLogin={userLogin}
                setUserLogin={setUserLogin}
                allAuthors={allAuthors}
                setAllAuthors={setAllAuthors}
              />
            }
          />
          <Route path={"/about"} element={<AboutPage />} />
          <Route
            path={"/posts"}
            element={
              <Posts
                userLogin={userLogin}
                allAuthors={allAuthors}
                setAllAuthors={setAllAuthors}
              />
            }
          />
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
