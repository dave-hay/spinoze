import {GetServerSideProps, NextPage} from "next";
import {getSession} from "next-auth/react";
import {dateFromStringToNums, todaysDateAsString} from "../utils/dateUtils";
import prisma from "../lib/prisma";
import Layout from "../components/Layout";
import Head from "next/head";
import {Flex} from "@chakra-ui/react";
import LeftView from "../components/LeftView";
import RightView from "../components/RightView";
import React from "react";
import {getWeek} from "date-fns";
import MiddleView from "../components/MiddleView";
import ProgNut from "../components/ProgNut";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    const date = new Date();
    const thisWeek = getWeek(date);

    if (!session) {
        res.statusCode = 403;
        return { props: { list: [] } };
    }

    /**
     * @name taskCompleteCount - All completed tasks
     * @type {TaskStatus[]} - either empty or one TaskStatus obj
     */
    const taskCompleteCount = await prisma.task.groupBy({
        by: ['completed', 'due_week'],
        where: {
            completed: true,
            due_week: thisWeek,
        },
        _count: { _all: true },
    })

    /**
     * @name taskNotCompleteCount - All uncompleted tasks
     * @type {TaskStatus[]} - either empty or one task obj
     */
    const taskNotCompleteCount = await prisma.task.groupBy({
        by: ['completed', 'due_week'],
        where: {
            completed: false,
            due_week: thisWeek,
        },
        _count: { _all: true },
    })


    const list = await prisma.task.findMany({
        where: {
            author: { email: session.user.email },
            completed: false,
            due_week: thisWeek,
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


const Week: NextPage<Props> = (props) => {
    return (
        <Layout>
            <Head>
                <title>Spinoze | Week Tasks</title>
                <meta name="description" content="yapa welcome page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Flex>
                <LeftView />
                <MiddleView props={props} />
                <ProgNut props={props} />
                {/*<RightView />*/}
            </Flex>
        </Layout>

    )
}

export default Week;