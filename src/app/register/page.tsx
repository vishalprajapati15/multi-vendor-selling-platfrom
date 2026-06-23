"use client"

import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { signIn } from "next-auth/react";

const Register = () => {

    const [step, setStep] = useState<1 | 2>(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post("/api/auth/register", { name, email, password });
            console.log("Api Result : ", result.data);
            setLoading(false);
            setEmail("");
            setName("");
            setPassword("");
            router.push("/login");
        } catch (error) {
            console.log("User Register error from frontend: ", error);
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
            <AnimatePresence mode="wait">
                {
                    step == 1 &&
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, y: -40 }}
                        className="w-full max-w-lg text-center bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-10 border-white/20">
                        <h1 className="text-4xl font-bold mb-4 text-blue-400">Welcome to Multi Cart</h1>
                        <p className="text-gray-300 mb-6">Register with one of the following account types:</p>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {
                                [
                                    { label: "User", icon: "👤", value: "user" },
                                    { label: "Vendor", icon: "🏪", value: "vendor" },
                                    { label: "Admin", icon: "🧑‍💼", value: "admin" }
                                ].map((item) => (
                                    <motion.div
                                        key={item.value}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.90 }}
                                        className="p-4 bg-white/5 hover:bg-white/20 cursor-pointer rounded-xl border border-white/30 shadow-lg flex flex-col items-center transition"
                                    >
                                        <span className="text-4xl mb-2">{item.icon}</span>
                                        <span className=" text-sm font-medium">{item.label}</span>
                                    </motion.div>
                                ))
                            }
                        </div>
                        <motion.button
                            onClick={() => setStep(2)}
                            className="mt-4 px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex justify-center items-center gap-1 w-full cursor-pointer"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.90 }}
                        >
                            Next <MdOutlineKeyboardArrowRight size={22} />
                        </motion.button>
                    </motion.div>
                }


                {step == 2 &&
                    <motion.div
                        className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-white/20"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, y: -40 }}
                    >
                        <h1 className="text-2xl font-semibold text-center mb-6 text-blue-300">Create your account</h1>
                        <form
                            onSubmit={handleSignUp}
                            className="flex flex-col gap-4">
                            <input
                                type="text"
                                required
                                placeholder="Full Name"
                                className="bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setName(e.target.value)} value={name}
                            />
                            <input
                                type="email"
                                required
                                placeholder="Email"
                                className="bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setEmail(e.target.value)} value={email}
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Password"
                                className="relative bg-white/10 border border-white/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setPassword(e.target.value)} value={password}
                            />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-12 top-61 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer">
                                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                            </button>
                            <motion.button
                                type="submit"
                                disabled={loading}
                                className="mt-4 px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex justify-center items-center gap-1 w-full cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.90 }}
                            >
                                {loading? <ClipLoader size={22} color="white"/> : "Register now"}
                            </motion.button>
                            <div className="flex items-center my-3">
                                <div className="flex-1 h-px bg-gray-600"></div>
                                <span className="px-3 text-sm text-gray-400">Or</span>
                                <div className="flex-1 h-px bg-gray-600"></div>
                            </div>
                            <motion.button
                                onClick={()=>signIn("google", {callbackUrl:"/"})}
                                className="flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.90 }}
                            >
                                <FcGoogle size={28} /> <span className="font-medium">Continue with Google</span>
                            </motion.button>
                            <p className="text-center text-sm mt-4">Already have an account{"  "} <span
                                onClick={() => router.push("/login")}
                                className="text-blue-400 hover:text-blue-500 transition cursor-pointer">Sign In</span></p>
                        </form>
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default Register