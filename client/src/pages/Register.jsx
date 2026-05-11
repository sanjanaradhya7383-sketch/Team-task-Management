import { useState } from "react";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "https://team-task-management-production-0d50.up.railway.app/api/auth/signup",
        {
          name,
          email,
          password,
          role: "member",
        }
      );

      console.log(response.data);

      alert("Registration successful");

    } catch (error) {

      console.log(error);

      alert("Registration failed");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

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
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;