import { useEffect, useState } from "react";
import TaskCard from "../components/taskcard";
import { useNavigate } from "react-router-dom";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const API_URL = "https://task-manager-server-ofko.onrender.com";

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include", // Add this for cookies if needed
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

  const createTask = async () => {
    setActionLoading("Adding task...");
    try {
      await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, description }),
        credentials: "include",
      });
      setTitle("");
      setDescription("");
      await fetchTasks();
    } catch (err) {}
    setActionLoading(null);
  };

  const toggleTask = async (id: number) => {
    setActionLoading("Updating task...");
    try {
      await fetch(`${API_URL}/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      await fetchTasks();
    } catch (err) {}
    setActionLoading(null);
  };

  const deleteTask = async (id: number) => {
    setActionLoading("Deleting task...");
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      await fetchTasks();
    } catch (err) {}
    setActionLoading(null);
  };

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const saveEdit = async () => {
    if (editingId === null) return;
    setActionLoading("Saving changes...");
    try {
      await fetch(`${API_URL}/tasks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
        credentials: "include",
      });
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
      await fetchTasks();
    } catch (err) {}
    setActionLoading(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  return (
    <div
      className="container py-2"
      style={{
        background: "#f8f9fa", // Sober light gray background
        minHeight: "100vh",
        borderRadius: "1.5rem",
        overflowX: "hidden",
        maxWidth: "100vw",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
      }}
    >
      {/* Loader for actions */}
      {actionLoading && (
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="spinner-border text-primary me-2" role="status" />
          <span>{actionLoading}</span>
        </div>
      )}
      {/* Loader for fetching tasks */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center my-4">
          <div className="spinner-border text-success me-2" role="status" />
          <span>Loading tasks...</span>
        </div>
      )}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0 text-center fw-bold" style={{ color: "#2575fc", letterSpacing: "1px" }}>
          <i className="bi bi-list-check me-2"></i>Your Tasks
        </h1>
        <button
          className="btn btn-success"
          onClick={() => document.getElementById("add-task-form")?.scrollIntoView({ behavior: "smooth" })}
          disabled={!!actionLoading}
          style={{ borderRadius: "0.75rem", fontWeight: "bold" }}
        >
          <i className="bi bi-plus-circle me-1"></i>Add Task
        </button>
      </div>
      <div className="mb-4" id="add-task-form">
        <div className="row g-2">
          <div className="col-12 col-md-5">
            <input
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              disabled={!!actionLoading}
              style={{ borderRadius: "0.75rem", minWidth: 0 }}
            />
          </div>
          <div className="col-12 col-md-5 mt-2 mt-md-0">
            <input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              disabled={!!actionLoading}
              style={{ borderRadius: "0.75rem", minWidth: 0 }}
            />
          </div>
          <div className="col-12 col-md-2 mt-2 mt-md-0">
            <button
              onClick={createTask}
              className="btn btn-primary w-100"
              disabled={!!actionLoading}
              style={{ borderRadius: "0.75rem", fontWeight: "bold", minWidth: 0 }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {editingId !== null && (
        <div className="mb-4 animate__animated animate__fadeInUp">
          <div className="card border-warning shadow-lg" style={{ borderRadius: "1rem" }}>
            <div className="card-body">
              <h5 className="card-title fw-bold text-warning">
                <i className="bi bi-pencil-square me-2"></i>Edit Task
              </h5>
              <input
                className="form-control mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                disabled={!!actionLoading}
                style={{ borderRadius: "0.75rem" }}
              />
              <input
                className="form-control mb-2"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                disabled={!!actionLoading}
                style={{ borderRadius: "0.75rem" }}
              />
              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning"
                  onClick={saveEdit}
                  disabled={!!actionLoading}
                  style={{ borderRadius: "0.75rem", fontWeight: "bold" }}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                  disabled={!!actionLoading}
                  style={{ borderRadius: "0.75rem", fontWeight: "bold" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="row g-2">
        {tasks.map((t) => (
          <div className="col-12 col-sm-10 col-md-8 col-lg-4 mx-auto" key={t.id}>
            <TaskCard
              task={t}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={() => startEdit(t)}
              disabled={!!actionLoading}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/all-tasks")}
          disabled={!!actionLoading}
          style={{ borderRadius: "0.75rem", fontWeight: "bold" }}
        >
          <i className="bi bi-list-task me-1"></i>View All Tasks
        </button>
      </div>
    </div>
  );
}

