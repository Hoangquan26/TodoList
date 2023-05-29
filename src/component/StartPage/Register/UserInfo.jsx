import React, { useEffect, useMemo } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { freeUser, getUserThunk, statusSelector } from '../../userSlice';
const UserInfo = ({ account, setAccount, setValidate}) => {
    const dispatch = useDispatch()
    let status = useSelector(statusSelector)
    useMemo(() => {
        if(!account.lastName.length || !account.email.length || !account.firstName.length)
            setValidate(false)
        else{
            setValidate(true)
        }
    }, [account]) 
    useEffect(() => {
        if(status == 'idle')
        dispatch(getUserThunk())
    }, [])
    useEffect(() => {
        if(status ==='success' || status ==='error')
            dispatch(freeUser())
    }, [status])
    return (
        <div className=' flex flex-col '>
        <div className=' grid grid-cols-2 gap-4'>
            <TextField
            value={account.firstName}
            onChange={e => {
                setAccount({
                    ...account,
                    firstName: e.target.value
                })
            }} label="First Name" variant="standard" 
            className=' w-full'
            />
            <TextField
            value={account.lastName}
            onChange={e => {
                setAccount({
                    ...account,
                    lastName: e.target.value
                })
            }} label="Last Name" variant="standard" 
            className=' w-full'
            />
        </div>
        <div className=' mt-6'>
            <TextField  
            value={account.email}
            onChange={e => {
                setAccount({
                    ...account, 
                    email: e.target.value
                })
                }
            }
            className=' w-full' label="Email" variant="standard" />
        </div>
        </div>
    );
};

export default UserInfo;