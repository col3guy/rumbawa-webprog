import { useState } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../../constants.js";

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${constants.HOST}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data.role === "viewer") {
        alert("Viewer accounts cannot sign in. Please use the public pages.");
        setLoading(false);
        return;
      }

      // 💾 store session
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          email: data.email,
          role: data.role,
        })
      );

      // 🚀 redirect
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      alert("Server not running or API error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-zinc-500">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* SIGN UP */}
        <div className="text-center mt-6">
          <p className="text-sm text-zinc-500">
            Don’t have an account?
          </p>

          <button
            onClick={() => navigate("/auth/signup")}
            className="text-sm font-semibold hover:underline"
          >
            Create account
          </button>
        </div>

      </div>
    </div>
  );
};

export default SignInPage;