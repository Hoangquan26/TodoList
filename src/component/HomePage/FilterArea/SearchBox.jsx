import React, { useState } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
const SearchBox = () => {
    const [text, setText] = useState('')
    return (
        <div className=' p-4 bg-white flex text-slate-300 rounded-full grow'>
            <SearchRoundedIcon sx={{fontSize: 26,
                fontWeight: 100,
                marginRight: 1
            }}></SearchRoundedIcon>
            <input placeholder=' Search' className=' outline-none' value={text} onChange={e => setText(e.target.value)}></input>
        </div>
    );
};

export default SearchBox;