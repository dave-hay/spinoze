import React from "react";
import type {NextPage, GetServerSideProps} from 'next'
import {getSession, useSession} from 'next-auth/react';

import prisma from '../lib/prisma';

// SEO
import Head from 'next/head'

import {Flex} from '@chakra-ui/react'
// Components
import Layout from "../components/Layout";
import LandingPageLoggedOut from "../components/landing-page/LandingPageLoggedOut";
import LeftView from "../components/LeftView";
import MiddleView from "../components/MiddleView";
import RightView from "../components/RightView";
import ProgNut from "../components/ProgNut";
import {SideBar} from "../components/SideBar";


/**
 * @callback taskCompleteCount
 * @callback taskNotCompleteCount
 * @callback list
 */
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { list: [] } };
    }

    /**
     * @name taskCompleteCount - All completed tasks
     * @type {TaskStatus[]} - either empty or one TaskStatus obj
     */
    const taskCompleteCount = await prisma.task.groupBy({
        by: ['completed'],
        where: { completed: true },
        _count: { _all: true },
    })

    /**
     * @name taskNotCompleteCount - All uncompleted tasks
     * @type {TaskStatus[]} - either empty or one task obj
     */
    const taskNotCompleteCount = await prisma.task.groupBy({
        by: ['completed'],
        where: { completed: false },
        _count: { _all: true },
    })


    // @ts-ignore
    /**
     * @name list - All uncompleted tasks objects
     * @type {Task[]}
     */
    const list = await prisma.task.findMany({
        where: {
            author: { email: session.user.email },
            completed: false,
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });

    return {
        props: {
            list,
            taskCompleteCount,
            taskNotCompleteCount,
        },
    };
};

const Home: NextPage<PrismaData> = (props) => {
    const { data: session, status } = useSession();

    let landingPage = null;

    if (status === 'loading') {
        landingPage = (
            <div>
                <p>Validating data</p>
            </div>
        )
    }

    if (!session) {
        landingPage = (
            <>
                <LandingPageLoggedOut />
            </>
        )
    }

    if (session) {
        landingPage = (
            <Layout>
                <Head>
                    <title>Spinoze | Welcome</title>
                    <meta name="description" content="spinoze welcome page"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <div className={'flex'}>
                    <LeftView />
                    <MiddleView props={props} />
                    <ProgNut props={props} />
                    {/*<RightView />*/}
                </div>
            </Layout>
        )
    }

    return (landingPage)
}

export default Home
