import React from "react";
import {useRouter} from "next/router";
import Link from 'next/link'

// icons
import {
    BsCalendarWeek,
    BsCalendarCheck,
    BsCalendarDate,
    BsCalendarMonth,
} from "react-icons/bs";

type Props = {
    list: TaskProps[]
}

// 15%
const LeftView = () => {
    const router = useRouter();

    return (
        <>
            {/*<div className="drawer drawer-mobile">*/}
            {/*    <input id="my-drawer-2" type="checkbox" className="drawer-toggle"/>*/}
                {/*<div className="drawer-content flex flex-col items-center justify-center">*/}
                    {/*// <!-- Page content here -->*/}

                {/*</div>*/}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        {/*// <!-- Sidebar content here -->*/}
                        <li>
                            <BsCalendarDate />
                            <Link href={'/'}>
                                <a>All</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/today'}>
                                <a>Today</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/week'}>
                                <a>Week</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/month'}>
                                <a>Month</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/year'}>
                                <a>Year</a>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/finished'}>
                                <a>finished</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            {/*</div>*/}
        </>
    )
}

export default LeftView;