import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const API_URL = "https://task-manager-server-ofko.onrender.com";

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      setError(data.error || "Signup failed");
    }
  };

  return (
    <div
      className="d-flex min-vh-100 align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #f3f4f6 0%, #2575fc 100%)",
      }}
    >
      <div className="container-fluid px-2">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-lg border-0 animate__animated animate__fadeInDown"
              style={{
                borderRadius: "1.5rem",
                background: "rgba(255,255,255,0.97)",
              }}
            >
              <div className="card-body">
                <h1
                  className="card-title text-center mb-4 fw-bold text-success"
                  style={{ letterSpacing: "1px" }}
                >
                  <i className="bi bi-person-plus-fill me-2"></i>Signup
                </h1>
                {loading && (
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div className="spinner-border text-success me-2" role="status" />
                    <span>Signing up...</span>
                  </div>
                )}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control mb-3"
                  disabled={loading}
                  style={{ borderRadius: "0.75rem" }}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control mb-3"
                  disabled={loading}
                  style={{ borderRadius: "0.75rem" }}
                />
                <button
                  onClick={handleSignup}
                  className="btn btn-success w-100 mb-2"
                  disabled={loading}
                  style={{ borderRadius: "0.75rem", fontWeight: "bold" }}
                >
                  Signup
                </button>
                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="fw-semibold"
                    style={{ color: "#2575fc" }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
