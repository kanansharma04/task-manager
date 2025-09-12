import { motion } from "framer-motion";

type Task = {
  id: number;
  title: string;
  description?: string;
  status: "PENDING" | "COMPLETED";
};

type TaskCardProps = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: () => void;
  disabled?: boolean;
};

export default function TaskCard({
  task,
  onToggle,
  onDelete,
  onEdit,
  disabled,
}: TaskCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: "0 8px 32px rgba(106,17,203,0.18)",
      }}
      className="animate__animated animate__fadeInUp"
      style={{
        width: "100%",
        maxWidth: "320px", // reduce max width for small screens
        minWidth: 0,
        margin: "0 auto",
      }}
    >
      <div
        className={`card h-100 border-0 shadow-lg`}
        style={{
          borderRadius: "1.1rem",
          background:
            task.status === "COMPLETED"
              ? "linear-gradient(135deg, #e0e7ff 0%, #b2f7ef 100%)"
              : "linear-gradient(135deg, #f3f4f6 0%, #6a11cb 100%)",
          color: task.status === "COMPLETED" ? "#444" : "#fff",
          padding: "0.5rem",
          fontSize: "0.92rem",
          minWidth: 0,
        }}
      >
        <div
          className="card-body d-flex flex-column justify-content-between"
          style={{
            padding: "0",
            minWidth: 0,
          }}
        >
          <div>
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-2">
              <h5
                className={`card-title mb-2 mb-md-0 fw-bold`}
                style={{
                  textDecoration:
                    task.status === "COMPLETED" ? "line-through" : "none",
                  color: task.status === "COMPLETED" ? "#6c757d" : "#fff",
                  letterSpacing: "1px",
                  wordBreak: "break-word",
                  fontSize: "1.1rem",
                  minWidth: 0,
                }}
              >
                {task.title}
              </h5>
              <span
                className={`badge rounded-pill px-3 py-2 mt-2 mt-md-0`}
                style={{
                  fontSize: "0.95rem",
                  background:
                    task.status === "COMPLETED" ? "#28a745" : "#ffc107",
                  color: task.status === "COMPLETED" ? "#fff" : "#212529",
                  boxShadow: "0 2px 8px rgba(40,167,69,0.12)",
                  wordBreak: "break-word",
                  minWidth: 0,
                }}
              >
                {task.status === "COMPLETED" ? (
                  <>
                    <i className="bi bi-check-circle me-1"></i>Completed
                  </>
                ) : (
                  <>
                    <i className="bi bi-hourglass-split me-1"></i>Pending
                  </>
                )}
              </span>
            </div>
            {task.description && (
              <p
                className="card-text"
                style={{
                  color:
                    task.status === "COMPLETED" ? "#6c757d" : "#e0e7ff",
                  wordBreak: "break-word",
                  fontSize: "0.95rem",
                  minWidth: 0,
                }}
              >
                {task.description}
              </p>
            )}
          </div>
          <div className="mt-3 d-flex flex-wrap gap-2 justify-content-end" style={{ minWidth: 0 }}>
            <button
              onClick={() => onToggle(task.id)}
              className={`btn btn-sm px-3 py-2 fw-bold`}
              style={{
                borderRadius: "0.75rem",
                background:
                  task.status === "PENDING" ? "#28a745" : "#ffc107",
                color: task.status === "PENDING" ? "#fff" : "#212529",
                border: "none",
                boxShadow: "0 2px 8px rgba(40,167,69,0.12)",
                transition: "background 0.2s, transform 0.2s",
                minWidth: "90px",
                fontSize: "0.95rem",
                padding: "0.4rem 0.7rem",
              }}
              title={
                task.status === "PENDING"
                  ? "Mark as Completed"
                  : "Mark as Pending"
              }
              disabled={disabled}
            >
              {task.status === "PENDING" ? (
                <>
                  <i className="bi bi-check-circle"></i> Complete
                </>
              ) : (
                <>
                  <i className="bi bi-arrow-counterclockwise"></i> Undo
                </>
              )}
            </button>
            <button
              onClick={onEdit}
              className="btn btn-sm btn-info px-3 py-2 fw-bold"
              style={{
                borderRadius: "0.75rem",
                color: "#fff",
                border: "none",
                boxShadow: "0 2px 8px rgba(23,162,184,0.12)",
                transition: "background 0.2s, transform 0.2s",
                minWidth: "70px",
                fontSize: "0.95rem",
                padding: "0.4rem 0.7rem",
              }}
              title="Edit Task"
              disabled={disabled}
            >
              <i className="bi bi-pencil"></i> Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="btn btn-sm btn-danger px-3 py-2 fw-bold"
              style={{
                borderRadius: "0.75rem",
                color: "#fff",
                border: "none",
                boxShadow: "0 2px 8px rgba(220,53,69,0.12)",
                transition: "background 0.2s, transform 0.2s",
                minWidth: "70px",
                fontSize: "0.95rem",
                padding: "0.4rem 0.7rem",
              }}
              title="Delete Task"
              disabled={disabled}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

