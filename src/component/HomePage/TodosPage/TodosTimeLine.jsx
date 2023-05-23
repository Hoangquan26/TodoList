import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodos, updateTodoStatusThunk } from '../OnGoingTask/todosSlice';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
const TodosTimeLine = ({todos}) => {
    const [timeArray, setTimeArray] = useState([])
    const dispatch = useDispatch()
    useMemo(() => {
        let hours = 0, minutes = 0
        let cloneArray = []
        while(hours != 24 || minutes != 0) {
            const todo = todos.find(item => new Date(item.time).getHours() === hours && new Date(item.time).getMinutes() < (minutes === 30 ? 60 : 30)&& new Date(item.time).getMinutes() < (minutes === 30 ? 60 : 30) && new Date(item.time).getMinutes() >= (minutes === 30 ? 30 : 0))
            cloneArray.push({
                todo: todo,
                time: `${Math.floor(hours/10) == 0 ? '0' :''}${minutes == 30 ? hours++ : hours}:${minutes == 0 ? '00' :minutes}`
            })
            minutes == 30 ? minutes = 0 : minutes = 30
        }
        setTimeArray(cloneArray)
    }, [todos])
    return (
        <div className=' h-[40rem] overflow-scroll ml-2 flex flex-col mt-4 pt-8 relative after:absolute after:top-4 after:h-[2px] after:w-full after:rounded-full after:left-[5rem] before:absolute before:left-[4.75rem]  before:top-[0.75rem] before:h-3 before:w-3 before:rounded-full before:bg-yellow-500 after:bg-yellow-500'>
            {
                timeArray.map((value, index) => {
                    return(
                    <div key={index} className=' flex m-2 text-sm font-medium min-h-[2.5rem] items-center'>
                        <div className= 'w-10'><p className=' text-gray-500'>{value.time}</p></div>
                        <div className=' ml-6'>
                        {value.todo ? 
                        <div onClick={() => {
                                dispatch(updateTodoStatusThunk({
                                    id: value.todo.id,
                                    status: value.todo.status === 'success' ? 'pending' :  value.todo.status === 'pending' ? 'on task' : 'success'
                                }))
                            }} className={` p-2 pr-6 text-sm text-white rounded-3xl flex items-center justify-center ${value.todo.status == 'success' ? ' bg-emerald-500' : value.todo.status == 'pending' ? 'bg-blue-300' : ' bg-rose-500'}`}>
                            <div className=' mr-2 rounded-full bg-white h-6 w-6 text-black'>
                            {value.todo.status == 'success' ? <DoneRoundedIcon className=' text-emerald-500'></DoneRoundedIcon> :
                             value.todo.status == 'pending' ? <PlayArrowRoundedIcon className=' text-blue-300'></PlayArrowRoundedIcon> : 
                             <TimelapseRoundedIcon className=' text-rose-500'></TimelapseRoundedIcon>}
                            </div>
                            <p>{value.todo.name}</p>
                        </div> : 
                        ''}
                        </div>
                    </div>
                    )
                })
            }
        </div>
    );
};

export default TodosTimeLine;