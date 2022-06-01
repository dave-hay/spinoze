import React from 'react';
import { GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import Head from "next/head";
import {Flex} from "@chakra-ui/react";
import LeftView from "../components/LeftView";
import MiddleView from "../components/MiddleView";
import RightView from "../components/RightView";


/**
 * /list
 * component renders all user tasks where completed: true.
 *  if not logged in 403 status code
 */
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { list: [] } };
    }

    const list = await prisma.task.findMany({
        where: {
            author: { email: session.user.email },
            completed: true,
        },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
    return {
        props: { list },
    };
};

type Props = {
    list: TaskProps[];
};

const Finished: React.FC<Props> = (props) => {
    // const { data: session } = useSession();

    // if (!session) {
    //     return (
    //         <Layout>
    //             <h1>My Drafts</h1>
    //             <div>You need to be authenticated to view this page.</div>
    //         </Layout>
    //     );
    // }

    return (
        <Layout>
            <Head>
                <title>YAPA | Finished Tasks</title>
                <meta name="description" content="yapa finished tasks"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Flex>
                <LeftView/>
                <MiddleView props={props}/>
                <RightView/>
            </Flex>
        </Layout>
    );
};

export default Finished;
