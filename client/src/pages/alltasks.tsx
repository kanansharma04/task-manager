import { useEffect, useState } from "react";
import TaskCard from "../components/taskcard";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
};

export default function AllTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL = "https://task-manager-server-ofko.onrender.com";

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      className="container py-3"
      style={{
        background: "#f8f9fa", // Sober light gray background
        minHeight: "100vh",
        borderRadius: "1.5rem",
        overflowX: "hidden",
        maxWidth: "100vw",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
        boxShadow: "0 8px 32px rgba(106,17,203,0.10)",
      }}
    >
      <div className="text-center mb-4">
        <div
          className="d-inline-block p-3 rounded-circle"
          style={{
            background: "#e9ecef", // Sober accent
            boxShadow: "0 2px 8px rgba(106,17,203,0.10)",
          }}
        >
          <i className="bi bi-list-task" style={{ fontSize: "2.5rem", color: "#495057" }}></i>
        </div>
        <h1 className="fw-bold mt-3 mb-1" style={{ color: "#495057", letterSpacing: "1px" }}>
          All Tasks
        </h1>
        <p className="text-muted mb-0" style={{ fontSize: "1.1rem" }}>
          Here are all your tasks, beautifully organized.
        </p>
      </div>
      {loading && (
        <div className="d-flex justify-content-center align-items-center my-4">
          <div className="spinner-border text-primary me-2" role="status" />
          <span>Loading tasks...</span>
        </div>
      )}
      <div className="row justify-content-center g-4">
        {tasks.length === 0 && !loading ? (
          <div className="col-12 text-center text-muted fs-5">No tasks found.</div>
        ) : (
          tasks.map((t) => (
            <div className="col-12 col-sm-10 col-md-8 col-lg-4 d-flex justify-content-center" key={t.id}>
              <TaskCard task={t} onToggle={() => {}} onDelete={() => {}} disabled={true} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

