import UserForm from "../components/UserForm";
import UserLogin from "../components/UserLogin";

export default function HomePage({
  isLoginValid,
  setIsLoginValid,
  userLogin,
  setUserLogin,
  allAuthors,
  setAllAuthors,
}) {
  return (
    <div className="homePage">
      <h2>Welcome to the home page!!</h2>
      {isLoginValid && (
        <UserForm
          userLogin={userLogin}
          allAuthors={allAuthors}
          setAllAuthors={setAllAuthors}
        />
      )}
      {!isLoginValid && (
        <UserLogin
          setIsLoginValid={setIsLoginValid}
          userLogin={userLogin}
          setUserLogin={setUserLogin}
          allAuthors={allAuthors}
          setAllAuthors={setAllAuthors}
        />
      )}
    </div>
  );
}
