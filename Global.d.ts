export {};

declare global {


    /**
     * @name Task
     */
    type Task = {
        id: string;
        title: string;
        due_full: string;
        due_dow: number;
        due_day: number;
        due_week: any;
        due_month: number;
        due_year: number;
        author: {
            name: string;
            email: string;
        } | null;
        content: string;
        category: string;
        completed: boolean;
    };

    /**
     * @typedef {Object} TaskStatus - Return from prisma
     * @property {boolean} completed - if count is of completed or non completed tasks
     * @property {number} _all - total occurrences
     */
    type TaskStatus = {
        _count: {
            _all: number;
        };
        completed: boolean;
    }

    /**
     * @name PrismaData - Returned data from prisma
     */
    type PrismaData = {
        list: Task[];
        taskCompleteCount: TaskStatus[];
        taskNotCompleteCount: TaskStatus[];
    }

    type TaskProps = {
        id: string;
        title: string;
        due_dow: number;
        due_day: number;
        due_week: any;
        due_month: number;
        due_year: number;
        author: {
            name: string;
            email: string;
        } | null;
        content: string;
        category: string;
        completed: boolean;
    };

    type TaskArray = {

    }

}