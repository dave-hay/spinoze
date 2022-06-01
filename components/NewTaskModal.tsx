import React, {useState} from "react";
import Router, {useRouter} from "next/router";
import {dueDateFromUrl} from "../utils/dateUtils";

export const NewTaskModal = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();
    const path = router.pathname;
    const name = path.substring(1);
    const dueDate = dueDateFromUrl(name);


    const createNewTask = async (e: any) => {
        e.preventDefault();
        const body = {title, content, dueDate};
        await fetch('/api/task-route', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });
        // close modal
        await Router.push(path);
    }


    return (
        <>
            <label htmlFor="my-modal-4" className="btn modal-button">open modal</label>

            {/*// <!-- Put this part before </body> tag -->*/}
            <input type="checkbox" id="my-modal-4" className="modal-toggle"/>
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">New Task Here!</h3>
                    <form onSubmit={createNewTask} className={'flex-col'}>
                        <div className={'border-gray-300'}>
                            <input
                                type="text"
                                placeholder="Add Task Here!"
                                className="input input-bordered w-full"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Notes"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>
                        <button
                            className="btn"
                            type={'submit'}
                        >Add</button>
                    </form>
                </label>
            </label>
        </>
    )

}