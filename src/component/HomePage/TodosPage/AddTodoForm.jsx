import React, { useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LocalizationProvider, StaticTimePicker, TimePicker } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const AddTodosForm = ({setOnAddForm, today}) => {
    console.log(today)
    const [text, setText] = useState('')
        return(
            <div className=' bg-white fixed top-0 left-0 h-full w-full flex items-center justify-center'> 
                <div className=' flex flex-col'>
                    <div className=' flex items-center justify-between mb-10'>
                        <CloseRoundedIcon onClick={() => setOnAddForm(false)} className=' hover:text-rose-500'></CloseRoundedIcon>
                        <span>Add new task:</span>
                    </div>
                    <label className=' text-sm'>Name: </label>
                    <input onChange={(e) => setText(e.target.value)} className=' outline-none border-b-2 p-2 border-black mb-4' value={text}></input>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={[
                            'TimePicker'
                            ]}
                        >
                            <DemoItem label="Time:">
                                <TimePicker defaultValue={dayjs(today)} />
                            </DemoItem>
                        </DemoContainer>
                    </LocalizationProvider>
                </div>
            </div>
        )
};

export default AddTodosForm;