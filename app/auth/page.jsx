"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { login, user, loading, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // If user is already authenticated, redirect to the main page
  if (isAuthenticated) {
    router.push("/home");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Call the login method from AuthContext
      await login(email, password);

      // Redirect to home page on successful login
      router.push("/home");
      router.refresh();
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div className="item-center flex h-full w-full items-center justify-center">
      <form onSubmit={handleSubmit} className="h-fit w-96 space-y-4 bg-gray-900 p-8 rounded-xl">
        <h2 className="text-2xl font-bold">Login</h2>

        {error && <div className="p-2 text-red-500">{error}</div>}

        <div>
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
