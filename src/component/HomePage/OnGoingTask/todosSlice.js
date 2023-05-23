import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
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
            state.push({
                ...action.payload,
                status: 'pending'
            })
        },
        updateTodos: (state, action) => {
            let todo = state.find(todo => todo.id == action.payload.id)
            todo.status = todo.status === 'success' ? 'pending' :  todo.status === 'pending' ? 'on task' : 'success'
        },
        deleteTodos: (state, action) => {
            let todo = state.find(todo => todo.id == action.payload.id)
            state.remove(todo)
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getTodosThunk.fulfilled, (state, action) => {
            return(
                [
                ...action.payload
            ]
            )
        })

        builder.addCase(addTodosThunk.fulfilled, (state, action) => {
            console.log(action)
            return(
                [
                    ...state,
                    action.payload
                ]
            )
        })

        builder.addCase(updateTodoStatusThunk.fulfilled, (state, action) => {
            let todo = state.find(todo => todo.id === action.payload.id)
            console.log(todo)
            todo.status = todo.status === 'success' ? 'pending' :  todo.status === 'pending' ? 'on task' : 'success'
        })

    }
})

export const getTodosThunk = createAsyncThunk('todos/getTodosThunk', async() => {
    const data = await fetch('https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/Todos',{
        method:'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const result = data.json()
    return result
})

export const addTodosThunk = createAsyncThunk('todos/addTodosThunk', async(todo) => {
    const data = await fetch('https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/Todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...todo,
            status: 'pending'
        })
    })
    return data.json()
})

export const updateTodoStatusThunk = createAsyncThunk('todos/updateTodoStatusThunk', async({id, status}) => {
    console.log({id, status})
    const data = await fetch(`https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/Todos/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: status
        })
        }
    )
    return data.json()
})

export const TodosSelector = (state) => state.todos
export const { addTodos, updateTodos } = todosSlice.actions
export default todosSlice.reducer