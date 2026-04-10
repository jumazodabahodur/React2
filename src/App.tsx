import { useEffect, useState } from "react";
import { useCount } from "./store/counter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function App() {
  const { data, getData, addData, deleteData, toggleComplete, deleteImage, addImage, updateTodo } = useCount((s: any) => s);
  
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => { getData() }, []);

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <div className="flex justify-between mb-5">
        <h1 className="text-xl font-bold">ToDo List</h1>
        <Button onClick={() => setIsAddOpen(true)}>+ New Task</Button>
      </div>

      {/* List of Tasks */}
      <div className="space-y-3">
        {data.map((todo: any) => (
          <div key={todo.id} className="border p-3 rounded flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox checked={todo.completed} onCheckedChange={() => toggleComplete(todo.id)} />
                <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.name}</span>
                <span className="text-xs border px-1">{todo.completed ? "Inactive" : "Active"}</span>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={() => { setCurrent(todo); setIsEditOpen(true); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => deleteData(todo.id)}>Delete</Button>
              </div>
            </div>

            {/* Images */}
            <div className="flex gap-2">
              {todo.images?.map((img: any) => (
                <div key={img.id} className="relative">
                  <img src={`http://37.27.29.18:8001/images/${img.imageName}`} className="w-12 h-12 object-cover" />
                  <button onClick={() => deleteImage(img.id)} className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-1">X</button>
                </div>
              ))}
              <input type="file" className="w-20 text-[10px]" onChange={(e) => e.target.files?.[0] && addImage(todo.id, e.target.files[0])} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal: ADD */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Task</DialogTitle></DialogHeader>
          <form onSubmit={(e: any) => {
            e.preventDefault();
            const fd = new FormData();
            fd.append("Name", e.target.name.value);
            fd.append("Description", e.target.desc.value);
            if(e.target.img.files[0]) fd.append("Images", e.target.img.files[0]);
            addData(fd);
            setIsAddOpen(false);
          }} className="space-y-3">
            <Input name="name" placeholder="Name" required />
            <Input name="desc" placeholder="Description" />
            <Input name="img" type="file" />
            <Button type="submit">Save</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal: EDIT */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Task</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input value={current?.name || ""} onChange={(e) => setCurrent({...current, name: e.target.value})} />
            <Input value={current?.description || ""} onChange={(e) => setCurrent({...current, description: e.target.value})} />
            <Button onClick={() => { updateTodo(current.id, {name: current.name, description: current.description}); setIsEditOpen(false); }}>Update</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}