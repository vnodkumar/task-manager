import React, { useEffect, useState } from "react";

const statuses = ["pending", "in-progress", "done"];

export default function TaskForm({ initialValues, onSubmit, onCancel, mode = "create" }) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [status, setStatus] = useState(initialValues?.status || "pending");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTitle(initialValues?.title || "");
    setDescription(initialValues?.description || "");
    setStatus(initialValues?.status || "pending");
    setError(null);
  }, [initialValues]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const t = String(title || "").trim();
    if (!t) {
      setError("Title is required");
      return;
    }
    setSubmitting(true);
    try {
      const result = await onSubmit({ title: t, description: description || null, status });
      if (!result || result.ok === false) {
        throw new Error(result?.error || "Failed");
      } else {
        if (mode === "create") {
          setTitle("");
          setDescription("");
          setStatus("pending");
        }
      }
    } catch (e) {
      setError(e.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500" value={title} onChange={e => setTitle(e.target.value)} disabled={submitting} />
      </div>
      <div>
        <label>Description</label>
        <textarea className="mt-1 block w-full rounded-md border-gray-200 shadow-sm" value={description} onChange={e => setDescription(e.target.value)} disabled={submitting} />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <select className="mt-1 block w-full rounded-md border-gray-200" value={status} onChange={e => setStatus(e.target.value)} disabled={submitting}>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {error ? <div className="form-error">{error}</div> : null}
      <div className="flex gap-2">
        <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60">{submitting ? "Saving..." : (mode === "create" ? "Create" : "Update")}</button>
        {mode === "edit" && <button type="button" onClick={onCancel} disabled={submitting} className="px-4 py-2 border rounded text-slate-700">Cancel</button>}
      </div>
    </form>
  );
}
