import { createSlice } from "@reduxjs/toolkit";
let initialState =
{
    priority: 'All'
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers : {
        setFilter: (state, action) => {
            return {
                ...state
            }
        }
    }
})

export const filterSelector = (state) => state.filter
export const { setFilter } = filterSlice.actions
export default filterSlice.reducer