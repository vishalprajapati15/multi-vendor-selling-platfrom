import { auth } from "@/auth";
import connectDB from "@/lib/connedtDB";
import User from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { shopName, shopAddress, gstNumber } = await req.json();
        const session = await auth();
        if (!session?.user.email) {
            return NextResponse.json({
                success: false,
                message: "Unauthorize Access!!"
            }, { status: 401 });
        }

        const user = await User.findOneAndUpdate({ email: session?.user.email }, {
            shopName,
            shopAddress,
            gstNumber,
            verificationStatus: "pending",
            requestAt: new Date()
        }, { returnDocument: "after" });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User Not found!!"
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            user,
            message: "Shop Details Updated successfully"
        }, { status: 200 });

    } catch (error) {
        console.log("Update shop details error :", error);
        return NextResponse.json({
            success: false,
            message: "Update shop details error"
        }, { status: 500 });
    }
}