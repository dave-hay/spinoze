import {GetServerSideProps, NextPage} from "next";
import {getSession} from "next-auth/react";
import prisma from "../lib/prisma";

//
import {todaysDateAsString, dateFromStringToNums} from "../utils/dateUtils";
import {Box, Flex} from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import LeftView from "../components/LeftView";
import RightView from "../components/RightView";
import MiddleView from "../components/MiddleView";
import ProgNut from "../components/ProgNut";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    const todayDate = todaysDateAsString();
    const dateObj = dateFromStringToNums(todayDate);

    if (!session) {
        res.statusCode = 403;
        return { props: { list: [] } };
    }

    /**
     * @name taskCompleteCount - All completed tasks
     * @type {TaskStatus[]} - either empty or one TaskStatus obj
     */
    const taskCompleteCount = await prisma.task.groupBy({
        by: ['completed', 'due_full'],
        where: {
            completed: true,
            due_full: todayDate,
        },
        _count: { _all: true },
    })

    /**
     * @name taskNotCompleteCount - All uncompleted tasks
     * @type {TaskStatus[]} - either empty or one task obj
     */
    const taskNotCompleteCount = await prisma.task.groupBy({
        by: ['completed', 'due_full'],
        where: {
            completed: false,
            due_full: todayDate,
        },
        _count: { _all: true },
    })

    /**
     * @name list - All uncompleted Task objects due today
     * @type {Task[]}
     */
    const list = await prisma.task.findMany({
        where: {
            author: { email: session.user.email },
            completed: false,
            due_full: todayDate,
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

type Props = {
    list: TaskProps[]
}

const Today: NextPage<Props> = (props) => {
    return (
        <Layout>
            <Head>
                <title>Spinoze | Today's Tasks</title>
                <meta name="description" content="yapa welcome page"/>
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

export default Today;