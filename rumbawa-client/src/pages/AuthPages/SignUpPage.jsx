import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser, loginUser } from "../../services/userServices.js";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.firstName) nextErrors.firstName = "First name is required.";
    if (!form.lastName) nextErrors.lastName = "Last name is required.";
    if (!form.username) nextErrors.username = "Username is required.";
    if (form.username && /\s/.test(form.username))
      nextErrors.username = "Username must not contain spaces.";
    if (!form.password) nextErrors.password = "Password is required.";
    if (form.password && form.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters.";

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    try {
      const usernameValue = form.username.trim().toLowerCase();
      const generatedEmail = `${usernameValue}@rumbawa.dev`;

      await createUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: generatedEmail,
        username: usernameValue,
        password: form.password,
        role: "editor",
        isActive: true,
      });

      const loginResponse = await loginUser({
        email: generatedEmail,
        password: form.password,
      });

      const loginData = loginResponse.data;
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: loginData.id,
          email: loginData.email,
          role: loginData.role,
        })
      );

      alert("Account created successfully! You are now signed in.");
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Server not running");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-zinc-900">
            Create account
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Join us and get started
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* FIRST + LAST NAME (side by side) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <input
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* USERNAME */}
          <div>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-zinc-900 text-white py-3 rounded-xl font-medium hover:bg-zinc-800 transition"
          >
            Create account
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="font-semibold text-zinc-900 hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;