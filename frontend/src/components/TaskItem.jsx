import React from "react";

export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="p-4 bg-white rounded border flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
            <div className="flex items-center gap-3">
            <strong className="text-slate-800">{task.title}</strong>
            <span className={`text-xs px-2 py-0.5 rounded-full ${task.status === 'done' ? 'bg-emerald-100 text-emerald-800' : task.status === 'in-progress' ? 'bg-sky-100 text-sky-800' : 'bg-amber-100 text-amber-800'}`}>
                {task.status}
            </span>
            </div>
            {task.description && <div className="mt-2 text-sm text-slate-600">{task.description}</div>}
        </div>

        <div className="mt-3 sm:mt-0 flex gap-2">
            <button onClick={onEdit} className="px-3 py-1 border rounded text-sm">Edit</button>
            <button onClick={onDelete} className="px-3 py-1 rounded text-sm bg-red-600 text-white hover:bg-red-700">Delete</button>
        </div>
    </div>
  );
}
