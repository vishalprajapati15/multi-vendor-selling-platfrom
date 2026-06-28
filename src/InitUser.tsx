"use client"

import UseGetAllVendorsData from "./hooks/UseGetAllVendorsData";
import useGetCurrentUser from "./hooks/UseGetCurrentUser"

const InitUser = () => {
    useGetCurrentUser();
    UseGetAllVendorsData();
    return null;
}

export default InitUser