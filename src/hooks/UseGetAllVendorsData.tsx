'use client'
import { AppDispatch } from "@/redux/store"
import { setAllVendorsData } from "@/redux/vendorSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const UseGetAllVendorsData = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const fetchAllVendor = async () => { 
            try {
                const res = await axios.get("/api/vendor/get-all-vendors");
                // console.log("All Vendor: ", res.data);

                dispatch(setAllVendorsData(res.data))
            } catch (error) {
                dispatch(setAllVendorsData([]))
                console.log("Fetch all vendor data Error : ", error)
            }
        }
        fetchAllVendor();
    }, [])
}

export default UseGetAllVendorsData