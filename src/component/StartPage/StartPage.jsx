import React, { useEffect, useReducer, useRef, useState } from 'react';
import { goHome } from '../pageSlice';
import { useDispatch } from 'react-redux';
import Carousel from './Carousel'
const StartPage = () => {
    const [animate, setAnimate] = useState(false)
    const dispatch = useDispatch()
    const handleStart = () => {
        setAnimate(true)
        let id = setTimeout(() => {
            dispatch(goHome())
            clearTimeout(id)
        }, 1000)
    }
    return (
        <div className={` ${animate ? 'animate-ping' : ''} fixed font-medium left-0 top-0 w-full h-full flex flex-col p-6 anime overflow-y-scroll`} style={{animationDuration: '1.2s'}}>
            <h4 className=' '>Taskoo</h4>
            <h2 className=' mt-14 mb-14 text-3xl font-bold'>Manage your work & every thing with <span className=' text-rose-500'>taskoo</span></h2>
            <Carousel></Carousel>
            <div className=' mt-4 mr-16'>
                <p className=' text-gray-600 font-normal text-justify'>When you're over whelmed by amount of work you have on your plate, stop and rethink</p>
            </div>
            <div className=' self-center mt-40'>
                <button onClick={handleStart} className=' transition-all hover:-translate-y-1 text-white rounded-full shadow-md shadow-slate-400 pr-10 pl-10 pt-4 pb-4 bg-rose-500'>Let's Start</button>
            </div>
        </div>
    );
};
export default StartPage