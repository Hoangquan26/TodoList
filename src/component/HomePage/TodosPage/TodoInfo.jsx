import React, { useEffect, useMemo, useState } from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { freeTodosSlice, removeTodoThunk, TodosStatusSelector, updateTodoStatusThunk } from '../OnGoingTask/todosSlice';
import { currentUserSelector } from '../../userSlice';
import Spinner from '../../Spinner/Spinner';
import { TextField } from '@mui/material';
import { goTodos } from '../../pageSlice';
const TodoInfo = ({status, name, time, id}) => {
    const [btnStatus, setBtnStatus] = useState(status == 'pending' ? 'Do it' : status == 'on task' ? 'Finish' : 'Success')
    const [timelineOutline, setTimelineOutline] = useState({
        pending: 'grey',
        doing: 'grey',
        success: 'grey'
    })
    const user = useSelector(currentUserSelector)
    const todoStatus = useSelector(TodosStatusSelector)
    const dispatch = useDispatch()
    useMemo(() => {
        if(status == 'pending')
            setTimelineOutline({
                doing: 'grey',
                success: 'grey',
                pending: 'primary'
            })
        else if (status == 'on task') {
            setTimelineOutline({
                doing: 'primary',
                success: 'grey',
                pending: 'grey'
            })
        }
        else {
            setTimelineOutline({
                doing: 'grey',
                pending: 'grey',
                success: 'success'
            })
        }
    }, [status])
    useEffect(() => {
        let id
        if(todoStatus == 'success') {
            id = setTimeout(() => {
                dispatch(freeTodosSlice())
            }, 1000)
        }
        return() => clearTimeout(id)
    })
    if(todoStatus == 'loading') {
        return (
            <Spinner></Spinner>
        )
    }
    const handleStatusBtn = () => {
        dispatch(updateTodoStatusThunk({
            id: id,
            status: status,
            userID: user.id
        }))
        console.log('updated')
    }
    const myBtn = status != 'success' ? 
    <>
        <Button variant="contained">Delay 30 minutes</Button>
        <Button onClick={handleStatusBtn} variant="contained">{btnStatus}</Button>
    </>
     :
    <>
        <Button disabled variant="contained">Delay 30 minutes</Button>
        <Button disabled variant="contained">{btnStatus}</Button>        
    </>
    
    return (
        <>
        <div className=' mt-10 flex flex-col p-4 bg-white rounded-lg shadow-sm shadow-slate-400 '>
            <div className=' flex items-center mt-5 justify-center mb-10 flex-col'>
                <span className=' text-rose-500 font-bold text-2xl flex items-center'>{name}</span>
                <span className=' text-sm text-slate-800'>{time}</span>
            </div>
            <div className=' flex flex-col'>
            <h4 className=' self-center text-lg font-semibold text-gray-600'>Task Timeline</h4>
                <Timeline position="alternate" >
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot variant="outlined" color={timelineOutline.pending} >
                            <PlayArrowRoundedIcon className={`${status == 'pending' ? 'text-blue-300' : ' text-gray-400'} `}></PlayArrowRoundedIcon>
                        </TimelineDot>
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Pending</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot variant="outlined" color={timelineOutline.doing}>
                            <TimelapseRoundedIcon className={`${status == 'on task' ? 'text-blue-500' : 'text-gray-400'} `}></TimelapseRoundedIcon>
                        </TimelineDot>
                        <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>Doing</TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot variant="outlined" color={timelineOutline.success} >
                            <DoneRoundedIcon className={`${status == 'success' ? 'text-emerald-800' : 'text-gray-00'} `}></DoneRoundedIcon>
                        </TimelineDot>
                        </TimelineSeparator>
                        <TimelineContent>Success</TimelineContent>
                    </TimelineItem>
                </Timeline>
            </div>
            <div className=' flex flex-col mt-4 pb-4'>
                <div className=' grid grid-cols-2 gap-2'>
                    {myBtn}
                </div>
                <div className=' grid grid-cols-1 mt-2'>
                    <Button onClick={() => {
                        dispatch(removeTodoThunk({
                            id: id,
                            userID: user.id
                        }))
                        dispatch(goTodos())
                    }} variant="contained">Remove task</Button>
                </div>
            </div>
        </div>
        </>
    );
};

export default TodoInfo;