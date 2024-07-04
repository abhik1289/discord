import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
export default function NotLoginAccess() {
    const auth = useSelector((state) => state.auth.user);
    return auth ? <Navigate to="/" /> : <Outlet />
}
