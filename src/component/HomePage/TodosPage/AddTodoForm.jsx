import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux'
import { addTodos, addTodosThunk, TodosSelector } from '../OnGoingTask/todosSlice';
import { nanoid } from '@reduxjs/toolkit';
const AddTodosForm = ({setOnAddForm, today}) => {
    const todos = useSelector(TodosSelector)
    console.log(todos)
    const [text, setText] = useState('')
    const [timePicker, setTimePicker] = useState(today)
    const [nameAlert, setNameAlert] = useState(false)
    const [timeAlert, setTimeAlert] = useState(
        todos.some(todo => new Date(todo.time).getDate() === timePicker.getDate() && new Date(todo.time).getHours() === timePicker.getHours())
        ||timePicker.getTime() < new Date().getTime())
    const dispatch = useDispatch()
    console.log(timePicker)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!text){
            setNameAlert(true)
            return
        }
        if(timeAlert)
            return
        dispatch(addTodosThunk({
            id: nanoid(),
            name: text,
            time: timePicker.toLocaleString()
        }))
        setOnAddForm(false)
    }

    const handleChangeTime = e => {
        if(todos.some(todo => new Date(todo.time).getDate() === e.$d.getDate() && new Date(todo.time).getHours() === e.$d.getHours())){
            setTimeAlert(true)
            return
        }
        else {
            setTimeAlert(false)
        }
        setTimePicker(e.$d)
    }
    return(
        <div className=' bg-white fixed top-0 left-0 h-full w-full flex items-center justify-center p-6'> 
            <form onSubmit={(e) => {
                handleSubmit(e)
            }} className=' flex flex-col w-full'>
                <div className=' flex items-center justify-between mb-10'>
                    <CloseRoundedIcon onClick={() => setOnAddForm(false)} className=' hover:text-rose-500'></CloseRoundedIcon>
                    <span>Add new task:</span>
                </div>
                <label className={`${nameAlert ? 'text-rose-500' : ' text-black '} transition-all text-sm `}>Name: </label>
                <input onFocus={() => {
                    setNameAlert(false)
                }} onChange={(e) => setText(e.target.value)} className={` outline-none transition-all border-b-2 p-2 mb-4 ${nameAlert ? 'border-rose-500' : ' border-black '}`} value={text}></input>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                        components={[
                        'TimePicker'
                        ]}
                    >
                        <DemoItem label="Time:">
                            <TimePicker onChange={e => handleChangeTime(e)} defaultValue={dayjs(today)} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
                    <span className={`${timeAlert ? 'text-rose-500': ' '} mt-2 text-sm`}>{timeAlert ? 'You had a work in this time or your time is not accepted !' : ''}</span>
                <button className=' p-4 rounded-xl bg-rose-500 text-white mt-6'>Confirm</button>
            </form>
        </div>
    )
};

export default AddTodosForm;