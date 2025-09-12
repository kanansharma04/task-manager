import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/navbar";
import AllTasksPage from "./pages/alltasks";

function App() {
  const isAuthed = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      {isAuthed && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isAuthed ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/all-tasks"
          element={isAuthed ? <AllTasksPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isAuthed ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
