import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'idle',
        error: '',
        user: [],
        currentUser: null
    },
    reducers: {
        freeUser: (state) => {
            return{
                ...state,
                status: 'idle'
            }
        },
        getCurrentUser : (state) => {
            let allCookie = decodeURIComponent(document.cookie).split(';')
            let userInfo = ''
            for(let i = 0; i < allCookie.length; i++) {
                let subString = ''
                if(allCookie[i].charAt(0) == ' ') {
                    subString = allCookie[i].substring(1)
                }
                if(subString.indexOf('user=') == 0) {
                    userInfo = subString.substring(5, allCookie[i].length)
                }
                console.log(userInfo)
            }
            return {
                ...state,
                status: 'idle',
                currentUser: userInfo != '' ?  JSON.parse(userInfo) : null
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(createUserThunk.pending, (state, action) => {
            return {
                ...state,
                status: 'loading'
            }
        })
        builder.addCase(createUserThunk.fulfilled, (state, action) => {
            return {
                ...state,
                status: 'success',
                user: [...state.user, action.payload]
            }
        })

        builder.addCase(getUserThunk.pending, (state) => {
            return {
                ...state,
                status: 'loading'
            }
        })

        builder.addCase(getUserThunk.fulfilled, (state, action) => {
            return {
                ...state,
                status: 'success',
                user: [
                    ...action.payload
                ]
            }
        })

        builder.addCase(userLoginThunk.pending, state => {
            return {
                ...state,
                status: 'loading'
            }
        })
        builder.addCase(userLoginThunk.fulfilled, (state, action) => {
            return {
                ...state,
                currentUser : action.payload.currentUser,
                status: action.payload.status ? 'success' : 'failed'
            }
        })


    }
})

export const getUserThunk = createAsyncThunk('user/getUserThunk', async () => {
    const res = await fetch('https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/User',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res.json()
})

export const createUserThunk = createAsyncThunk('user/createUserThunk', async user => {
    const res = await fetch('https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/User',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return res.json()
})

export const userLoginThunk = createAsyncThunk('user/userLoginThunk', async user => {
    const rs = await fetch('https://646c1ed87b42c06c3b2abd47.mockapi.io/TodoList/User',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(data => data.json())
    .then(data => {
        const target = data.find(item => item.username === user.username && item.password == user.password)
        let check = false
        if(target){
            check = true
            if(user.remember) {
                document.cookie = `user=${JSON.stringify(target)}; expires=Thu, ${new Date().setDate(new Date().getDate() + 14).toLocaleString()}`
            }
            else{
                sessionStorage.setItem('user', JSON.stringify(user))
            }
        }
        return {
            status: check,
            currentUser: target
        }
    })
    return rs
})
export const getUserName = (state) => state.user.user.map(item => item.username)
export const userSelector = (state) => state.user
export const statusSelector = (state) => state.user.status
export const listUserSelector = (state) => state.user.user
export const currentUserSelector = (state) => state.user.currentUser
export const { freeUser, getCurrentUser } = userSlice.actions
export default userSlice.reducer