import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const normalizeEmail = (value) => value.trim().toLowerCase();
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const ensureUserRow = async (user) => {
    if (!user) return { ok: false, message: "No user found" };

    const { error: insertError } = await supabase
      .from("users")
      .upsert(
        {
          id: user.id,
          email: user.email,
        },
        { onConflict: "id" }
      );

    if (insertError) {
      return { ok: false, message: insertError.message };
    }

    return { ok: true };
  };

  const handleLogin = async () => {
  const email = normalizeEmail(form.email);
  const password = form.password;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Enter a valid email address (example: name@example.com)");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
      const msg = (error.message || "").toLowerCase();
      if (msg.includes("invalid login credentials")) {
        alert("Account not found or password is wrong. Use Signup first, then Login with the same email/password.");
        return;
      }
      if (msg.includes("email not confirmed")) {
        alert("Please confirm your email from inbox before logging in.");
        return;
      }
      alert(error.message);
    return;
  }

  const profileResult = await ensureUserRow(data?.user);
  if (!profileResult.ok) {
    alert(`Login worked, but users table insert failed: ${profileResult.message}`);
    return;
  }

  alert("Login success!");
  navigate("/dashboard");
};
  const handleSignup = async () => {
  const email = normalizeEmail(form.email);
  const password = form.password;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Enter a valid email address (example: name@example.com)");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
      email,
      password,
  });

  console.log(data, error);

  if (error) {
    const msg = (error.message || "").toLowerCase();
    if (msg.includes("rate limit")) {
      alert("Signup email rate limit exceeded. Wait a bit, or use Login if this account already exists.");
      return;
    }

    alert(error.message);
    return;
  }

  const profileResult = await ensureUserRow(data?.user);
  if (!profileResult.ok) {
    alert(`Signup worked, but users table insert failed: ${profileResult.message}`);
    return;
  }

  alert("Signup successful!");
};

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <br /><br />

      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}