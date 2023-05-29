import React, { useEffect, useState } from 'react';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useDispatch } from 'react-redux';
import { freeUser } from '../../userSlice';
const StatusInfoPage = ({status, children}) => {
    const dispatch = useDispatch()
    if(status === 'failed'){
        useEffect(() => {
            let id = setTimeout(() => {
                dispatch(freeUser())
            }, 2000)
            return () => clearTimeout(id)
        })
    }
    return (
        <div className=' flex items-center flex-col'>
                <div className={` rounded-full p-4 border-2 ${status =='success' ? ' border-emerald-200': 'border-red-100'} animate-bounce`}>
                    {
                        status == 'success' ?
                        <DoneRoundedIcon className={` ${status =='success'? 'bg-emerald-400': 'bg-rose-500'} rounded-full p-6`} sx={{fontSize: 100, color: 'white'}}></DoneRoundedIcon> :
                        <CloseRoundedIcon className={` ${status =='success'? 'bg-emerald-400': 'bg-rose-500'} rounded-full p-6`} sx={{fontSize: 100, color: 'white'}}></CloseRoundedIcon>
                    }   
                </div>
                <div>
                    <h4 className=' text-center text-2xl text-slate-400 font-light'>{children}</h4>
                </div>
            </div>
    );
};

export default StatusInfoPage;