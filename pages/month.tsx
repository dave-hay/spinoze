// libs
import React from "react";
import {getMonth} from "date-fns";

// Next
import {GetServerSideProps, NextPage} from "next";
import {getSession} from "next-auth/react";
import Head from "next/head";

// prisma
import prisma from "../lib/prisma";

// chakra
import {Flex} from "@chakra-ui/react";

//components
import Layout from "../components/Layout";
import LeftView from "../components/LeftView";
import RightView from "../components/RightView";
import MiddleView from "../components/MiddleView";
import ProgNut from "../components/ProgNut";


export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const session = await getSession({req});
    const thisMonth = getMonth(new Date()) + 1;

    if (!session) {
        res.statusCode = 403;
        return {props: {list: []}};
    }

    /**
     * @name taskCompleteCount - All completed tasks
     * @type {TaskStatus[]} - either empty or one TaskStatus obj
     */
    const taskCompleteCount = await prisma.task.groupBy({
        by: ['completed', 'due_month'],
        where: {
            completed: true,
            due_month: thisMonth,
        },
        _count: { _all: true },
    })

    /**
     * @name taskNotCompleteCount - All uncompleted tasks
     * @type {TaskStatus[]} - either empty or one task obj
     */
    const taskNotCompleteCount = await prisma.task.groupBy({
        by: ['completed', 'due_month'],
        where: {
            completed: false,
            due_month: thisMonth,
        },
        _count: { _all: true },
    })

    const list = await prisma.task.findMany({
        where: {
            author: {email: session.user.email},
            completed: false,
            due_month: thisMonth,
        },
        include: {
            author: {
                select: {name: true},
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

type Props = {
    list: TaskProps[]
}


const Month: NextPage<Props> = (props) => {
    return (
        <Layout>
            <Head>
                <title>Spinoze | Month Tasks</title>
                <meta name="description" content="yapa welcome page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Flex>
                <LeftView/>
                <MiddleView props={props}/>
                <ProgNut props={props} />
                {/*<RightView />*/}
            </Flex>
        </Layout>
    )
}

export default Month;