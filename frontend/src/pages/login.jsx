// src/pages/Login.jsx
import React, { useState } from "react";
import { Package } from "lucide-react";
import Navbar from "../components/Navbar";

// Use the uploaded image from the container (local path)
const LOGO_SRC = "/mnt/data/5580e0d2-9d3c-45a6-8a3e-dca38f4803a2.png";
const ACCENT = "cyan-500";

export default function Login() {
  const [form, setForm] = useState({
    loginId: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // NOTE: correct setForm (string values), earlier Register had a bug using arrays
  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validateClient() {
    const e = {};
    const { loginId, password } = form;

    if (!loginId) e.loginId = "Login ID is required.";
    else if (!/^[a-zA-Z0-9_]{6,12}$/.test(loginId))
      e.loginId = "Login ID must be 6–12 characters.";

    if (!password) e.password = "Password is required.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerMsg(null);

    if (!validateClient()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginId: form.loginId.trim(),
          password: form.password,
          remember: form.remember,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // server should return { message: "Invalid Login Id or Password" } on 401/400
        setServerMsg({
          type: "error",
          text: data?.message || "Invalid Login Id or Password",
        });
      } else {
        // expected success: data could contain a token or redirect path
        setServerMsg({
          type: "success",
          text: data?.message || "Login successful",
        });

        // example: save token if returned (adjust to your auth flow)
        if (data?.token) {
          try {
            // store token (if using cookies or secure storage, do it server-side in production)
            localStorage.setItem("sm_token", data.token);
          } catch (err) {}
        }

        // redirect to dashboard after short delay (adjust or replace with router)
        setTimeout(() => {
          window.location.href = data?.redirect || "/dashboard";
        }, 800);
      }
    } catch (err) {
      setServerMsg({ type: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg bg-slate-900/60 px-4 py-3 border border-slate-700 text-white focus:ring-2 focus:ring-" +
    ACCENT;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 p-10 bg-slate-900/40 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* LOGIN ID */}
            <div>
              <label className="block text-slate-300 mb-1">Login ID</label>
              <input
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
                className={inputClass}
                placeholder="your-login-id"
              />
              {errors.loginId && (
                <p className="text-rose-400 text-sm">{errors.loginId}</p>
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
                className={inputClass}
                placeholder="Your password"
              />
              {errors.password && (
                <p className="text-rose-400 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Remember & Links */}
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900"
                />
                <span className="text-sm">Remember me</span>
              </label>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="text-cyan-400 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-cyan-950 text-white py-3 rounded-xl font-semibold hover:scale-105 transition transform mt-4 cursor-pointer`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* server message */}
            {serverMsg && (
              <div
                className={`mt-2 text-sm ${
                  serverMsg.type === "error"
                    ? "text-rose-400"
                    : "text-emerald-400"
                }`}
              >
                {serverMsg.text}
              </div>
            )}

            {/* Sign up link (sketch wants navigation to signup) */}
            <div className="text-center mt-4 text-slate-400 text-sm">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-cyan-400 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
