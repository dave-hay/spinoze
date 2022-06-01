import React, {useState} from "react";
import Router from "next/router";

// Chakra

/**
 * Creates task element displayed on high-level overview page
 * @param task filtered task information
 */
const Task: React.FC<{ task: Task }> = ({task}) => {
    const [isChecked, setIsChecked] = useState<boolean>(task.completed);

    /**
     * Complete task route
     * @see {~/page/api/finished-route/[id].ts} route
     */
    async function completeTask(id: string): Promise<void> {
        setIsChecked(!isChecked);
        await fetch(`/api/finished-route/${id}`, {
            method: 'PUT',
        });
        await Router.push('/');
    }

    /**
     * checkbox
     * onChange={() => completeTask(task.id)}
     *
     * full view
     * onClick={() => Router.push("/task/[id]", `/task/${task.id}`)}
     */
    return (
        <>
            <div className="container bg-base-100 hover:bg-base-200 flex p-2 border-b border-gray-200">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={isChecked}
                    onChange={() => completeTask(task.id)}
                />
                <h4 className={'pl-4 font-semibold tracking-widest '}>{task.title}</h4>
            </div>
        </>

    );
};

export default Task;
