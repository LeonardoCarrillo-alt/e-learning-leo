import { useEffect, useState } from "react";
import { useAuthStore } from "./store/useAuthStore";
import Login from "./pages/Login";
import TeacherHome from "./pages/TeacherHome";
import StudentHome from "./pages/StudentHome";
import AdminHome from "./pages/AdminHome";

export default function App() {
  const { token, role, name, load, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar sesión desde localStorage
    load();
    setLoading(false);
  }, []);

  if (loading) return <div>Cargando...</div>;

  // Si no hay usuario autenticado
  if (!token) return <Login />;

  // Navbar fijo para todos los roles
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">E-Learning</h1>
          <p className="text-sm text-gray-600">{name} - {role}</p>
        </div>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      <Navbar />

      {role === "teacher" && <TeacherHome />}
      {role === "student" && <StudentHome />}
      {role === "admin" && <AdminHome />}
    </div>
  );
}
