import React, { useState } from "react";

const ACCENT = "cyan-500";

export default function Register() {
  const [form, setForm] = useState({
    loginId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  }

  function validateClient() {
    const e = {};
    const { loginId, email, password, confirmPassword } = form;

    if (!loginId) e.loginId = "Login ID is required.";
    else if (!/^[a-zA-Z0-9_]{6,12}$/.test(loginId))
      e.loginId =
        "Login ID must be 6–12 characters (letters, numbers, underscore).";

    if (!email) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email address.";

    if (!password) e.password = "Password is required.";
    else if (password.length < 8)
      e.password = "Password must be at least 8 characters.";

    if (!confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword)
      e.confirmPassword = "Passwords do not match.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit() {
    setServerMsg(null);

    if (!validateClient()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginId: form.loginId.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMsg({
          type: "error",
          text: data?.message || "Registration failed",
        });
      } else {
        setServerMsg({
          type: "success",
          text:
            data?.message || "Registration successful! Redirecting to login...",
        });

        // Redirect to login page after successful registration
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (err) {
      setServerMsg({ 
        type: "error", 
        text: "Network error. Please check if the server is running." 
      });
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Fixed: Use onKeyDown instead of onKeyPress (which is deprecated)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const inputClass =
    "w-full rounded-lg bg-slate-900/60 px-4 py-3 border border-slate-700 text-white focus:ring-2 focus:ring-" +
    ACCENT + " focus:border-transparent outline-none transition-all";

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 p-10 bg-slate-900/40 backdrop-blur-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400">Sign up to get started</p>
        </div>

        <div className="space-y-5">
          {/* LOGIN ID */}
          <div>
            <label className="block text-slate-300 mb-1">Login ID</label>
            <input
              name="loginId"
              type="text"
              value={form.loginId}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={inputClass}
              placeholder="Choose a login ID (6-12 characters)"
              autoComplete="username"
            />
            {errors.loginId && (
              <p className="text-rose-400 text-sm mt-1">{errors.loginId}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-slate-300 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={inputClass}
              placeholder="your.email@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-rose-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-slate-300 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={inputClass}
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-rose-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className={inputClass}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-rose-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-cyan-950 text-white py-3 rounded-xl font-semibold hover:scale-105 transition transform mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* server message */}
          {serverMsg && (
            <div
              className={`mt-2 p-3 rounded-lg text-sm text-center ${
                serverMsg.type === "error"
                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              }`}
            >
              {serverMsg.text}
            </div>
          )}

          {/* Sign in link */}
          <div className="text-center mt-4 text-slate-400 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-cyan-400 font-semibold hover:underline"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}