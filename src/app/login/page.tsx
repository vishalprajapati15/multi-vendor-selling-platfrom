"use client"
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AnimatePresence } from "motion/react"
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { signIn } from 'next-auth/react';


const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSignIn = async (e:React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
                const result = await signIn("credentials", { redirect: false, email, password });
                setLoading(false);
                if (result && (result as any).ok) {
                    alert("User Signed in successfully!!");
                    router.push("/");
                } else {
                    const error = (result as any)?.error || 'Login failed';
                    alert(`User Login error: ${error}`);
                }
            setLoading(false);
        } catch (error) {
            console.log("User login error from frontend: ", error);
            setLoading(false);
            alert(`User Login error : ${error}`);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6'>
            <AnimatePresence>
                <motion.div
                    className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border-white/20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, y: -40 }}
                >
                    <h1 className="text-2xl font-semibold text-center mb-6 text-gray-100">Welcome back to <span className='text-blue-500'>Multi Cart</span></h1>
                    <form
                        onSubmit={handleSignIn}
                        className="flex flex-col gap-4">
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
                            className="absolute right-12 top-45 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer">
                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                        </button>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            className="mt-4 px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium flex justify-center items-center gap-1 w-full cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.90 }}
                        >
                            {loading ? <ClipLoader size={22} color="white" /> : "Login"}
                        </motion.button>
                        <div className="flex items-center my-3">
                            <div className="flex-1 h-px bg-gray-600"></div>
                            <span className="px-3 text-sm text-gray-400">Or</span>
                            <div className="flex-1 h-px bg-gray-600"></div>
                        </div>
                        <motion.button
                            className="flex items-center justify-center gap-3 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.90 }}
                        >
                            <FcGoogle size={28} /> <span className="font-medium">Login with Google</span>
                        </motion.button>
                        <p className="text-center text-sm mt-4">Don't have an account{"  "} <span
                            onClick={() => router.push("/register")}
                            className="text-blue-400 hover:text-blue-500 transition cursor-pointer">Sign Up</span></p>
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default SignIn