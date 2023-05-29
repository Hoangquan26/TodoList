import { TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { freeUser, getUserName, getUserThunk, statusSelector } from '../../userSlice';

const AccountRegister = ({account, setAccount, setValidate}) => {
    const [confirmPassword, setConfirmPassword] = useState('')
    const username = useSelector(getUserName)
    console.log(username)
    let matchPassword = true
    let usernameHelperText = username.includes(account.username) ? 'This username has been used' : ''
    useMemo(() => {
        if(!account.username.length || !account.password.length || !confirmPassword.length) {
            setValidate(false)
        }
        else if(account.password != confirmPassword)
        {
            matchPassword = false
            setValidate(false)
        }
        else if (username.includes(account.username) ) {
            setValidate(false)
        }
        else{
            setValidate(true)
        }
    }, [account, confirmPassword])
    return (
        <div className=' flex flex-col w-full'>
            <div className=' mt-5'>
                <TextField  
                value={account.username}
                onChange ={
                    e => {
                        setAccount({
                            ...account,
                            username: e.target.value
                        })
                    }
                }
                helperText={`${usernameHelperText}`}
                className=' w-full' label="Username" variant="standard" />
            </div>
            <div className=' mt-5'>
                <TextField  
                value={account.password}
                onChange ={
                    e => {
                        setAccount({
                            ...account,
                            password: e.target.value
                        })
                    }
                }
                className=' w-full' type={'password'} label="Password" variant="standard" />
            </div>
            <div className=' mt-5'>
                <TextField  
                value={confirmPassword}
                disabled={!account.password.length}
                onChange ={
                    e => {
                        setConfirmPassword(e.target.value)
                    }
                }
                helperText={`${matchPassword ? '' : 'Password does\'nt match'}`}
                className=' w-full' type={'password'} label="Confirm password" variant="standard" />
            </div>
        </div>
    );
};

export default AccountRegister;