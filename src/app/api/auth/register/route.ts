import connectDB from "@/lib/connedtDB";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    await connectDB();

    const { name, email, password } = await req.json();

    try {
        const existUser = await User.findOne({ email });
        if (existUser) {
            return NextResponse.json({
                success: false,
                message: "User with this email already exists! Try with another email!!"
            }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({
                success: false,
                message: "Password must be at least 6 characters!!"
            }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return NextResponse.json({
            success: true,
            data: user,
            message: "User registered Successfully!!"
        }, { status: 201 });

    } catch (error) {
        console.log(`Internal Server Error During Register User: ${error}`); 
        return NextResponse.json({
            success: false,
            message: `Internal Server Error During Register User: ${error}`
        }, { status: 500 });
    }

}