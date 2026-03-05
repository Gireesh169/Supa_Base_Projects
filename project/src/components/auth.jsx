import { useState } from "react";
import { supabase } from "../supabase";

export const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validate email and password
    if (!email || !password) {
      setMessage("Please enter both email and password");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        console.log("Attempting sign up with email:", email);
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        
        console.log("Sign up response:", { data, signUpError });
        
        if (signUpError) {
          if (signUpError.message.includes("rate limit")) {
            setMessage("Too many sign-up attempts. Please wait a few minutes and try again.");
          } else if (signUpError.message.includes("already registered")) {
            setMessage("This email is already registered. Try signing in instead.");
          } else {
            setMessage(`Sign up failed: ${signUpError.message}`);
          }
          console.error("Error signing up:", signUpError);
          return;
        }
        
        setMessage("Sign up successful! You can now sign in with your credentials.");
        setEmail("");
        setPassword("");
        // Auto switch to sign in mode after successful signup
        setTimeout(() => setIsSignUp(false), 2000);
      } else {
        console.log("Attempting sign in with email:", email);
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log("Sign in response:", { data, signInError });
        
        if (signInError) {
          if (signInError.message.includes("Invalid")) {
            setMessage("Invalid email or password. Please check and try again.");
          } else if (signInError.message.includes("not confirmed")) {
            setMessage("Please confirm your email first. Check your inbox.");
          } else {
            setMessage(`Sign in failed: ${signInError.message}`);
          }
          console.error("Error signing in:", signInError);
          return;
        }
        
        setMessage("Signed in successfully!");
        console.log("User session:", data.session);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      
      {message && (
        <div style={{
          padding: "0.75rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          backgroundColor: message.includes("failed") ? "#fee" : "#efe",
          color: message.includes("failed") ? "#c33" : "#3c3",
          border: `1px solid ${message.includes("failed") ? "#fcc" : "#cfc"}`
        }}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", boxSizing: "border-box" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ 
            padding: "0.5rem 1rem", 
            marginRight: "0.5rem",
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Loading..." : (isSignUp ? "Sign Up" : "Sign In")}
        </button>
      </form>
      
      <button
        onClick={() => {
          setIsSignUp(!isSignUp);
          setMessage("");
        }}
        style={{ padding: "0.5rem 1rem", marginTop: "0.5rem" }}
      >
        {isSignUp ? "Switch to Sign In" : "Switch to Sign Up"}
      </button>
    </div>
  );
};