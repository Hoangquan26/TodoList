
import Button from '@mui/material/Button';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statusSelector, createUserThunk, freeUser } from '../../userSlice';
import AccountRegister from './AccountRegister';
import GenderRegister from './GenderRegister';
import UserInfo from './UserInfo';
import StatusInfoPage from '../../HomePage/StatusInfoPage/StatusInfoPage';
import Spinner from '../../Spinner/Spinner';
const initialState = {
    username: '',
    password: '',
    gender: 'male',
    email: '',
    firstName: '',
    lastName: ''
}

const Register = ({setTimeline}) => {
    const [validate, setValidate] = useState(false)
    const [progress, setProgress] = useState(1)
    const [account, setAccount] = useState(initialState)
    const [createdUser, setCreatedUser] = useState(false)
    const dispatch = useDispatch()
    const createStatus = useSelector(statusSelector)
    useMemo(()=> {
        if(createStatus){
            if(createStatus == 'success' && createdUser)
            {
                let id = setTimeout(() => {
                    setTimeline(3)
                    dispatch(freeUser())
                }, 2000)
            }
        }
    }, [createStatus])
    useEffect(() => {
        return () => setCreatedUser(false)
    }, [])
    if(progress === 3) {
        if(createStatus == 'success') {
            return(
                <StatusInfoPage status={'success'}>Congratulation, your account has been created</StatusInfoPage>
            )
        }
        else if(createStatus == 'failed') {
            return(
                <StatusInfoPage status={'success'}>Something wrong, your account has'nt been created</StatusInfoPage>
            )
        }
        else if (createStatus == 'loading') {
            return (
                <Spinner></Spinner>
            )
        }
    }
    return (
        <div className=' flex flex-col w-full'>
            <h2 className=' text-2xl mb-10'>Welcome, let's create your account</h2>
            <div className='flex '>
            {
                progress === 1 ? 
                <UserInfo account={account} setAccount={setAccount} setValidate={setValidate}></UserInfo>
                :progress === 2 ?
                <AccountRegister account={account} setAccount={setAccount} setValidate={setValidate}></AccountRegister>
                :<GenderRegister account={account} setAccount={setAccount}></GenderRegister>
            }
            </div>
            
            <div className=' mt-6 flex justify-between'>
                {progress != 1 ?
                    <Button
                variant="outlined"
                onClick={e => {
                    if(progress > 1)
                        setProgress(progress => progress - 1)
                }}>Back</Button>
                :
                <div></div>
                }
               
                {progress < 3 
                ? <Button
                variant="outlined"
                disabled={!validate}
                onClick={e => {
                    if(progress < 3){
                        setProgress(progress => progress + 1)
                    }
                    if(progress < 2){
                        setValidate(false)
                    }
                }}>Continue</Button> 
                : 
                <Button
                variant="outlined"
                disabled={!validate}
                onClick={e => {
                    dispatch(
                        createUserThunk({
                            ...account,
                            id: nanoid()
                        })
                    )
                    setCreatedUser(true)
                }}>create</Button> 
                }
                
            </div>
            <div>
                <p className=' text-sx mt-5'>Already a member? <span onClick={() => {
                    setTimeline(3)
                }} className=' text-rose-500'>Login</span> </p>
            </div>
        </div>
    );
};

export default Register;