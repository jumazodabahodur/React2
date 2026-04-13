import { createSlice } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    name: string;
    status: boolean;
    img: string;
}

const todoSlice = createSlice({
    name: 'todo',
    initialState: { data: [{ id: 0, name: 'ewrew', status: true, img: 'ewrew' }] as Todo[] },
    reducers: {
        addTodo: (state, action) => {
            state.data.push({
                id: Date.now(),
                name: action.payload.name,
                img: action.payload.img,
                status: false
            });
        },
        deleteTodo: (state, action) => {
            state.data = state.data.filter(t => t.id !== action.payload);
        },
        toggleStatus: (state, action) => {
            const todo = state.data.find(t => t.id === action.payload);
            if (todo) todo.status = !todo.status;
        },
        updateTodo: (state, action) => {
            const index = state.data.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.data[index] = action.payload;
        }
    }
});

export const { addTodo, deleteTodo, toggleStatus, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;