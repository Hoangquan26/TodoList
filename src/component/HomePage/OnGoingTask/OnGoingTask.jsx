import React from 'react';
import TaskItem from './TaskItem';
import { TodosSelector, TodosStatusSelector } from './todosSlice';
import { useSelector } from 'react-redux'
import { goTodos } from '../../pageSlice';
import { useDispatch } from 'react-redux';
import { Skeleton } from '@mui/material';
const OnGoingTask = () => {
    const dispatch = useDispatch()
    let taskList =  useSelector(TodosSelector)
    let todosStatus = useSelector(TodosStatusSelector)
    const taskListElement = todosStatus == 'loading' ?
    Array(3).fill(0).map((value, index) => {
        return(
            <div key={index} className=' flex flex-col p-4 bg-white rounded-2xl mb-4'>
                <div className=' flex justify-between items-center'>
                    <Skeleton variant='rounded' width={100} height={30}></Skeleton>
                    <Skeleton variant='rounded' width={120} height={20}></Skeleton>
                </div>
                <div className=' flex mt-2 items-center'>
                    <Skeleton className=' mr-2 rounded-full' variant=' circular' width={20} height={20}></Skeleton>
                    <Skeleton variant=' rounded ' width={100} height={15}></Skeleton>
                </div>
            </div>
        )
    })
    :
    taskList.slice(0,3).map((value, index) => {
        return (
            <TaskItem key={value.id} task={value}></TaskItem>
        )
    })
    return (
        <div className=' flex flex-col mt-10'>
            <div className=' flex justify-between items-center'>
                <h3 className=' text-2xl font-semibold'>My Task</h3>
                <span onClick={() => {
                    dispatch(goTodos())
                }} className=' text-sm text-rose-500 cursor-pointer '>See all</span>
            </div>
            <div className=' mt-6'>
                {
                    taskListElement
                }
            </div>
        </div>
    );
};

export default OnGoingTask;