import React from 'react';
import { useDispatch } from 'react-redux';
import { goHome, gOTodoInfo } from './../pageSlice'
const Welcome = ({timeline, setTimeline}) => {
    const dispatch = useDispatch()
    const handleStart = async () => {
        // setAnimate(true)
        // let id = setTimeout(() => {
        //     dispatch(goHome())
        //     clearTimeout(id)
        // }, 1000)
        if(timeline === 1) {
            const map = getMap()
            let node = map.get(10)
        }
        if(timeline < 4)
            setTimeline(timeline => timeline + 1)
        else {
            dispatch(goHome())
        }
    }
    return (
        <div>
            <div 
            className=' self-center mt-5'>
                <button onClick={handleStart} className={` transition-all hover:-translate-y-1 text-white rounded-full shadow-md shadow-slate-400 pr-10 pl-10 pt-4 pb-4 bg-rose-500`}>
                {timeline === 1 ? `Let's Start` : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Welcome;