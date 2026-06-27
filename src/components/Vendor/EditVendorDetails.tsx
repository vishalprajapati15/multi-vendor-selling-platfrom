'use client'
import axios from 'axios'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { AiOutlineFileText, AiOutlineHome, AiOutlineShop } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'

const EditVendorDetails = () => {

  const [shopName, setShopName] = useState("");
  const [shopAddress, setShopAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!shopName || !shopAddress || !gstNumber) {
      alert("All Fields are required!!");
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post("/api/vendor/edit-details", { shopName, shopAddress, gstNumber });
      console.log("Frontend api res of update shop details : ", res.data);
      alert("Shop Details updated successfully!!");
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      console.log("Frontend api res of update shop details error : ", error);
    }

  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6'>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/10'>
          <h3 className='text-2xl font-semibold text-center mb-4'>Complete Your Shop Details</h3>
          <p className='text-center text-gray-300 mb-6 text-sm'>Enter your business information to activate your vendor account.</p>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-6'>
            <div className='relative'>
              <AiOutlineShop size={24} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type="text"
                required
                className='w-full bg-white/10 border-white/30 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Shop Name'
                onChange={(e) => setShopName(e.target.value)}
                value={shopName}
              />
            </div>

            <div className='relative'>
              <AiOutlineHome size={24} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type="text"
                required
                className='w-full bg-white/10 border-white/30 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Shop Address'
                onChange={(e) => setShopAddress(e.target.value)}
                value={shopAddress}
              />
            </div>

            <div className='relative'>
              <AiOutlineFileText size={24} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                type="text"
                required
                className='w-full bg-white/10 border-white/30 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='GST NO'
                onChange={(e) => setGstNumber(e.target.value)}
                value={gstNumber}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="mt-4 px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex justify-center items-center gap-1 w-full cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.90 }}
            >
              {loading ? <ClipLoader size={22} color="white" /> : "Save"}
            </motion.button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default EditVendorDetails