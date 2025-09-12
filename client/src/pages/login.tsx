import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    const res = await fetch("http://localhost:3000/auth/login", {
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
      setError(data.error || "Login failed");
    }
  };

  return (
    <div
      className="d-flex min-vh-100 align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #f3f4f6 0%, #6a11cb 100%)",
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
                  className="card-title text-center mb-4 fw-bold text-primary"
                  style={{ letterSpacing: "1px" }}
                >
                  <i className="bi bi-person-circle me-2"></i>Login
                </h1>
                {loading && (
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <div className="spinner-border text-primary me-2" role="status" />
                    <span>Signing in...</span>
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
                  onClick={handleLogin}
                  className="btn btn-primary w-100 mb-2"
                  disabled={loading}
                  style={{ borderRadius: "0.75rem", fontWeight: "bold" }}
                >
                  Login
                </button>
                <p className="text-center mt-3">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="fw-semibold"
                    style={{ color: "#6a11cb" }}
                  >
                    Signup
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
