"use client"
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { FaBox, FaShoppingBag } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import Orders from './VendorOrders'
import Products from './VendorProducts'
import Dashboard from './Dashboard'


const VendorDashBoard = () => {

  const [activePage, setActivePage] = useState("dashboard");
  const [openMenu, setOpenMenu] = useState(false);

  const menu = [
    { id: "dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
    { id: "orders", label: "User Orders", icon: <FaShoppingBag size={22} /> },
    { id: "product", label: "Product Approval", icon: <FaBox size={22} /> },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "orders": return <Orders />;
      case "product": return <Products />;
    }
  }

  return (
    <div className='w-full flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white'>

      {/* Mobile Tab bar */}
      <div className='lg:hidden fixed top-15 left-0 w-full bg-black px-6 py-3 flex justify-between items-center bg-black border-gray-700 z-50'>
        <h1 className='text-xl font-bold'>Vendor Panel</h1>
        {!openMenu && <button
          onClick={() => setOpenMenu(true)}
          className='cursor-pointer'
        >
          <AiOutlineMenu size={24} />
        </button>
        }
      </div>



      {/* Sidebar for large screen */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className='hidden lg:block w-72 bg-gray-800/40 border-r border-gray-700 p-6 mt-16 backdrop-blur-xl'
      >
        <h1 className='text-xl font-bold mb-6'>Vendor Panel</h1>
        <div className='flex flex-col gap-3'>
          {
            menu.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer text-sm ${activePage === item.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"}`}
              >
                {item.icon} {item.label}
              </button>
            ))
          }
        </div>
      </motion.div>

      {/* Mobile side bar */}
      <AnimatePresence>
        {openMenu && <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.3 }}
          className='lg:hidden fixed top-0 left-0 h-screen w-72 bg-gray-800/90 backdrop-blur-xl p-6 z-50 border-r border-gray-700'
        >
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-xl font-bold'>Vendor Panel</h1>
            <button
              onClick={() => setOpenMenu(false)}
              className='cursor-pointer'
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          <div className='flex flex-col gap-3'>
            {
              menu.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setOpenMenu(false) }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer text-sm ${activePage === item.id
                    ? "bg-blue-600 text-white"
                    : "bg-black/20 hover:bg-gray-700"}`}
                >
                  {item.icon} {item.label}
                </button>
              ))
            }
          </div>
        </motion.div>
        }
      </AnimatePresence>

      {/* main area */}

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{  opacity: 1,x: 0 }}
        transition={{ duration: 0.4 }}
        className='flex-1 p-10 mt-16 lg:mt-0'
      >
        {
          renderPage()
        }
      </motion.div>

    </div>
  )
}

export default VendorDashBoard