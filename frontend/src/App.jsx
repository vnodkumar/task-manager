import React from "react";
import TasksPage from "./pages/TaskPage.jsx";

export default function App() {
  return (
    // wrapper divs
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 p-4">
        <h1 className="text-2xl font-semibold text-slate-800 text-center">Task Manager</h1>
      </header>

      <main className="container mx-auto p-4 px-80 flex-1">
        <TasksPage/>
      </main>
    </div>

  );
}
