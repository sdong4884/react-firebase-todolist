import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import type { Todo } from "../types/todo";

const todosCollection = collection(db, "todos");

// Todos 가져오기
export async function fetchTodos(): Promise<Todo[]> {
  const q = query(todosCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    // ...d.data(),
    ...(d.data() as Omit<Todo, "id">), // id를 뺀 Todo 타입 명시
  }));
}

export async function addTodo(title: string): Promise<void> {
  // FireStore에 저장 부분
  await addDoc(todosCollection, {
    title,
    completed: false,
    createdAt: Date.now(),
  });
}
