import { BookOpen, LogOut, Plus } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router";

export default function TeacherNavbar() {
  const { name, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
      <div className="flex items-center gap-3">
        <BookOpen className="w-8 h-8" />
        <span className="font-bold text-lg">E-Learning</span>
      </div>
      <div className="flex items-center gap-4">
        <span>{name}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md flex items-center gap-1"
        >
          <LogOut className="w-4 h-4" />
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
