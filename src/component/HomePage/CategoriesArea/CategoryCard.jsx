import React from 'react';

const CategoryCard = ({children, imgSrc}) => {
    return (
        <div className={` flex flex-col h-48 w-52 bg-white p-4 rounded-2xl ${children === "Success" ? "" : "mr-4"}  overflow-hidden`}>
            <h3 className=' font-medium text-lg'>{children}</h3>
            <span className=' text-slate-500'>10 Tasks</span>
            <img src={imgSrc}/>
        </div>
    );
};

export default CategoryCard;