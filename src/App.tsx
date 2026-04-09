import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTodoStore } from '@/store/todoStore';import { Button } from './Components/ui/button';
import { Input } from './Components/ui/input';
import { Card, CardContent } from './Components/ui/card';
import { Trash2, Edit3, Check, X, CheckCircle } from 'lucide-react';

const Schema = Yup.object().shape({
  task: Yup.string().min(2, 'Кӯтоҳ!').required('Ҳатмист')
});

// Ислоҳи типизатсия барои TodoItem
interface TodoProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
}

const TodoItem = ({ todo }: TodoProps) => {
  const { deleteTodo, toggleTodo, updateTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const save = () => {
    if (editText.trim()) { 
      updateTodo(todo.id, editText); 
      setIsEditing(false); 
    }
  };

  return (
    <Card className={`mb-2 ${todo.completed ? 'opacity-60 bg-slate-50' : ''}`}>
      <CardContent className="flex items-center justify-between p-3">
        {isEditing ? (
          <div className="flex w-full gap-2">
            <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
            <Button size="icon" onClick={save} className="bg-green-600">
              <Check className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="destructive" onClick={() => setIsEditing(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleTodo(todo.id)}>
              <CheckCircle className={`w-5 h-5 ${todo.completed ? 'text-green-500' : 'text-slate-300'}`} />
              <span className={todo.completed ? 'line-through text-slate-500' : ''}>{todo.text}</span>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 text-blue-500" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

interface TodoState {
  todos: { id: number; text: string; completed: boolean }[];
  addTodo: (text: string) => void;
}

export default function App() {
  // Гирифтани маълумот бо диққат
  const todos = useTodoStore((state: TodoState) => state.todos);
  const addTodo = useTodoStore((state: TodoState) => state.addTodo);

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-2xl rounded-2xl border">
      <h1 className="text-2xl font-bold text-center mb-6 text-slate-800">Todo Zustand</h1>
      
      <Formik 
        initialValues={{ task: '' }} 
        validationSchema={Schema} 
        onSubmit={(v, { resetForm }) => { 
          addTodo(v.task); 
          resetForm(); 
        }}
      >
        {({ errors, touched }) => (
          <Form className="mb-6">
            <div className="flex gap-2">
              <Field as={Input} name="task" placeholder="Вазифа..." />
              <Button type="submit">Илова</Button>
            </div>
            {errors.task && touched.task && <p className="text-red-500 text-xs mt-1">{errors.task}</p>}
          </Form>
        )}
      </Formik>

      <div className="space-y-1">
        {/* Илова кардани тафтиши массив пеш аз .map */}
        {todos && todos.length > 0 ? (
          todos.map((t: { id: number; text: string; completed: boolean }) => <TodoItem key={t.id} todo={t} />)
        ) : (
          <p className="text-center text-slate-400 text-sm mt-4">Рӯйхат холӣ аст</p>
        )}
      </div>
    </div>
  );
}