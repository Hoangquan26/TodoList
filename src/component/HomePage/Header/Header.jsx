import React from 'react';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useDispatch, useSelector } from 'react-redux';
import { goHome, goTodos, pageSelector } from '../../pageSlice';
import { currentUserSelector } from '../../userSlice';
const Header = () => {
    const dispatch = useDispatch()
    const page = useSelector(pageSelector)
    const user = useSelector(currentUserSelector)
    const afterSetup = page === 'Home'?
        <div className=' flex flex-col'>
            <h2 className=' text-xl font-semibold'>Hi {user.firstName +" "+ user.lastName ?? 'Guest'}!</h2>
            <span className=' text-rose-500 font-medium'>10 task is pending</span>
        </div>:
        <>
            <ArrowBackIosRoundedIcon onClick={
                page == 'Todos' ? () => {dispatch(goHome())} : () => {dispatch(goTodos())}
            }></ArrowBackIosRoundedIcon>
            <h2 className=' text-xl font-medium text-slate-900'>My Task</h2>
        </>
        
    return (
        <div className=' flex justify-between items-center'>
            {afterSetup}
            <div className=' rounded-full p-2 bg-white flex items-center justify-center'>
                <img src={`${user.gender == 'male' ? '../../../../image/maleAvater.png' : '../../../../image/famaleAvatar.jpeg'}`} className=' h-12 w-12 rounded-full object-cover object-center'></img>
            </div>
        </div>
    );
};

export default Header;