import { AppDispatch, RootState } from "@/store"
import { register } from "@/store/slices/authSlice"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ChangeEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const { isLoading, error} = useSelector((state: RootState) => state.auth)

    async function submitHandler(e: React.FormEvent) {
        e.preventDefault()
        const resultAction = await dispatch(register({email: formData.email, password: formData.password}))
        if(register.fulfilled.match(resultAction)) {
            router.push('/login')
        }
    }

    function changleInputHandler(e: ChangeEvent<HTMLInputElement>): void {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className="mx-auto max-w-screen-xl bg-gray-950 h-screen px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl">Get started today</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Welcome to Task Management App, your ultimate task management app designed to boost your productivity and streamline your workflow.
                    </p>

                    <form onSubmit={submitHandler} className="mb-0 mt-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Sign in to your account</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter email"
                                    name="email"
                                    onChange={changleInputHandler}
                                    value={formData.email}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter password"
                                    name="password"
                                    onChange={changleInputHandler}
                                    value={formData.password}
                                />

                            </div>
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
                        >
                            {isLoading ? 'Loading...' : 'Sign up'}
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?
                            <Link className="text-blue-500" href="/login"> Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}