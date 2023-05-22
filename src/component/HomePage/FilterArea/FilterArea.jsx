import React from 'react';
import SearchBox from './SearchBox';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
const FilterArea = () => {
    return (
        <div className=' flex justify-between mt-6 items-center'>
            <SearchBox></SearchBox>
            <div className=' ml-4 h-14 w-14 rounded-full bg-rose-500 flex items-center justify-center shadow-lg shadow-slate-400'>
                <TuneRoundedIcon className=' text-white'></TuneRoundedIcon>
            </div>
        </div>
    );
};

export default FilterArea;