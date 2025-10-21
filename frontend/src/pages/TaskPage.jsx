import React, { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/TaskService.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import Loader from "../components/Loader.jsx";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);

  async function loadTasks() {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(payload) {
    try {
      const created = await createTask(payload);
      setTasks(prev => [created, ...prev]);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  async function handleUpdate(id, fields) {
    try {
      const updated = await updateTask(id, fields);
      setTasks(prev => prev.map(t => (t.id === id ? updated : t)));
      setEditing(null);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  async function handleDelete(id) {
    const prev = tasks;
    setTasks(prev => prev.filter(t => t.id !== id)); // optimistic
    try {
      const res = await deleteTask(id);
      if (!res) throw new Error("Delete failed");
      return { ok: true };
    } catch (e) {
      setTasks(prev); // rollback
      return { ok: false, error: e.message };
    }
  }

  return (
    <div>
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">Create Task</h2>
        <TaskForm
          key={editing ? editing.id : "create"}
          initialValues={editing || undefined}
          mode={editing ? "edit" : "create"}
          onCancel={() => setEditing(null)}
          onSubmit={async (payload) => {
            if (editing) return handleUpdate(editing.id, payload);
            return handleCreate(payload);
          }}
        />
      </section>

      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium mb-4"> Task</h2>
        {loading ? <Loader /> : null}
        {error ? <div className="error">{error}</div> : null}
        {!loading && !error ? (
          <TaskList
            tasks={tasks}
            onEdit={task => setEditing(task)}
            onDelete={async (id) => {
              const r = await handleDelete(id);
              if (!r.ok) alert("Delete failed: " + r.error);
            }}
          />
        ) : null}
      </section>
    </div>
  );
}
