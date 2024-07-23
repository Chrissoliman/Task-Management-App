import { AppDispatch, RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaTasks } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { BiTaskX } from "react-icons/bi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";

interface SidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}


export default function SidePanel({activeCategory, setActiveCategory}: SidebarProps) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!user) {
          router.push('/login');
        }
      }, [user, dispatch, router]);

      const logoutHandler = () => {
        dispatch(logout());
        router.push('/login');
      };

    return (<><div className="hidden md:flex h-screen flex-col justify-between border-e border-gray-800 bg-gray-950">
        <div className="px-4 py-6">
            <h1 className="text-white font-bold text-2xl">Task Management App</h1>

            <ul className="mt-6 space-y-1">
                <li>
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white ${activeCategory === 'all' ? 'text-white bg-gray-800' : 'text-gray-500'}`}
                    >
                        All Tasks
                    </button>
                </li>

                <li>
                    <button
                        onClick={() => setActiveCategory('completed')}
                        className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white ${activeCategory === 'completed' ? 'text-white bg-gray-800' : 'text-gray-500'}`}
                    >
                        Completed Tasks
                    </button>
                </li>

                <li>
                    <button
                        onClick={() => setActiveCategory('incompleted')}
                        className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white ${activeCategory === 'incompleted' ? 'text-white bg-gray-800' : 'text-gray-500'}`}
                    >
                        Incompleted Tasks
                    </button>
                </li>

                <li>
                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-800 hover:text-white"
                        >
                            <span className="text-sm font-medium"> Categories </span>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                                <button
                                    onClick={() => setActiveCategory('shopping')}
                                    className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white ${activeCategory === 'shopping' ? 'text-white bg-gray-800' : 'text-gray-500'}`}
                                >
                                    Shopping
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => setActiveCategory('personal')}
                                    className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white ${activeCategory === 'personal' ? 'text-white bg-gray-800' : 'text-gray-500'}`}
                                >
                                    Personal
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => setActiveCategory('other')}
                                    className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 hover:text-white ${activeCategory === 'other' ? 'text-white bg-gray-800' : 'text-gray-500'}`}
                                >
                                    Other
                                </button>
                            </li>

                        </ul>
                    </details>
                </li>
            </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-900">
            <button onClick={logoutHandler} className="flex items-center justify-between gap-2 w-full bg-gray-950 text-white p-4 hover:bg-gray-900">

                    <p className="text-sm text-white">
                        <strong className="block font-medium">Logout</strong>
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
            </button>
        </div>
    </div>

        <div className="flex md:hidden h-screen w-16 flex-col justify-between border-e border-gray-800 bg-gray-950">
            <div>
                <div className="px-2">

                    <ul className="space-y-1 pt-4">
                        <li>
                            <button
                                onClick={() => setActiveCategory('all')}
                                className={`group relative flex justify-center rounded px-2 py-1.5 hover:bg-gray-50 text-xl hover:text-gray-700 ${activeCategory === 'all' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
                            >
                                <FaTasks />

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    All Tasks
                                </span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => setActiveCategory('completed')}
                                className={`group relative flex justify-center rounded px-2 py-1.5 hover:bg-gray-50 text-xl hover:text-gray-700 ${activeCategory === 'completed' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
                            >
                                <BiTask />

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Completed
                                </span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => setActiveCategory('incompleted')}
                                className={`group relative flex justify-center rounded px-2 py-1.5 hover:bg-gray-50 text-xl hover:text-gray-700 ${activeCategory === 'incompleted' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
                            >
                                <BiTaskX />

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Incompleted
                                </span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => setActiveCategory('personal')}
                                className={`group relative flex justify-center rounded px-2 py-1.5 hover:bg-gray-50 text-xl hover:text-gray-700 ${activeCategory === 'personal' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
                            >
                                <IoMdPerson />

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Personal (Category)
                                </span>
                            </button>
                        </li>


                        <li>
                            <button
                                onClick={() => setActiveCategory('shopping')}
                                className={`group relative flex justify-center rounded px-2 py-1.5 hover:bg-gray-50 text-xl hover:text-gray-700 ${activeCategory === 'shopping' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
                            >
                                <MdOutlineShoppingCart />

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Shopping (Category)
                                </span>
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => setActiveCategory('other')}
                                className={`group relative flex justify-center rounded px-2 py-1.5 hover:bg-gray-50 text-xl hover:text-gray-700 ${activeCategory === 'other' ? 'bg-gray-700 text-white' : 'text-gray-500'}`}
                            >
                                <GiPerspectiveDiceSixFacesRandom/>

                                <span
                                    className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                >
                                    Other (Category)
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-800 bg-gray-950 p-2">
                <button
                    onClick={logoutHandler}
                    className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-800 hover:text-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>

                    <span
                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                    >
                        Logout
                    </span>
                </button>
            </div>
        </div>

    </>)
}