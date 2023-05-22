import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        id: 1,
        name: 'Home Work',
        time: new Date('2023-05-19T22:00:00').toLocaleString(),
        status: 'pending'
    },
    {
        id: 2,
        name: 'Play Game',
        time: new Date('2023-05-19T13:19:00').toLocaleString(),
        status: 'on task'
    },
    {
        id: 3,
        name: 'Shopping',
        time: new Date('2023-05-19T03:24:00').toLocaleString(),
        status: 'success'
    },
    
    {
        id: 4,
        name: 'Learn React',
        time: new Date('2023-05-19').toLocaleString(),
        status: 'pending'
    },
    {
        id: 5,
        name: 'Have A Trip',
        time: new Date('2023-05-18').toLocaleString(),
        status: 'pending'
    },
]

const todosSlice =  createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodos: (state, action) => {
            state.push(action.payload)
        },
        updateTodos: (state, action) => {
            let todo = state.find(todo => todo.id == action.payload.id)
            todo.status = todo.status === 'success' ? 'pending' :  todo.status === 'pending' ? 'on task' : 'success'
        }
    }
})

export const TodosSelector = (state) => state.todos
export const { addTodos, updateTodos } = todosSlice.actions
export default todosSlice.reducer