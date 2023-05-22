import React, { useEffect, useRef, useState } from 'react';

const Carousel = () => {
    const [selectedImg, setSelectedImg] = useState(0)
    const ref = useRef(null)
    ref.current?.get(selectedImg).scrollIntoView({
        behavior: 'smooth', 
        block: 'nearest',
        inline: 'center'
    })
    const imageSrc = [        
        '../../../image/startpage1.jpg',
        '../../../image/startpage2.jpg',
        '../../../image/startpage3.jpg',
    ]
    const getMap = () => {
        if(!ref.current) {
            ref.current = new Map()
        }
        return ref.current;
    }
    const handleClick = (itemID) => {
        const map = getMap()
        const node = map.get(itemID)
        node.scrollIntoView({
            behavior: 'smooth', 
            block: 'nearest',
            inline: 'center'
        })
        setSelectedImg(itemID)
    }
    useEffect(() => {
        let id = null
        const map = getMap()
        id = setInterval(() => {
            setSelectedImg(selectedImg => selectedImg != 2 ? selectedImg + 1 : 0)
            map.get(selectedImg)?.scrollIntoView({
                behavior: 'smooth', 
                block: 'nearest',
                inline: 'center'
            })
        }, 3000)
        return () => clearInterval(id)
    }, [])
    return (
        <div className=' flex-col flex'>
            <div className=' flex overflow-hidden'>
                {
                    imageSrc.map((value, index) => {
                        return (
                        <img key={index} ref={(node => {
                            const map = getMap()
                            if(node) {
                                map.set(index, node)
                            }
                            else {
                                map.delete(index)
                            }
                        })} src={value} className=' rounded-2xl'></img>
                        )
                    })
                }
            </div>
            <div className=' flex mt-4 justify-center'>
                {
                    imageSrc.map((value, index) => {
                        return (
                        <div key={index} onClick={() => handleClick(index)} className={`  m-2 h-4 w-4 border-2 border-black rounded-full ${selectedImg === index ? 'bg-rose-500 ' : 'bg-white'} cursor-pointer`}></div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Carousel;