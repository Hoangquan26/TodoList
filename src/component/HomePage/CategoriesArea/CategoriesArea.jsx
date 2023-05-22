import React from 'react';
import CategoryCard from './CategoryCard';

const CategoriesArea = () => {
    return (
        <div className=' flex flex-col mt-10'>
            <h3 className=' text-2xl font-semibold'>Categories</h3>
            <div className=' flex mt-4'>
                <CategoryCard imgSrc={'../../../../image/pendingtask.png'}>Pending</CategoryCard>
                <CategoryCard imgSrc={'../../../../image/successtask.jpg'}>Success</CategoryCard>
            </div>
        </div>
    );
};

export default CategoriesArea;