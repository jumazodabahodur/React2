import { configureStore } from '@reduxjs/toolkit'
import TodoSlice from '../counter/todo' // Суроғаро санҷед, ки дуруст бошад

export const store = configureStore({
  reducer: {
    // Номро "todo" мондем, то дар useSelector истифода барем
    todo: TodoSlice,
  },
})

// Навъҳои (types) TypeScript барои истифода дар компонентҳо
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;