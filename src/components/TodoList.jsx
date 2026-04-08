// src/components/TodoList.jsx
import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const TodoList = () => {
  const { todos, deleteTodo } = useContext(TodoContext);

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <Card key={todo.id}>
          <CardContent className="flex justify-between items-center p-4">
            <span>{todo.text}</span>
            <Button variant="destructive" size="icon" onClick={() => deleteTodo(todo.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TodoList