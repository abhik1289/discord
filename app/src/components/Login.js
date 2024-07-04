import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/features/authSlice';
import {useDispatch} from 'react-redux'
export default function Login() {
    const navigate = useNavigate();
    const [Email, setEmail] = useState();
    const [Password, setPassword] = useState();
    const dispatch = useDispatch()
    const handleSubmit =async () => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: Email,
                    password: Password,
              
                })
            });
            const data = await res.json();
            if (res.status === 200) {
                const {email,id,username,token} = data;
                Cookies.set("auth", JSON.stringify(data));
                dispatch(login({ email,id,username,token }));
                navigate("/");
            } else {
                alert("Wrong username or password")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='wrapper w-screen h-screen flex justify-center items-center bg-slate-400'>
            <div className="main_box rounded-md p-3 w-[400px] h-[200px] bg-white">
                <div className="input_box">
                    <input type="text" name="" className='w-full py-2 border border-slate-400 px-3 rounded outline-none focus:border-blue-400'
                        placeholder='Your email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email} />
                </div>
                <div className="input_box mt-3">
                    <input type="password" name="" className='w-full py-2 border border-slate-400 px-3 rounded outline-none focus:border-blue-400'
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Your Password'
                        id="" />
                </div>
                <button onClick={handleSubmit} className='w-full py-3 bg-blue-600 mt-2 rounded-md font-bold text-white'>Log in</button>
            </div>
        </div>
    )
}
