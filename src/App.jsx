import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Users from "./components/Users.jsx";
import Contact from "./components/Contact";
import Error from "./components/Error";
import Profile from "./components/Profile";
import facade from "./facades/apiFacade";
import SimpleUsers from "./components/SimpleUsers.jsx";
import Rentals from "./components/rentalComponents/Rentals";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      <Header
        setLoggedIn={setLoggedIn}
        loggedIn={loggedIn}
        setErrorMsg={setErrorMsg}
        roles={facade.getRoles()}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="rentals" element={<Rentals />} />
        <Route
          path="contact"
          element={
            <Contact
              name={"Andreas"}
              address={{
                street: "Vejvej 7",
                town: "Bybyen",
                country: "Denmark",
              }}
            />
          }
        />
        <Route path="simple-users" element={<SimpleUsers />} />
        <Route
          path="profile"
          element={<Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route path="error" element={<Error errorMsg={errorMsg} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
