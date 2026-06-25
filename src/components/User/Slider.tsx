"use client"
import { useEffect, useState } from 'react'
import slide1 from '@/assets/1.jpg';
import slide2 from '@/assets/2.jpg';
import slide3 from '@/assets/3.jpg';
import slide4 from '@/assets/4.jpg';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

const slide = [
    {
        image: slide1,
        title: "RUN ON THE AIR",
        subtitle: "DO IT NOW",
        description: "Running Shoes",
        button: "DISCOVER",
    },
    {
        image: slide2,
        title: "NEW ARRIVALS",
        subtitle: "TRENDING NOW",
        description: "Casual Sneakers",
        button: "SHOP NOW",
    },
    {
        image: slide3,
        title: "SPORTS COLLECTION",
        subtitle: "PERFORMANCE FIRST",
        description: "Training Shoes",
        button: "EXPLORE",
    },
    {
        image: slide4,
        title: "LIMITED EDITION",
        subtitle: "GRAB YOUR STYLE",
        description: "Premium Footwear",
        button: "BUY NOW",
    },
];

const Slider = () => {

    const [current, setCurrent] = useState(0)

    const slide = [
        {
            image: slide1,
            title: "RUN ON THE AIR",
            subtitle: "DO IT NOW",
            description: "Running Shoes",
            button: "DISCOVER",
        },
        {
            image: slide2,
            title: "NEW ARRIVALS",
            subtitle: "TRENDING NOW",
            description: "Casual Sneakers",
            button: "SHOP NOW",
        },
        {
            image: slide3,
            title: "SPORTS COLLECTION",
            subtitle: "PERFORMANCE FIRST",
            description: "Training Shoes",
            button: "EXPLORE",
        },
        {
            image: slide4,
            title: "LIMITED EDITION",
            subtitle: "GRAB YOUR STYLE",
            description: "Premium Footwear",
            button: "BUY NOW",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slide.length)
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className='relative w-full min-h-[90vh] mt-0 overflow-hidden rounded-2xl bg-black text-white md:mt-[60px] pt-0 top-0'>
            <AnimatePresence>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className='absolute inset-0 flex justify-center items-center'
                >
                    <Image src={slide[current].image} alt={slide[current].title}
                        className=' object-cover opacity-70' fill
                    />

                    <div className='absolute inset-0 flex flex-col items-start justify-center px-10 md:px-24 bg-gradient-to-r from-black/70 to-transparent'>
                        <motion.h3 className='text-sm md:text-base uppercase tracking-widest text-gray-300'
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {slide[current].subtitle}
                        </motion.h3>

                        <motion.h1 className='text-4xl md:text-6xl font-bold  mb-4'
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {slide[current].description}
                        </motion.h1>

                        <motion.p className='text-lg md:text-xl text-gray-300 mb-6'
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            {slide[current].title}
                        </motion.p>
                        <motion.button

                            className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-lg transition cursor-pointer'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {slide[current].button}
                        </motion.button>
                    </div>

                </motion.div>
            </AnimatePresence>

            <div className='absolute bottom-6 right-6 flex gap-4'>
                {
                    slide.map((sli, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.07 }}
                            onClick={() => setCurrent(index)}
                            className={`relative w-20 h-12 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${index === current ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-black" : "border-2 border-gray-500 hover:border-blue-400"}`}
                        >
                            <Image src={sli.image} alt='Slider Image' fill className='object-cover opacity-90' />
                        </motion.div>
                    ))
                }
            </div>

        </div>
    )
}

export default Slider