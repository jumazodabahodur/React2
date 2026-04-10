import { create } from 'zustand'
import axios from 'axios'

const API = "http://37.27.29.18:8001/api/to-dos"

export const useCount = create((set, get: any) => ({
  data: [],

  // 1. GET ALL
  getData: async () => {
    const { data } = await axios.get(API)
    set({ data: data.data || data })
  },

  // 2. POST (Create)
  addData: async (fd: FormData) => {
    await axios.post(API, fd)
    get().getData()
  },

  // 3. DELETE (Task)
  deleteData: async (id: number) => {
    await axios.delete(`${API}?id=${id}`)
    get().getData()
  },

  // 4. PUT (Edit Name/Desc)
  updateTodo: async (id: number, obj: any) => {
    await axios.put(`${API}?id=${id}`, obj)
    get().getData()
  },

  // 5. GET BY ID
  getById: async (id: number) => {
    const { data } = await axios.get(`${API}/${id}`)
    return data
  },

  // 6. POST IMAGE
  addImage: async (id: number, file: File) => {
    const fd = new FormData()
    fd.append("image", file)
    await axios.post(`${API}/${id}/images`, fd)
    get().getData()
  },

  // 7. DELETE IMAGE
  deleteImage: async (imgId: number) => {
    await axios.delete(`${API}/images/${imgId}`)
    get().getData()
  },

  // 8. PUT (Checkbox Status)
  toggleComplete: async (id: number) => {
    await axios.put(`http://37.27.29.18:8001/completed?id=${id}`)
    get().getData()
  }
}))