import { auth } from "@/auth";
import EditRoleAndPhone from "@/components/EditRoleAndPhone";
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


  return (
    <div>

    </div>
  )
}
