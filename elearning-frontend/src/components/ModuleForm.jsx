import { useState } from "react";
import { Plus } from "lucide-react";

export default function ModuleForm({ onCreate, onCancel }) {
  const [module, setModule] = useState({
    title: "",
    description: "",
    videoFile: null,
  });

  const handleSubmit = () => {
      console.log(module)
    if (!module.title) return alert("El módulo debe tener un título");
    onCreate(module);
    setModule({ title: "", description: "", videoFile: null });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-6">
      <h4 className="font-semibold text-lg mb-2">Nuevo Módulo</h4>
      <input
        type="text"
        placeholder="Título"
        value={module.title}
        onChange={(e) => setModule({ ...module, title: e.target.value })}
        className="w-full mb-2 px-3 py-2 border rounded-md"
      />
      <textarea
        placeholder="Descripción"
        value={module.description}
        onChange={(e) =>
          setModule({ ...module, description: e.target.value })
        }
        className="w-full mb-2 px-3 py-2 border rounded-md"
        rows="3"
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) =>
          setModule({ ...module, videoFile: e.target.files[0] })
        }
        className="w-full mb-2"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Crear
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 rounded-md"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
