import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'page',
    initialState: 'Start',
    reducers: {
        goHome: (state, action) => {
            return 'Home'
        },
        goTodos: (state, action) => {
            return 'Todos'
        },
        gOTodoInfo: (state) => {
            return 'TodoInfo'
        }
    }
})
export const pageSelector = (state) => state.page
export const { goHome, goTodos, gOTodoInfo } = pageSlice.actions
export default pageSlice.reducer