// Configuración centralizada de la API
// Para producción, usa la IP pública o dominio de tu máquina EC2 del backend
// Ejemplo: "http://3.144.152.48:5000" (reemplaza con tu IP y puerto)
// Para desarrollo local: "http://localhost:5000"

// Obtener la URL del backend desde variables de entorno o usar valor por defecto
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://3.144.152.48:5000";

export const API_URL = BACKEND_URL;

