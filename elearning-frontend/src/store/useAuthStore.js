import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  role: null,
  userId: null,
  name: null,

  // Setea la autenticación y guarda en localStorage
  setAuth: (data) => {
    set({
      token: data.token,
      role: data.role,
      userId: data.userId,
      name: data.name,
    });
    localStorage.setItem("auth", JSON.stringify(data));
  },

  // Cargar sesión desde localStorage
  load: () => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const data = JSON.parse(saved);
      set({
        token: data.token,
        role: data.role,
        userId: data.userId,
        name: data.name,
      });
    }
  },

  logout: () => {
    localStorage.removeItem("auth");
    set({ token: null, role: null, userId: null, name: null });
  },
}));
