"use client"
import axios from 'axios';
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineTool } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { ClipLoader } from 'react-spinners';


const EditRoleAndPhone = () => {

    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [adminExist, setAdminExist] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const roles = [
        { label: "Admin", value: "admin", icon: <AiOutlineTool size={40} /> },
        { label: "Vendor", value: "vendor", icon: <AiOutlineShop size={40} /> },
        { label: "User", value: "user", icon: <AiOutlineUser size={40} /> }
    ]

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await axios.get("/api/admin/check-admin");
                setAdminExist(res.data.exist);
            } catch (error) {
                setAdminExist(false);
                console.log("check admin exist front-end error: ", error);
            }
        }
        checkAdmin();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!role || !phone) {
            alert("Please select your role and enter the mobile no.");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post("/api/user/edit-role-phone", { role, phone });
            console.log("Update role Result : ", res.data);
            setLoading(false);
            router.push("/")
        } catch (error) {
            console.log("edit role and phone no page error : ", error);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, y: -40 }}
                    className='w-full max-w-lg bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-10 border border-white/10'
                >
                    <h1 className='text-4xl font-semibold text-center mb-4'>Choose Your Role</h1>
                    <p className='text-center text-gray-300 mb-8 text-base'>Select your role and enter your mobile number to continue.</p>

                    <form className='flex flex-col gap-8'
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            placeholder=' Enter mobile no'
                            maxLength={10}
                            required
                            className='bg-white/10 border border-white/30 rounded-lg p-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={(e) => setPhone(e.target.value)} value={phone}
                        />
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
                            {roles.map((rol) => {
                                const isAdminBlocked = rol.value === "admin" && adminExist
                                return (
                                    <motion.div key={rol.value}
                                        whileHover={!isAdminBlocked ? { scale: 1.05 } : {}}
                                        onClick={() => {
                                            if (isAdminBlocked) {
                                                alert("Admin already exists. You cannot select admin role!");
                                                return;
                                            }
                                            setRole(rol.value);
                                        }}
                                        className={`cursor-pointer p-6 text-center rounded-2xl border transition text-lg font-medium ${role === rol.value ? 'border-blue-500 bg-blue-500/40' : "border-white/20 bg-white/10 hover:bg-white/20"}${isAdminBlocked && "opacity-40 cursor-not-allowed"}`}
                                    >
                                        <div className='flex justify-center mb-3'>
                                            {rol.icon}
                                        </div>
                                        <p>{rol.label}</p>
                                        {isAdminBlocked && <p className='text-xs text-red-500 mb-2'>Admin already exists</p>}
                                    </motion.div>
                                )
                            })}
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

export default EditRoleAndPhone