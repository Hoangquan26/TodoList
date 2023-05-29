import React from 'react';
import Carousel from './Carousel';

const StartContent = () => {
    return (
        <div>
            <><h2 className=' mt-14 mb-14 text-3xl font-bold'>Manage your work & every thing with <span className=' text-rose-500'>taskoo</span></h2>
                <Carousel></Carousel>
                <div className=' mt-4 mr-16'>
                    <p className=' text-gray-600 font-normal text-justify'>When you're over whelmed by amount of work you have on your plate, stop and rethink</p>
                </div></>
        </div>
    );
};

export default StartContent;