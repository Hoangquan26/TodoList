import React from 'react';
import TaskItem from './TaskItem';
import { TodosSelector } from './todosSlice';
import { useSelector } from 'react-redux'
import { goTodos } from '../../pageSlice';
import { useDispatch } from 'react-redux';
const OnGoingTask = () => {
    const dispatch = useDispatch()
    const taskList = useSelector(TodosSelector)
    return (
        <div className=' flex flex-col mt-10'>
            <div className=' flex justify-between items-center'>
                <h3 className=' text-2xl font-semibold'>My Task</h3>
                <span onClick={() => {
                    dispatch(goTodos())
                }} className=' text-sm text-rose-500 cursor-pointer fon'>See all</span>
            </div>
            <div className=' mt-6'>
                {
                    taskList.slice(0,3).map((value, index) => {
                        return (
                            <TaskItem key={value.id} task={value}></TaskItem>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default OnGoingTask;