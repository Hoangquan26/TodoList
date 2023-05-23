import { configureStore } from '@reduxjs/toolkit'
import filterSlice from '../component/HomePage/FilterArea/filterSlice'
import todosSlice from '../component/HomePage/OnGoingTask/todosSlice'
import pageSlice from '../component/pageSlice'
export const store = configureStore({
    reducer : {
        filter: filterSlice,
        todos: todosSlice,
        page: pageSlice,
    }
})