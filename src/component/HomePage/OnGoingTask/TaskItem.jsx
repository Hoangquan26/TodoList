import React, { useEffect, useState } from 'react';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';

const TaskItem = ({task}) => {
    let bgColor;
    if(task.status === 'success')
        bgColor = 'bg-emerald-500'
    else if(task.status === 'pending')
        bgColor = 'bg-blue-300'
    else 
        bgColor = 'bg-rose-500'
    return (
        <div className=' flex flex-col p-4 bg-white rounded-2xl mb-4'>
            <div className=' flex justify-between'>
                <h3 className=' text-lg font-medium'>{task.name}</h3>
                <span className={`${bgColor} text-white text-xs flex items-center justify-center pr-2 pl-2 w-16 rounded-3xl`}>{task.status}</span>
            </div>
            <div className=' flex items-center mt-4'>
                <AccessTimeFilledRoundedIcon sx={{fontSize: 18}} className=' text-rose-500'></AccessTimeFilledRoundedIcon>
                <p className=' ml-2 text-sm text-slate-500' style={{lineHeight: '14px'}}>{task.time}</p>
            </div>
        </div>
    );
};

export default TaskItem ;