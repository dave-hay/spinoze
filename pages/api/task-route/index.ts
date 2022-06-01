import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import {dateToObj} from "../../../utils/dateUtils";

/**
 * POST /api/task-route
 * adds new Task object to users db
 *
 * Required fields in body: title, category
 * Optional fields in body: content
 */
export default async function handle(req, res) {
    const { title, content, category, dueDate } = req.body;

    const date = dateToObj(dueDate);

    const session = await getSession({ req });
    const result = await prisma.task.create({
        data: {
            title: title,
            content: content,
            category: category,
            due_full: date.due_full,
            due_dow: date.due_dow,
            due_day: date.due_day,
            due_week: date.due_week,
            due_month: date.due_month,
            due_year: date.due_year,
            author: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result);
}
