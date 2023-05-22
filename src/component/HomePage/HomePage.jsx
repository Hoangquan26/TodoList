import React, { useEffect, useRef, useState } from 'react';
import Header from './Header/Header';
import FilterArea from './FilterArea/FilterArea';
import anime from 'animejs/lib/anime.es.js';
import CategoriesArea from './CategoriesArea/CategoriesArea';
import OnGoingTask from './OnGoingTask/OnGoingTask';
import { useDispatch, useSelector } from 'react-redux';
import { pageSelector } from '../pageSlice';
import TodosPage from './TodosPage/TodosPage';
const HomePage = () => {
    const [style, setStyle] = useState('opacity-0')
    const dispatch = useDispatch()
    const ref = useRef(null)
    const page = useSelector(pageSelector)
    useEffect(() => {
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
    return (
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
            <TodosPage></TodosPage>
            }
        </div>
    );
};

export default HomePage