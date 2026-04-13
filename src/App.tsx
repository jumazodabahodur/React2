import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, deleteTodo, toggleStatus, updateTodo } from './counter/todo';

const App = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: any) => state.todo.data);

    const [isOpen, setIsOpen] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<any>(null);
    const [text, setText] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: any) => {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImg(reader.result as string);
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSave = () => {
        const payload = { ...currentTodo, name: text, img: previewImg || "https://via.placeholder.com/100" };
        closeModal();
    };

    const closeModal = () => {
        setIsOpen(false);
        setText("");
        setPreviewImg("");
        setCurrentTodo(null);
    };

    return (
        <div className="p-8 max-w-2xl mx-auto font-sans">
            <div className="flex justify-between items-center mb-6 border-b-2 pb-4 border-black">
                <h1 className="text-2xl font-black uppercase">Todo App</h1>
                <button onClick={() => setIsOpen(true)} className="bg-black text-white px-4 py-1 font-bold text-xs">ADD TASK</button>
            </div>

            <table className="w-full">
                <tbody>
                    {data.map((todo: any) => (
                        <tr key={todo.id} className="border-b border-gray-100">
                            <td className="py-4 w-10">
                                {/* ИНВЕРСИЯ: Галочка стоит (!todo.status), когда задача НЕ выполнена (Active) */}
                                <input 
                                    type="checkbox" 
                                    checked={!todo.status} 
                                    onChange={() => dispatch(toggleStatus(todo.id))}
                                    className="w-5 h-5 cursor-pointer accent-black"
                                />
                            </td>
                            <td className="py-4 w-12">
                                <img src={todo.img} className="w-10 h-10 object-cover border" />
                            </td>
                            <td className="py-4 px-4">
                                <p className={`font-bold uppercase text-sm ${todo.status ? "text-gray-400 line-through" : "text-black"}`}>
                                    {todo.name}
                                </p>
                                <span className={`text-[10px] font-black uppercase ${!todo.status ? "text-green-600" : "text-gray-400"}`}>
                                    {!todo.status ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="py-4 text-right">
                                <button onClick={() => { setCurrentTodo(todo); setText(todo.name); setPreviewImg(todo.img); setIsOpen(true); }} className="text-[10px] font-bold rounded-2xl border border-green-700 p-[10px] uppercase text-green-500 uppercase mr-4">Edit</button>
                                <button onClick={() => dispatch(deleteTodo(todo.id))} className="text-[10px] font-bold rounded-2xl border border-red-700 p-[10px] uppercase text-red-500">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4">
                    <div className="bg-white p-6 w-full max-w-xs border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <div onClick={() => fileInputRef.current?.click()} className="w-full h-32 bg-gray-50 mb-4 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-200">
                            {previewImg ? <img src={previewImg} className="w-full h-full object-cover" /> : <b className="text-[10px] text-gray-400">SELECT PHOTO</b>}
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

                        <input className="w-full border-2 border-black p-2 mb-4 font-bold text-sm" value={text} onChange={(e) => setText(e.target.value)} placeholder="TASK NAME" />

                        <div className="flex gap-2 text-[10px] font-black">
                            <button onClick={closeModal} className="flex-1 py-2 border-2 border-black">CANCEL</button>
                            <button onClick={handleSave} className="flex-1 py-2 bg-black text-white">SAVE</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;