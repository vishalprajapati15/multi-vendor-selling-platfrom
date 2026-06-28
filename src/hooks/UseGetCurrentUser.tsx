'use client'
import { AppDispatch } from "@/redux/store"
import { setUserData } from "@/redux/userSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"


async function useGetCurrentUser() {

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const result = await axios.get("/api/user/current-user");
                // console.log(result.data);
                dispatch(setUserData(result.data));
            } catch (error) {
                dispatch(setUserData(null));
                console.log("Fetchign all users hook error : ", error);
            }
        }
        fetchUser();

    }, [])
}

export default useGetCurrentUser