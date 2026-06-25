"use client"
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { RiArrowLeftDoubleLine } from "react-icons/ri";
import { RiArrowRightDoubleLine } from "react-icons/ri";


const CategorySlider = () => {
    const [startIndex, setStartIndex] = useState(0);

    const categories = [
        { label: "Fashion & Lifestyle", icon: "👗" },
        { label: "Electronics & Gadgets", icon: "📱" },
        { label: "Home & Living", icon: "🏠" },
        { label: "Beauty & Personal Care", icon: "💄" },
        { label: "Toys, Kids & Baby", icon: "🧸" },
        { label: "Food & Grocery", icon: "🛒" },
        { label: "Sports & Fitness", icon: "🏀" },
        { label: "Automotive Accessories", icon: "🚗" },
        { label: "Gifts & Handicrafts", icon: "🎁" },
        { label: "Books & Stationery", icon: "📚" },
        { label: "Footwear", icon: "👟" },
        { label: "Jewellery", icon: "💍" },
        { label: "Furniture", icon: "🛋️" },
        { label: "Mobile Accessories", icon: "🎧" },
        { label: "Pet Supplies", icon: "🐶" },
        { label: "Health & Wellness", icon: "💊" },
        { label: "Travel & Luggage", icon: "🧳" },
        { label: "Gaming", icon: "🎮" },
        { label: "Musical Instruments", icon: "🎸" },
        { label: "Office Supplies", icon: "🖨️" },
    ];

    const nextSlice = () => {
        setStartIndex((prev) => prev + 5 >= categories.length ? 0 : prev + 5)
    }

    const prevSlice = () => {
        setStartIndex((prev)=>  prev - 5 < 0 ? categories.length - 5 : prev - 5)
    }

    useEffect(()=>{
        const interval = setInterval(nextSlice, 5000);
        return ()=>clearInterval(interval)
    },[])

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full mx-auto p-8 text-center bg-gradient-to-br from-black via-gray-900 to-black relative"
        >
            <h2 className="text-4xl font-semibold mb-6 text-white">Shop by Categories </h2>
            <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={startIndex}
                        initial={{ opacity: 0, x: 120 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -120 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
                    >
                        {categories.slice(startIndex, startIndex + 5).map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.04 }}
                                className="bg-white/10 border border-white/20 p-6 rounded-xl cursor-pointer text-white"
                            >
                                <span className="text-5xl mb-8 block">{item.icon}</span>
                                <p className="text-sm font-medium">{item.label}</p>
                            </motion.div>

                        ))}
                    </motion.div>
                </AnimatePresence>
                <button 
                onClick={prevSlice}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800/60 text-white p-2 rounded-full border border-gray-500 cursor-pointer">
                    <RiArrowLeftDoubleLine />
                </button>
                <button 
                onClick={nextSlice}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800/60 text-white p-2 rounded-full border border-gray-500 cursor-pointer">
                    <RiArrowRightDoubleLine />
                </button>
            </div>
        </motion.div>
    )
}

export default CategorySlider