import React, { useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'
import Base from "../Components/Base/Base"
import { ArrowPathIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from "react-router-dom"
import { signIn, getToken } from "../Helpers"


const Login = () => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        let token = getToken() || ''
        if(token !== '') {
            let { exp } = jwtDecode(token)
            let expiry = Date.now() >= exp * 1000 
            if(expiry) {
                return navigate('/home')
            }
        }
    }, [])

    const formSubmitLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const login = await signIn({ 
                email: email, 
                password: password 
            })
            if(login.success) {
                localStorage.setItem('user', JSON.stringify(login.dbRes))
                localStorage.setItem('token', login.token)
                return navigate('/home')
            }else {
                setError(true)
                setLoading(false)
            }
        }catch(err) {
            setError(true)
            setLoading(false)
        }
    }

    return(
        <Base style="bg-white rounded-t-2xl">
            <div className="w-full ml-auto p-10">
                <h1 className="text-5xl font-extrabold">Login</h1>
            </div>
            <div className="w-full p-10">
                <form className="flex flex-col items-center">
                    <div className="p-1 flex flex-col">
                        <label className="text-md font-semibold" htmlFor="email">Email:</label>
                        <div className="flex flex-row justify-start">
                            <EnvelopeIcon 
                                    width={20} 
                                    height={20} 
                                    color="gray"
                                    className="mt-4 -mr-8 z-10 "
                            />
                            <input 
                                className="h-[50px] w-[350px] border-gray-500 rounded shadow pl-10"
                                type="email" 
                                name="email" 
                                id="email" 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>
                    <div className="p-1 flex flex-col">
                        <label className="text-md font-semibold" htmlFor="email">Password:</label>
                        <div className="flex flex-row justify-start">
                            <LockClosedIcon 
                                    width={20} 
                                    height={20} 
                                    color="gray"
                                    className="mt-4 -mr-8 z-10 "
                            />
                            <input 
                                className="h-[50px] w-[350px] border-gray-500 rounded shadow pl-10"
                                type="password" 
                                name="password" 
                                id="password" 
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>
                    { !error ? '':
                        <div className="p-1 pt-2 flex flex-col">
                            <p className="text-red-500">An Error Occured!</p>
                        </div>
                    }
                    <div className="p-1 pt-2 flex flex-col">
                        <button disabled={ loading ? true : false } onClick={formSubmitLogin} className="bg-black w-[120px] h-[40px] flex flex-row justify-center p-1 rounded-lg text-white text-lg font-semibold">
                            Login
                            { !loading ? '':
                                <ArrowPathIcon
                                    className="ml-2 mt-1 animate-spin" 
                                    width={25} 
                                    height={25} 
                                />
                            }
                        </button>
                    </div>
                    <div className="p-1 pt-5 flex flex-col">
                        <p>By signing in you agree to our <Link className="text-[#9376F4]" to="/terms-and-conditions">Terms & Conditions</Link> and <Link className="text-[#9376F4]" to="/terms-and-conditions">Privacy Policy</Link>.</p>
                    </div>
                </form>
            </div>
        </Base>   
    )
}

export default Login