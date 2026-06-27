import { auth } from "@/auth";
import connectDB from "@/lib/connedtDB";
import User from "@/model/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const session = await auth();
        const user = await User.findOne({ email: session?.user.email }).select("-password");
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "Unauthorize access!!"
            }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            user,
            message: "Current User fetched successfully!!"
        }, { status: 200 });

    } catch (error) {
        console.log("Current User fetch error!! : ", error);
        return NextResponse.json({
            success: false,
            message: "Current User fetch error!!"
        }, { status: 500 });
    }
}