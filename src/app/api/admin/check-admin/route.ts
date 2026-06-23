import connectDB from "@/lib/connedtDB";
import User from "@/model/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const admin = User.findOne({ role: "admin" });
        return NextResponse.json({
            exist: !!admin,
            message: "Admin role fetched successfully!!"
        })
    } catch (error) {
        console.log("Fetch admin role error : ", error);
        return NextResponse.json({
            success: false,
            message: `Check Admin error : ${error}`
        }, { status: 500 });
    }
}