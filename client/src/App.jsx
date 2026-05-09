import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  const [showLogin, setShowLogin] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }

  }, []);

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div>

      {
        showLogin ? (
          <Login />
        ) : (
          <Register />
        )
      }

      <div className="fixed bottom-10 w-full flex justify-center">

        <button
          onClick={() => setShowLogin(!showLogin)}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          {
            showLogin
              ? "Go to Register"
              : "Go to Login"
          }
        </button>

      </div>

    </div>
  );
}

export default App;