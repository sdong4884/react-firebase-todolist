import { useEffect, useState } from "react";
import { addTodo, fetchTodos } from "./services/todoService";
import type { Todo } from "./types/todo";

function App() {
  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  // Todos 초기 로딩
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchTodos();
        setTodos(data);
      } catch (e) {
        console.error(e);
        alert("오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    })(); // useEffect에서는 즉시 실행 함수(IIFE) 안에서 async를 실행해야 한다.
  }, []);

  // Todo 추가
  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = newTitle.trim();
    if (!title) return;

    setAdding(true);
    try {
      addTodo(title);
      setNewTitle("");
      const data = await fetchTodos();
      setTodos(data);
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
        {/* 로딩 표시 */}
        {loading && (
          <p className="text-center text-slate-500 p-10">불러오는 중 ...</p>
        )}
        {/* 목록 표시 */}
        {!loading && todos.length === 0 && (
          <p className="text-center text-slate-500 p-10">할 일이 없습니다.</p>
        )}
        <ul className="space-y-2 max-h-[400px] overflow-y-auto">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
            >
              <label className="flex items-center gap-2 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  className="w-4 h-4"
                />
                <span className="text-sm ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'}">
                  {todo.title}
                </span>
              </label>
              <button className="text-xs text-red-500 hover:text-red-600 transition px-2 py-1">
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
