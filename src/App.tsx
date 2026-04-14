import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, addTodo, deleteTodo, updateTodo, deleteAllTodos } from './counter/todo';
import { Pencil, Trash2, Plus, X, CheckCircle2, Circle, LayoutGrid, Trash } from 'lucide-react';

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
            dispatch(updateTodo({ ...currentTodo, Name: text })); 
        } else {
            dispatch(addTodo(text));
        }
        setIsOpen(false);
        setText("");
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] p-4 sm:p-10 flex justify-center items-start font-sans antialiased text-slate-900">
            <div className="w-full max-w-lg">
                {/* Header */}
                <div className="bg-white rounded-[32px] p-8 mb-6 shadow-sm border border-slate-200/60 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-indigo-600">
                            <LayoutGrid size={28} /> HUB<span className="text-slate-900">LIST</span>
                        </h1>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                            {data.length} Tasks Remaining
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {/* ТУГМАИ DELETE ALL */}
                        {data.length > 0 && (
                            <button 
                                onClick={() => { if(window.confirm("Ҳамаро нест кунам?")) dispatch(deleteAllTodos(data)) }}
                                className="bg-rose-50 text-rose-600 p-3 rounded-2xl hover:bg-rose-100 transition-all shadow-sm"
                                title="Delete All"
                            >
                                <Trash size={22} />
                            </button>
                        )}
                        <button 
                            onClick={() => { setCurrentTodo(null); setText(""); setIsOpen(true); }}
                            className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
                        >
                            <Plus size={24} strokeWidth={3} />
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {data.map((todo: any) => (
                        <div key={todo.id} className="bg-white group rounded-[28px] p-5 flex items-center justify-between border border-transparent hover:border-indigo-100 transition-all duration-300">
                            <div className="flex items-center gap-4 flex-1">
                                <button onClick={() => dispatch(updateTodo({ ...todo, isCompleted: !todo.isCompleted }))}>
                                    {todo.isCompleted ? (
                                        <CheckCircle2 className="text-emerald-500" size={28} strokeWidth={2.5} />
                                    ) : (
                                        <Circle className="text-slate-200" size={28} strokeWidth={2.5} />
                                    )}
                                </button>
                                <span className={`text-lg font-bold tracking-tight ${(todo.isCompleted) ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                                    {todo.name || todo.Name}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => { setCurrentTodo(todo); setText(todo.name || todo.Name); setIsOpen(true); }} className="p-2 text-slate-300 hover:text-indigo-600">
                                    <Pencil size={18} strokeWidth={2.5} />
                                </button>
                                <button onClick={() => dispatch(deleteTodo(todo.id))} className="p-2 text-slate-300 hover:text-rose-600">
                                    <Trash2 size={18} strokeWidth={2.5} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
                    <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in zoom-in-95">
                        <h2 className="text-2xl font-black mb-8 uppercase tracking-tighter text-slate-900">
                            {currentTodo ? "Edit Mission" : "New Mission"}
                        </h2>
                        <input 
                            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-5 mb-10 outline-none focus:border-indigo-600 font-bold text-xl"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter task..."
                            autoFocus
                        />
                        <button 
                            onClick={handleSave} 
                            className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg hover:bg-indigo-700 transition-all"
                        >
                            CONFIRM DATA
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;