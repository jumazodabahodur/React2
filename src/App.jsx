// src/App.jsx
import React from 'react';
import { TodoProvider } from "./context/TodoContext"; 
import TodoForm from "./Components/TodoForm";
import TodoList from "./Components/TodoList";

function App() {
  return (
    <TodoProvider>
      <div className="max-w-md mx-auto mt-10 p-6 bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-center">My Todo List</h1>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;