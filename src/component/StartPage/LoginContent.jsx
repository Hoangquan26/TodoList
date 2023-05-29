import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { freeUser, getUserThunk, listUserSelector, statusSelector, userLoginThunk } from '../userSlice';
import Spinner from '../Spinner/Spinner'
import StatusInfoPage from '../HomePage/StatusInfoPage/StatusInfoPage';
const initialState = {
    username: '',
    password: '',
    remember: false
}

const LoginContent = ({setTimeline}) => {
    const [account, setAccount] = useState(initialState)
    const status = useSelector(statusSelector)
    const dispatch = useDispatch()
    const style = {
        outline: 0,
        padding: '10px 5px',
        margin: '5px 0',
        borderBottom: '1px solid black'
    }
    useEffect(() => {
        let id
        if(status == 'success')
        {
            id = setTimeout(() => {
                setTimeline(4)
                dispatch(freeUser())
            }, 2000)
        }
        return () => clearTimeout(id)
    }, [status])
    if(status === 'loading'){
        return(
            <Spinner></Spinner>
        )
    }
    else if(status === 'success') {
        return(
            <StatusInfoPage status={'success'}>Success</StatusInfoPage>
        )
    }
    else if(status === 'failed') {
        return(
            <StatusInfoPage status={'failed'}>Failed</StatusInfoPage>
        )
    }
    return (
        <div className=' w-full'>
            <div className=' flex flex-col '>
                <h2 className=' text-2xl mb-10'>Login To Your Account</h2>
                <input
                style={style}
                value={account.username} onChange={e => {
                    setAccount({
                        ...account,
                        username: e.target.value
                    })
                }} placeholder='Username'></input>
                <input
                style={style}
                onChange={e => {
                    setAccount({
                        ...account,
                        password: e.target.value 
                    })
                }}
                placeholder='Password' type='password'></input>
                <FormControlLabel control={<Checkbox 
                onClick={e => {
                    setAccount(
                {...account,
                    remember : !account.remember
                })}
                }
                />} label="Remember me?" />
                <button
                onClick={() => {
                    dispatch(userLoginThunk(account))
                }}
                className=' p-4 text-lg text-white rounded-full bg-rose-500 mt-10 shadow-md shadow-slate-400'>Login</button>
                <div>
                <p className=' text-sx mt-5 ml-2'>You are'nt a member? <span onClick={() => {
                    setTimeline(2)
                }} className=' text-rose-500'>Register</span> </p>
                </div>
            </div>
        </div>
    );
};

export default LoginContent;