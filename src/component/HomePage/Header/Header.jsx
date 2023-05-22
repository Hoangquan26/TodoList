import React from 'react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useDispatch, useSelector } from 'react-redux';
import { goHome, pageSelector } from '../../pageSlice';
const Header = () => {
    const dispatch = useDispatch()
    const page = useSelector(pageSelector)
    const afterSetup = page === 'Home'?
        <div className=' flex flex-col'>
            <h2 className=' text-xl font-semibold'>Hi Guest!</h2>
            <span className=' text-rose-500 font-medium'>10 task is pending</span>
        </div>:
        <>
            <ArrowBackIosRoundedIcon onClick={
                () => {dispatch(goHome())}
            }></ArrowBackIosRoundedIcon>
            <h2 className=' text-xl font-medium text-slate-900'>My Task</h2>
        </>
        
    return (
        <div className=' flex justify-between items-center'>
            {afterSetup}
            <div className=' rounded-full p-2 bg-white flex items-center justify-center'>
                <img src='../../../../image/maleAvater.png' className=' h-12 w-12 rounded-full object-cover object-center'></img>
            </div>
        </div>
    );
};

export default Header;