import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "https://team-task-management-production-0d50.up.railway.app/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);
   localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

      alert("Login successful");
window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Login failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;