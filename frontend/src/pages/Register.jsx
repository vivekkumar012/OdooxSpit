import React from "react";
import { useState } from "react";
import { Package } from "lucide-react";
import Navbar from "../components/Navbar";

const LOGO_SRC =
  "https://imgs.search.brave.com/utT25WVux7fu6UdlgoinfQQGZOjbmgUOAfG958an2SE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTk4/NDc5MzcxMy92ZWN0/b3IvZ3JhcGgtbW92/aW5nLXVwd29yZHMt/aWNvbi5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9S0lCdHZI/OFNBZHdyQmJDRXQ0/T1lKempmclR5U21L/d3BMb0FxRGNtODB5/WT0";
const ACCENT = "cyan-500";

function Register() {
  const [form, setForm] = useState({
    loginId: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  }

  function validateClient() {
    const e = {};
    const { loginId, email, password, password2 } = form;

    // Login ID
    if (!loginId) e.loginId = "Login ID is required.";
    else if (!/^[a-zA-Z0-9_]{6,12}$/.test(loginId))
      e.loginId = "Login ID must be 6–12 characters.";

    // Email
    if (!email) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email address.";

    // Password
    if (!password) e.password = "Password is required.";
    else {
      if (password.length < 8)
        e.password = "Password must be at least 8 characters.";
      if (!/[a-z]/.test(password)) e.password += " Add lowercase.";
      if (!/[A-Z]/.test(password)) e.password += " Add uppercase.";
      if (!/[0-9]/.test(password)) e.password += " Add number.";
      if (!/[^A-Za-z0-9]/.test(password))
        e.password += " Add special character.";
    }

    // Confirm password
    if (password2 !== password) e.password2 = "Passwords do not match.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerMsg(null);

    if (!validateClient()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
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
          text: data?.message || "Signup failed",
        });
      } else {
        setServerMsg({
          type: "success",
          text: "Registered successfully!",
        });

        setForm({
          loginId: "",
          email: "",
          password: "",
          password2: "",
        });
      }
    } catch {
      setServerMsg({
        type: "error",
        text: "Network error",
      });
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
        <div className="w-full max-w-3xl rounded-3xl border border-white/10 p-10 bg-slate-900/40 backdrop-blur-xl">
          {/* FORM GRID */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* LEFT SIDE - INPUTS */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* LOGIN ID */}
              <div>
                <label className="block text-slate-300 mb-1">Login ID</label>
                <input
                  name="loginId"
                  value={form.loginId}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="unique123"
                />
                {errors.loginId && (
                  <p className="text-rose-400 text-sm">{errors.loginId}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-slate-300 mb-1">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-rose-400 text-sm">{errors.email}</p>
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
                  placeholder="Create password"
                />
                {errors.password && (
                  <p className="text-rose-400 text-sm whitespace-pre-wrap">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-slate-300 mb-1">
                  Re-enter Password
                </label>
                <input
                  name="password2"
                  type="password"
                  value={form.password2}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Confirm"
                />
                {errors.password2 && (
                  <p className="text-rose-400 text-sm">{errors.password2}</p>
                )}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-cyan-950 text-white py-3 rounded-xl font-semibold hover:scale-105 transition transform mt-4 cursor-pointer`}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              {/* SERVER RESPONSE */}
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
            </form>

            {/* RIGHT PANEL */}
            <div className="bg-slate-800/40 border border-white/10 p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-3">Signup Rules</h3>
              <ul className="text-slate-300 space-y-2 text-sm">
                <li>• Login ID must be 6–12 characters, unique.</li>
                <li>• Email must not exist in database.</li>
                <li>
                  • Password must include uppercase, lowercase, number, special
                  character.
                </li>
                <li>• Password length ≥ 8.</li>
                <li>• Both passwords must match.</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-4 text-slate-400 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-cyan-400 font-semibold hover:underline"
            >
              Login
            </a>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default Register;
