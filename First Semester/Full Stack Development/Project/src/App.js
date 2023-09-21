import { Navbar } from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import GeneratorHome from "./pages/GeneratorHome";
import Home from "./pages/Home";
import About from "./pages/About";
import Random from "./pages/Random";
import Master from "./pages/Master";
import Hashed from "./pages/Hashed";
import ThemeContextProvider from "./context/ThemeContext";
import Developers from "./pages/Developers";
import Vaults from "./pages/Vaults";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPass from "./pages/ForgotPass";
import { useEffect, useState } from "react";
import VaultContent from "./pages/VaultContent";
import { UserInfoContextProvider } from "./context/UserInfoContext";

function App() {
  const [isNavbarPresent, setisNavbarPresent] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname === "/signup" ||
      window.location.pathname === "/fpass" ||
      window.location.pathname === "/"
    ) {
      setisNavbarPresent(false);
    } else {
      setisNavbarPresent(true);
    }
  }, [isNavbarPresent]);

  return (
    <ThemeContextProvider>
      <UserInfoContextProvider>
        <div className="">
          {isNavbarPresent ? (
            <Navbar setisNavbarPresent={setisNavbarPresent} />
          ) : null}
          <Routes>
            <Route
              path="/"
              element={<Login setisNavbarPresent={setisNavbarPresent} />}
            />
            <Route
              path="/fpass"
              element={<ForgotPass setisNavbarPresent={setisNavbarPresent} />}
            />
            <Route
              path="/signup"
              element={<Signup setisNavbarPresent={setisNavbarPresent} />}
            />
            <Route path="/home" element={<Home />} />
            <Route path="/generator" element={<GeneratorHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/random" element={<Random />} />
            <Route path="/master" element={<Master />} />
            <Route path="/hashed" element={<Hashed />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/vaults" element={<Vaults />} />
            <Route path="/vaults/:id/:name" element={<VaultContent />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </UserInfoContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
