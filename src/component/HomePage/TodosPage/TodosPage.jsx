import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {  TodosSelector } from '../OnGoingTask/todosSlice';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import TodosWeekArea from './TodosWeekArea';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import TodosTimeLine from './TodosTimeLine';
import AddForm from './AddTodoForm';
import { DatePicker, StaticDatePicker } from '@mui/x-date-pickers';
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

const TodosPage = () => {
    const [today, setToday] = useState(new Date())
    const [onCalender, setOnCalender] = useState(false)
    const [onAddForm, setOnAddForm] = useState(false)
    const dispatch = useDispatch()
    let value;
    useMemo(() => {
        value = dayjs(today)
    }, [today])
    const todos = useSelector(TodosSelector)
    let taskLeft = todos.filter(item => {
        const todosDate = new Date(item.time)
        if(todosDate.getDate() === today.getDate() && today.getMonth() === todosDate.getMonth())
            return true
        return false
    })
    let element
    if(onCalender) {
        return(
        <div className=' bg-white fixed top-0 left-0 h-full w-full flex items-center justify-center'>
            <div>
                <CloseRoundedIcon onClick={() => setOnCalender(false)} className=' ml-6 hover:text-rose-500'></CloseRoundedIcon>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                        <DemoItem>
                            <StaticDatePicker value={value} onChange={(newValue) => {
                                setToday(new Date(newValue))
                                setOnCalender(false)
                                }} />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>
            </div>
        </div>
        )
    }
    else if(onAddForm) {
        return(
            <AddForm setOnAddForm={setOnAddForm} today={today}></AddForm>
        )
    }
    else {
        return(
            <>
            <div className=' flex justify-between items-center'>
                <div className=' flex flex-col'>
                    <h3 className=' text-2xl font-medium'>{months[today.getMonth()]} {today.getDate()}</h3>
                    <span className=' mt-2 text-sm text-gray-500 font-medium'>{taskLeft.length} task today</span>
                </div>
                <div className=' flex'>
                    <div onClick={() => setOnAddForm(true)} className=' cursor-pointer ml-4 h-14 w-14 rounded-full bg-rose-500 flex items-center justify-center shadow-lg shadow-slate-400'>
                        <AddRoundedIcon className=' text-white'></AddRoundedIcon>
                    </div>
                    <div onClick={() => setOnCalender(true)} className=' cursor-pointer ml-4 h-14 w-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-slate-400'>
                        <CalendarMonthRoundedIcon className=' text-white'></CalendarMonthRoundedIcon>
                    </div>
                </div>
            </div>
            <TodosWeekArea setToday={setToday} today={today}>
            </TodosWeekArea>
            <TodosTimeLine todos={taskLeft}></TodosTimeLine>
            </> 
        )
    }
    return (
        element
    );
};

export default TodosPage;