import React, {useState} from "react";
import Router, {useRouter} from "next/router";
import {
    Box,
    Input,
    Flex
} from '@chakra-ui/react'
import Task from "./Task";
import {NewTaskModal} from "./NewTaskModal";
import {dueDateFromUrl} from "../utils/dateUtils";

type Props = {
    list: TaskProps[]
}

/**
 * Return section that contains all items for time period
 * id='tasks-container' handles the scrolling
 *
 */
const MiddleView = ({props}) => {
    const [title, setTitle] = useState('');
    const router = useRouter();

    const sendToAPI = async (title: string, dueDate: any) => {
        const body = {title, dueDate};
        await fetch('/api/task-route', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
    }
    // func to create new object in lil input
    const createNewTask = async (e: any) => {
        const path = router.pathname;
        const name = path.substring(1);
        if (e.key === 'Enter') {
            // TODO if empty skip
            try {
                setTitle('');
                const dueDate = dueDateFromUrl(name);
                await sendToAPI(title, dueDate);
                await Router.push(path);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <Box
            width={'50%'}
            p={'6'}
            borderRight="1px"
            borderRightColor={'gray.200'}
        >
            <NewTaskModal/>
            <input
                type="text"
                placeholder="Add Task Here!"
                className="input input-bordered w-full max-w-xs"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={createNewTask}
            />
            <Box
                id={'task-container'}
                maxHeight={'calc(100vh - 144px)'}
                overflowY={'auto'}
            >
                <Flex
                    display={'column'}
                >
                    {props.list.map((task) => (
                        <div key={task.id} className={'task'}>
                            <Task task={task}/>
                        </div>
                    ))}
                </Flex>
            </Box>
        </Box>
    )
}

export default MiddleView;