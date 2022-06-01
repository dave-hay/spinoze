import React from "react";

// Next.js
import {useRouter} from 'next/router';
import {signOut, useSession} from 'next-auth/react';

const Header = () => {
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname;

    const {data: session, status} = useSession();

    let menu = null;

    /**
     * No user logged in
     */
    if (!session || status === 'loading') {
        menu = (
            <>
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl">Spinoze</a>
                </div>
                <div className="navbar-end">
                    <a
                        className="btn"
                        onClick={() => router.push('/api/auth/signin')}
                    >Get started</a>
                </div>
            </>
        )
    }

    /**
     * If user is logged in
     */
    if (session) {
        menu = (
            <>
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Spinoze</a>
                </div>
                {/*<div>*/}
                {/*    <a*/}
                {/*        className={'btn'}*/}
                {/*        onClick={() => router.push('/create')}>*/}
                {/*        New Task*/}
                {/*    </a>*/}
                {/*</div>*/}
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered"/>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${session.user.name}&format=svg&background=random`}
                                    alt={''}
                                />
                            </div>
                        </label>
                        <ul tabIndex={0}
                            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={() => signOut()}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="navbar bg-base-100 border border-gray-300">
            {menu}
        </div>
    )
};

export default Header;