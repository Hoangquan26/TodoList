import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from './Header/Header';
import FilterArea from './FilterArea/FilterArea';
import anime from 'animejs/lib/anime.es.js';
import CategoriesArea from './CategoriesArea/CategoriesArea';
import OnGoingTask from './OnGoingTask/OnGoingTask';
import { useDispatch, useSelector } from 'react-redux';
import { goStart, pageSelector } from '../pageSlice';
import TodosPage from './TodosPage/TodosPage';
import { freeTodosSlice, getTodosThunk, TodosStatusSelector } from './OnGoingTask/todosSlice';
import { currentUserSelector } from '../userSlice';
import Spinner from '../Spinner/Spinner'
import TodoInfo from './TodosPage/TodoInfo';
import { createContext } from 'react'

export const todoInfoContext = createContext(null)
export const setTodoInfoContext = createContext(null)

const HomePage = () => {
    const [style, setStyle] = useState('opacity-0')
    const [todoInfo, setTodoInfo] = useState(null)
    const currentUSer = useSelector(currentUserSelector)
    const status = useSelector(TodosStatusSelector)
    const dispatch = useDispatch()
    const ref = useRef(null)
    const page = useSelector(pageSelector)
    useMemo(() => {
        if(status != 'idle')
            dispatch(freeTodosSlice())
    }, [status])
    useEffect(() => {
        if(!currentUSer) {
            dispatch(goStart())
        }
        if(status == 'idle') {
            dispatch(getTodosThunk(currentUSer.id))
        }
        anime({
            targets: ref.current,
            duration: 1000,
            keyframes: [
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                }
            ]
        })
        let id = setTimeout(() => {
            setStyle('opacity-1')
        }, 900)
        return () => clearTimeout(id)
    }, [])
    if(status === 'loading') {
        return(
            <Spinner></Spinner>
        )
    }
    return (
        <todoInfoContext.Provider value={todoInfo}>
            <setTodoInfoContext.Provider value={setTodoInfo}>
                <div ref={ref} className={` ${style} flex flex-col p-4 bg-slate-100 fixed overflow-y-scroll left-0 top-0 h-full w-full`}>
                    <Header></Header>
                    {
                    page === 'Home' ? 
                    <>
                    <FilterArea></FilterArea>
                    <CategoriesArea></CategoriesArea>
                    <OnGoingTask></OnGoingTask>
                    </>
                    :
                    page === 'TodoInfo' ?
                    <TodoInfo status={todoInfo.status} name={todoInfo.name} time={todoInfo.time} id={todoInfo.id}></TodoInfo>
                    :
                    <TodosPage></TodosPage>
                    }
                </div>
            </setTodoInfoContext.Provider>
        </todoInfoContext.Provider>
    );
};

export default HomePage