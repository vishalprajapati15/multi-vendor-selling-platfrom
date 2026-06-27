import connectDB from "@/lib/connedtDB";
import User from "@/model/user.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const vendors = await User.find({ role: "vendor" }).sort({ createdAt: -1 });
        if (!vendors) {
            return NextResponse.json({
                success: true,
                message: "No Vendor found!!"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            vendors,
            message: "All Vendors fetched successfully!!"
        }, { status: 200 });

    } catch (error) {
        console.log("Fetching all vendor error : ", error);
        return NextResponse.json({
            success: false,
            message: "Fetching all vendors error!!"
        }, { status: 500 });
    }
}