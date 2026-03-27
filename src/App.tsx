import { useState } from "react";
import { addTodo } from "./services/todoService";

function App() {
  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);

  // Todo 추가
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = newTitle.trim();
    if (!title) return;

    setAdding(true);
    try {
      addTodo(title);
      setNewTitle("");
    } catch (e) {
      console.error(e);
      alert("추가 중 오류가 발생했습니다.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-slate-800">
          Firebase Todo List
        </h1>
        <form className="flex gap-2 mb-4" onSubmit={handleAddTodo}>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            type="text"
            placeholder="할 일을 입력하세요."
            className="flex-1 border border-slate-300 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            disabled={adding}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 transition"
          >
            추가
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
