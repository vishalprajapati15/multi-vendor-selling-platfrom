import { IUser } from '@/model/user.model'
import VendorDashBoard from './VendorDashboard'

const VendorRequest = ({ user }: { user: IUser }) => {
    if (!user) {
        return (
            <div className='w-full min-h-screen flex items-center justify-center text-white bg-linear-to-br from-gray-900 via-black to-gray-900'>
                Loading...
            </div>
        )
    }

    if(user.verificationStatus === "approved"){
        return (
            <div className='w-full min-h-screen pt-16'>
                <VendorDashBoard/>
            </div>
        )
    }

    if(user.verificationStatus === "pending"){
        return (
            <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4'>
                <div className='bg-white/10 backdrop-blur-md p-12 rounded-xl shadow-2xl border border-white/30 max-w-2xl w-full text-center'>
                    <h2 className='text-4xl font-bold mb-6 text-blue-400'>Verification Pending</h2>
                    <p className='text-gray-200 text-lg landing-relaxed'>You can access vendor dashboard only after <span className='font-semibold '>Admin Verification  </span></p>
                    <div className='mt-6 text-base text-gray-300'>
                        Verification Status : {" "} <span className='text-blue-400 font-semibold uppercase'>{user.verificationStatus }</span>
                    </div>
                    <div className='mt-10 text-sm text-gray-400'>
                        It usually takes 3-4 hrs. 
                    </div>
                </div>
            </div>
        )
    }

    if(user.verificationStatus === "rejected"){
        return (
            <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4'>
                
            </div>
        )
    }

}

export default VendorRequest