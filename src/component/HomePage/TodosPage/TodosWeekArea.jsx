import React, { useMemo, useState } from 'react';
const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]
const TodosWeekArea = ({today, setToday}) => {
    const [currentWeek, setCurrentWeek] = useState([])
    useMemo(() => {
        const currentday = today.getDay()
        let copytoday = new Date(today)
        let startWeek = new Date(copytoday.setDate(copytoday.getDate() - currentday))
        let copyWeek = new Date(startWeek)
        let endWeek = new Date(copyWeek.setDate(copyWeek.getDate() + 7))
        let array = []
        while(startWeek.getTime() !== endWeek.getTime()){
            const startWeekClone = new Date(startWeek)
            array.push(
                <div key={startWeek.getDay()} 
            onClick={() => {setToday(startWeekClone)}}
            className={` flex flex-col rounded-3xl pt-4 pb-4 items-center ${startWeek.getDay() === currentday ? 'bg-rose-500 shadow-lg shadow-rose-400 text-white' : 'text-gray-500'}`}>
                <h4 className=' text-lg  font-medium'>{startWeek.getDate()}</h4>
                <p className=' text-xs '>{day[startWeek.getDay()].slice(0,3)}</p>
                <div className={` mt-2 h-2 w-2 rounded-full ${startWeek.getDay() === currentday ? 'bg-white' : ''}`}></div>
            </div>)
            startWeek.setDate(startWeek.getDate() + 1)
        }
        setCurrentWeek(array)
    }, [today])
    return (
        <div className=' grid grid-cols-7 mt-6'>
            {
                currentWeek.map((value, index)=> {
                    return value
                })
            }
        </div>
    );
};

export default TodosWeekArea;