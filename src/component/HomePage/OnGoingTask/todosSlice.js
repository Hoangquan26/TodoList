import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
const todosSlice =  createSlice({
    name: 'loading',
    initialState: {
        status: 'idle',
        todos: []
    },
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
        },
        freeTodosSlice: (state) => {
            return {
                ...state,
                status: 'idle'
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodosThunk.pending, (state, action) => {
            return(
                {
                    ...state,
                    status: 'loading', 
                }
            )
        })
        builder.addCase(getTodosThunk.fulfilled, (state, action) => {
            return(
               {
                ...state,
                status: 'success',
                todos: [
                    ...action.payload
                ]    
            }
            )
        })


        builder.addCase(addTodosThunk.pending, (state) => {
            return(
                {
                 ...state,
                status: 'loading'
             }
             )
        })
        builder.addCase(addTodosThunk.fulfilled, (state, action) => {
            return(
                {
                 ...state,
                 status: 'success',
                 todos: [
                     ...state.todos,
                     action.payload
                 ]    
             }
             )
        })
        
        builder.addCase(updateTodoStatusThunk.pending, (state, action) => {
           return({
            ...state,
            status: 'loading'
           })
        })

        builder.addCase(updateTodoStatusThunk.fulfilled, (state, action) => {
            let index = state.todos.findIndex(item => item.id === action.payload.id)
            state.todos[index] = action.payload
        })

        builder.addCase(removeTodoThunk.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(removeTodoThunk.fulfilled, (state,action) => {
            let index = state.todos.findIndex(todo => todo.id == action.payload)
            console.log(index, action.payload)
            if(index != -1)
                return({
                    status: 'success',
                    todos: [
                        ...state.todos.slice(0, index),
                        ...state.todos.slice(index + 1)
                    ]
                })
        })
    }
})

export const getTodosThunk = createAsyncThunk('todos/getTodosThunk', async(userID) => {
    const data = await fetch(`https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/User/${userID}/Todos`,{
        method:'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    const result = data.json()
    return result
})

export const addTodosThunk = createAsyncThunk('todos/addTodosThunk', async(todo) => {
    const data = await fetch(`https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/User/${todo.userID}/Todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...todo
        })
    })
    return data.json()
})

export const updateTodoStatusThunk = createAsyncThunk('todos/updateTodoStatusThunk', async({id, status, userID}) => {
    const handleStatus = status == 'pending' ? 'on task' : status == 'on task' ? 'success' : 'success'
    const data = await fetch(`https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/User/${userID}/Todos/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            status: handleStatus,
        })
        }
    )
    return data.json()
})

export const removeTodoThunk = createAsyncThunk('todos/removeTodosThunk', async({id, userID}) => {
    const data = await fetch(`https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/User/${userID}/Todos/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        }
    )
    return id
})

export const TodosSelector = (state) => state.todos.todos
export const TodosStatusSelector = (state) => state.todos.status
export const { addTodos, updateTodos, freeTodosSlice } = todosSlice.actions
export default todosSlice.reducer