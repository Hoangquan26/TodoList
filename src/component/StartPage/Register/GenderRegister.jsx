import React from 'react';

const GenderRegister = ({account, setAccount}) => {
    return (
        <div className=' flex'>
            <div
            onClick={() => {
                setAccount({
                    ...account,
                    gender: 'male'
                })
            }}
            className={` w-1/2 rounded-3xl border-2 ${account.gender == 'male' ? 'border-rose-500 ' :' border-white'} p-4 transition-all`}>
                <img className=' w-full' src='../../../image/maleAvater.png'></img>
            </div>
            <div 
             onClick={() => {
                setAccount({
                    ...account,
                    gender: 'female'
                })
            }}
            className={` w-1/2 rounded-3xl border-2 ${account.gender == 'female' ? 'border-rose-500 ' :' border-white'} p-4 transition-all`}>
                <img className=' w-full' src='../../../image/famaleAvatar.jpeg'></img>
            </div>
        </div>
    );
};

export default GenderRegister;