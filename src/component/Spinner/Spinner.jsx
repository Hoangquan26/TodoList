import anime from 'animejs';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { statusSelector } from '../userSlice';
const Spinner = () => {
    const status = useSelector(statusSelector)
    const ref = useRef(null)
    useEffect(() => {
        let id 
        if(status != 'loading')
            setTimeout(() => {
                anime({
                    targets: ref.current,
                    opacity: 0
                })
            }, 1000)
        return () => clearTimeout(id)
    }, [status])
    return (
        <div ref={ref} className=' fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all'>
            <div className=' h-16 w-16 border-t-2 border-b-2 border-rose-500 animate-spin rounded-full'>

            </div>
        </div>
    );
};

export default Spinner;