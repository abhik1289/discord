
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
export default function LoginAccess() {
    const auth = useSelector((state) => state.auth.user);
    return auth ? <Outlet/> : <Navigate to="/login" />
}
