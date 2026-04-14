import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://37.27.29.18:8001/api/to-dos";

export const getTodos = createAsyncThunk("getTodos", async () => {
    const res = await axios.get(API_URL);
    return Array.isArray(res.data) ? res.data : res.data.data || [];
});

// ИСЛОҲИ ADD: Сервер маҳз ҳамин 3 калидро бо ҳарфи КАЛОН талаб дорад
export const addTodo = createAsyncThunk("addTodo", async (text: string, { dispatch }) => {
    await axios.post(API_URL, { 
        Name: text,           // Бо ҳарфи КАЛОН
        Images: "string",     // Ин ҳам ҳатмист
        Description: "string" // Ин ҳам ҳатмист
    });
    dispatch(getTodos()); 
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (id: number, { dispatch }) => {
    await axios.delete(`${API_URL}?id=${id}`);
    dispatch(getTodos());
});

// ФУНКСИЯИ DELETE ALL
export const deleteAllTodos = createAsyncThunk("deleteAllTodos", async (todos: any[], { dispatch }) => {
    // Агар API-и махсус набошад, ҳамаро дар сикл нест мекунем
    const promises = todos.map(t => axios.delete(`${API_URL}?id=${t.id}`));
    await Promise.all(promises);
    dispatch(getTodos());
});

export const updateTodo = createAsyncThunk("updateTodo", async (todo: any, { dispatch }) => {
    await axios.put(`${API_URL}?id=${todo.id}`, {
        id: todo.id,
        Name: todo.name || todo.Name,
        isCompleted: todo.isCompleted,
        Images: "string",
        Description: "string"
    });
    dispatch(getTodos());
});

const todoSlice = createSlice({
    name: 'todo',
    initialState: { data: [] as any[] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTodos.fulfilled, (state, { payload }) => {
            state.data = payload;
        });
    }
});

export default todoSlice.reducer;