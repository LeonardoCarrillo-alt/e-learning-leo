import React from "react";
import { Eye } from "lucide-react";

export default function ModuleCard({ module, onWatch }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h5 className="font-semibold text-lg">{module.title}</h5>
          <p className="text-gray-600 text-sm mt-1">{module.description}</p>
        </div>
        <button
          onClick={() => onWatch(module)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          Ver Video
        </button>
      </div>
    </div>
  );
}
