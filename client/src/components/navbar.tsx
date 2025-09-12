import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddTask = () => {
    navigate("/dashboard");
    setTimeout(() => {
      document
        .getElementById("add-task-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    // Collapse navbar on mobile after click
    const collapse = document.getElementById("navbarBtns");
    if (collapse && collapse.classList.contains("show")) {
      collapse.classList.remove("show");
    }
  };

  const handleNavClick = (to: string) => {
    navigate(to);
    // Collapse navbar on mobile after click
    const collapse = document.getElementById("navbarBtns");
    if (collapse && collapse.classList.contains("show")) {
      collapse.classList.remove("show");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg mb-4"
      style={{
        background: "linear-gradient(90deg, #4f8cff 0%, #a3b8ff 100%)",
        boxShadow: "0 6px 24px rgba(79,140,255,0.12)",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: "100vw",
        paddingLeft: "0",
        paddingRight: "0",
      }}
    >
      <div className="container-fluid px-2 px-sm-3 px-md-4" style={{ maxWidth: "100vw" }}>
        <span
          className="navbar-brand fw-bold text-white"
          style={{
            letterSpacing: "2px",
            whiteSpace: "nowrap",
            fontSize: "2.2rem",
            maxWidth: "100vw",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textShadow: "0 2px 8px rgba(79,140,255,0.10)",
            padding: "0.25rem 0.5rem",
            borderRadius: "0.75rem",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <i className="bi bi-check2-square me-2"></i>Task Manager
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarBtns"
          aria-controls="navbarBtns"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarBtns"
        >
          <div className="d-flex flex-column flex-lg-row gap-3 mt-2 mt-lg-0 w-100 align-items-stretch">
            <button
              className="btn w-100 w-lg-auto fw-bold"
              style={{
                background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                boxShadow: "0 2px 8px rgba(79,140,255,0.12)",
                padding: "0.6rem 1.2rem",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(79,140,255,0.18)";
                e.currentTarget.style.background = "linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(79,140,255,0.12)";
                e.currentTarget.style.background = "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)";
              }}
              onClick={() => handleNavClick("/all-tasks")}
            >
              <i className="bi bi-list-task me-1"></i>View All Tasks
            </button>
            <button
              className="btn w-100 w-lg-auto fw-bold"
              style={{
                background: "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                boxShadow: "0 2px 8px rgba(67,233,123,0.12)",
                padding: "0.6rem 1.2rem",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(67,233,123,0.18)";
                e.currentTarget.style.background = "linear-gradient(90deg, #38f9d7 0%, #43e97b 100%)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(67,233,123,0.12)";
                e.currentTarget.style.background = "linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)";
              }}
              onClick={handleAddTask}
            >
              <i className="bi bi-plus-circle me-1"></i>Add New Task
            </button>
            <button
              onClick={logout}
              className="btn w-100 w-lg-auto fw-bold"
              style={{
                background: "linear-gradient(90deg, #ff5858 0%, #f09819 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                boxShadow: "0 2px 8px rgba(220,53,69,0.12)",
                padding: "0.6rem 1.2rem",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(220,53,69,0.18)";
                e.currentTarget.style.background = "linear-gradient(90deg, #f09819 0%, #ff5858 100%)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(220,53,69,0.12)";
                e.currentTarget.style.background = "linear-gradient(90deg, #ff5858 0%, #f09819 100%)";
              }}
            >
              <i className="bi bi-box-arrow-right me-1"></i>Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}