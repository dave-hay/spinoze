import prisma from '../../../lib/prisma';

/**
 * PUT /api/finished-route/:id
 * Changes Task object field completed to true
 */
export default async function handle(req, res) {
    const postId = req.query.id;
    const post = await prisma.task.update({
        where: { id: postId },
        data: { completed: true },
    });
    res.json(post);
}
