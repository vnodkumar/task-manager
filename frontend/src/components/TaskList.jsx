import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks = [], onEdit, onDelete }) {
  if (!tasks.length) return <div>No tasks yet</div>;
  return (
    <div className="grid gap-4">
      {tasks.map(t => (
        <TaskItem key={t.id} task={t} onEdit={() => onEdit(t)} onDelete={() => onDelete(t.id)} />
      ))}
    </div>
  );
}
