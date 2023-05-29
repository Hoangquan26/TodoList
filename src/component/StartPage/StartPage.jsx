import React, { useEffect, useMemo, useRef, useState } from 'react';
import { goHome } from '../pageSlice';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import StartContent from './StartContent';
import LoginContent from './LoginContent';
import Register from './Register/Register';
import { currentUserSelector } from '../userSlice';
import Welcome from './Welcome';
const timelineStatus = [
    {
        id: 1,
        component: <div className=' rounded-full  flex items-center justify-center m-2'>
        <div className=' h-12 w-12 bg-rose-500 rounded-full flex items-center justify-center'>
            <PlayArrowRoundedIcon className=' text-white'></PlayArrowRoundedIcon>
        </div>
        </div>
    },
    {
        id: 2,
        component: <div className=' rounded-full flex items-center justify-center m-2'>
        <div className=' h-12 w-12 bg-rose-500 rounded-full flex items-center justify-center'>
            <PersonAddAltRoundedIcon className=' text-white'></PersonAddAltRoundedIcon>
        </div>
        </div>
    },
    {
        id: 3,
        component: <div className=' rounded-full flex items-center justify-center m-2'>
        <div className=' h-12 w-12 bg-rose-500 rounded-full flex items-center justify-center'>
            <PersonAddAltRoundedIcon className=' text-white'></PersonAddAltRoundedIcon>
        </div>
        </div>
    },
    {
        id: 4,
        component: <div className=' rounded-full flex items-center justify-center m-2'>
        <div className=' h-12 w-12 bg-rose-500 rounded-full flex items-center justify-center'>
            <DoneRoundedIcon className=' text-white'></DoneRoundedIcon>
        </div>
        </div>
    }
]

const StartPage = () => {
    const [timeline, setTimeline] = useState(1)
    const currentUser = useSelector(currentUserSelector)
    useEffect(() => {
        if(currentUser != null)
            setTimeline(4)
    }, [currentUser])
    const dispatch = useDispatch()
    const ref = useRef(null)
    const getMap = () => {
        if(!ref.current){
            ref.current = new Map()
        }
        return ref.current
    }


    useEffect(() => {
        const map = getMap()
        const item = map.get(timeline)
        item.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        })
    })

    let contentComponent = null
    useMemo(() => {
        switch(timeline) {
            case 1 :
                contentComponent = 
                <StartContent></StartContent>
                break;
            case 2 :
                contentComponent = 
                <Register setTimeline={setTimeline}></Register>
                break;
            case 3 :
                contentComponent = 
                <LoginContent setTimeline={setTimeline}></LoginContent>
                break;
            case 4 : 
                contentComponent = 
                <Welcome timeline={timeline} setTimeline={setTimeline}></Welcome>
                break;
    
        }
    }, [timeline])

    return (
        <div className={` fixed font-medium left-0 top-0 w-full h-full flex flex-col p-6`}>
            <h4 className=' '>Taskoo</h4>
            <div className=' min-h-[580px] flex items-center justify-center'>
            {contentComponent}
            </div>
            <div 
            className=' mt-5 self-center flex items-center overflow-hidden w-[58px] h-[58px]  p-[4px] border-[1px] border-gray-300 rounded-full'>
                {
                    timelineStatus.map((value) => (
                        <div
                        className=' basis-full h-[56px] flex items-center justify-center w-[58px]'
                        ref={node => {
                            const map = getMap()
                            if(node) {
                                map.set(value.id, node)
                            }
                            else{
                                map.delete(value.id)
                            }
                        }} key={value.id}>{value.component}</div>
                    ))
                }
            </div>
            

            {timeline == 1 ?
                <div className=' flex items-center mt-10 justify-center '>
                <div className=' mr-5 w-1/2'>
                    <button
                    onClick={() => {
                        setTimeline(3)
                    }}
                    className=' w-full font-light rounded-full p-2 pl-6 pr-6 border-[1px] text-rose-500 border-rose-500'>Sign in</button>
                </div>
                <div className=' w-1/2'>
                    <button 
                    onClick={() => {
                        setTimeline(2)
                    }}
                    className=' w-full font-light rounded-full p-2 pl-6 pr-6 bg-rose-500 text-white border-[1px] border-rose-500'>Register</button>
                </div>
            </div> 
             : ''}

        </div>
    );
};
export default StartPage