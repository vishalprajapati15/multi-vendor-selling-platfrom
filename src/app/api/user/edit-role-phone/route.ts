import { auth } from "@/auth";
import connectDB from "@/lib/connedtDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { phone, role } = await req.json();
        const session = await auth();
        const user = await User.findOneAndUpdate({ email: session?.user?.email }, { phone, role }, { new: true });
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found!!"
            }, { status: 400 });
        }
        return NextResponse.json({
            success: true,
            user,
            message: "User updated successfully!!"
        }, { status: 200 });
    } catch (error) {
        console.log("Update user role and number error : ", error);
        return NextResponse.json({
            success: false,
            message: `Update user role and number error : ${error}`
        }, { status: 500 });
    }
}