import React from 'react';
import prisma from '../../lib/prisma';
import {GetServerSideProps} from "next";
import Router from 'next/router';
import Layout from '../../components/Layout';
import {useSession} from 'next-auth/react';

/**
 * /task/[id].ts
 * single Task object
 */
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const post = await prisma.task.findUnique({
        where: {
            id: String(params?.id),
        },
        include: {
            author: {
                select: {name: true, email: true},
            },
        },
    });
    return {
        props: post,
    };
};

/**
 * Complete task route
 * @see {~/page/api/finished-route/[id].ts} route
 */
async function completeTask(id: string): Promise<void> {
    await fetch(`/api/finished-route/${id}`, {
        method: 'PUT',
    });
    await Router.push('/');
}

/**
 * Delete task route
 * @see {~/page/api/task/[id].ts} route
 */
async function deleteTask(id: string): Promise<void> {
    await fetch(`/api/task-route/${id}`, {
        method: 'DELETE',
    });
    await Router.push('/');
}

/**
 * /task/[id].ts
 * single Task object
 *
 */
const Post: React.FC<TaskProps> = (props) => {
    const {data: session, status} = useSession();
    if (status === 'loading') {
        return <div>Authenticating ...</div>;
    }
    const userHasValidSession = Boolean(session);
    const postBelongsToUser = session?.user?.email === props.author?.email;
    let title = props.title;
    if (!props.completed) {
        title = `${title} (Draft)`;
    }

    return (
        <Layout>
            <div>
                <h2>{title}</h2>
                <p>By {props?.author?.name || 'Unknown author'}</p>
                <p>{props.content}</p>
                {
                    !props.completed && userHasValidSession && postBelongsToUser && (
                        <button onClick={() => completeTask(props.id)}>Complete</button>
                    )
                }
                {
                    userHasValidSession && postBelongsToUser && (
                        <button onClick={() => deleteTask(props.id)}>Delete</button>
                    )
                }
            </div>
        </Layout>
    );
};

export default Post;
