import React, { useState } from "react";
import Navbar from "../components/Navbar";

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

  // FIXED: store values as STRING, not ARRAY
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // FRONTEND VALIDATION ONLY
  function validateClient() {
    const e = {};
    const { loginId, email, password, password2 } = form;

    if (!loginId) e.loginId = "Login ID is required.";
    else if (!/^[a-zA-Z0-9_]{6,12}$/.test(loginId))
      e.loginId = "Login ID must be 6–12 characters.";

    if (!email) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid email.";

    if (!password) e.password = "Password is required.";

    // CONFIRM PASSWORD CHECK
    if (password2 !== password) {
      e.password2 = "Passwords do not match.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setServerMsg(null);

    if (!validateClient()) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3001/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // FIX: Do NOT send password2
        body: JSON.stringify({
          loginId: form.loginId.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerMsg({ type: "error", text: data.message || "Signup failed" });
      } else {
        setServerMsg({ type: "success", text: "Registered successfully!" });

        setForm({
          loginId: "",
          email: "",
          password: "",
          password2: "",
        });
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
        <div className="w-full max-w-3xl rounded-3xl border border-white/10 p-10 bg-slate-900/40 backdrop-blur-xl">
          <div className="grid md:grid-cols-2 gap-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* LOGIN ID */}
              <div>
                <label className="text-slate-300">Login ID</label>
                <input
                  name="loginId"
                  value={form.loginId}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="unique123"
                />
                {errors.loginId && <p className="text-rose-400">{errors.loginId}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-slate-300">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-rose-400">{errors.email}</p>}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-slate-300">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.password && <p className="text-rose-400">{errors.password}</p>}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-slate-300">Re-enter Password</label>
                <input
                  type="password"
                  name="password2"
                  value={form.password2}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.password2 && <p className="text-rose-400">{errors.password2}</p>}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-950 text-white py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>

              {/* SERVER RESPONSE */}
              {serverMsg && (
                <p
                  className={
                    "mt-2 text-sm " +
                    (serverMsg.type === "error" ? "text-rose-400" : "text-emerald-400")
                  }
                >
                  {serverMsg.text}
                </p>
              )}
            </form>

            {/* RIGHT PANEL */}
            <div className="bg-slate-800/40 border border-white/10 p-6 rounded-xl">
              <h3 className="text-white font-semibold mb-3">Signup Rules</h3>
              <ul className="text-slate-300 text-sm space-y-2">
                <li>• Login ID must be 6–12 characters.</li>
                <li>• Email must be unique.</li>
                <li>• Password must be secure.</li>
                <li>• Passwords must match.</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-4 text-slate-400">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-400 underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
