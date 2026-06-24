import { auth } from "@/auth";
import EditRoleAndPhone from "@/components/EditRoleAndPhone";
import NavBar from "@/components/NavBar";
import connectDB from "@/lib/connedtDB"
import User from "@/model/user.model";
import { redirect } from "next/navigation";


export default async function HOME() {
  await connectDB();
  const session = await auth();
  const user = await User.findById(session?.user?.id)
  if(!user){
    redirect("/login ");
  }

  const inComplete = !user.role || !user.phone || (!user.phone && user.role ==="user");

  if(inComplete){
    return (
      <EditRoleAndPhone/>
    )
  }

  const plainUser = JSON.parse(JSON.stringify(user))

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 font-sans flex-col">
      <NavBar user={plainUser}/>
    </div>
  )
}
