import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, addTodo, deleteTodo, updateTodo } from './counter/todo';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const App = () => {
    const dispatch = useDispatch<any>();
    const data = useSelector((state: any) => state.todo.data);

    const [isOpen, setIsOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<any>(null);
    const [text, setText] = useState("");

    useEffect(() => { dispatch(getTodos()); }, [dispatch]);

    const handleSave = () => {
        if (!text.trim()) return;
        if (currentTodo) {
            dispatch(updateTodo({ ...currentTodo, name: text }));
        } else {
            dispatch(addTodo(text));
        }
        setIsOpen(false);
        setText("");
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8 flex justify-center">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-slate-800">Todo Pro</h1>
                    <button 
                        onClick={() => { setCurrentTodo(null); setText(""); setIsOpen(true); }}
                        className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        <Plus size={20} />
                    </button>
                </div>

                <div className="space-y-3">
                    {data.map((todo: any) => (
                        <div key={todo.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 group transition-all hover:shadow-md">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    checked={todo.status} 
                                    onChange={() => dispatch(updateTodo({ ...todo, status: !todo.status }))}
                                    className="w-5 h-5 accent-indigo-600 cursor-pointer"
                                />
                                <span className={`text-sm font-semibold ${todo.status ? "line-through text-slate-400" : "text-slate-700"}`}>
                                    {todo.name || todo.Name}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setCurrentTodo(todo); setText(todo.name || todo.Name); setIsOpen(true); }} className="text-slate-400 hover:text-indigo-600 transition-colors">
                                    <Pencil size={18} />
                                </button>
                                <button onClick={() => dispatch(deleteTodo(todo.id))} className="text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4 text-slate-800 font-bold">
                            <h2>{currentTodo ? "Edit Task" : "New Task"}</h2>
                            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                        </div>
                        <input 
                            className="w-full border-2 border-slate-200 rounded-xl p-3 mb-4 outline-none focus:border-indigo-600 transition-all"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Type something..."
                            autoFocus
                        />
                        <div className="flex gap-3">
                            <button onClick={() => setIsOpen(false)} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl">Cancel</button>
                            <button onClick={handleSave} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700">Save</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;