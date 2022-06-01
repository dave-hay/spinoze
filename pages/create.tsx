import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [dueDate, setDueDate] = useState(() => {
        const date = new Date();
        return date.toISOString().substring(0, 10);
    });

    /**
     * Creates a new Task Object
     * @see {~/pages/api/task-route/index.ts} API server request
     */
    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { title, content, category, dueDate };
            await fetch('/api/task-route', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            await Router.push('/');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <Layout>
            <div>
                <form onSubmit={submitData}>
                    <h1>New Task</h1>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                    />
                    <input
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                        type="text"
                        value={category}
                    />
                    <input
                        type={'date'}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}

                    />
                    <textarea
                        cols={50}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Content"
                        rows={8}
                        value={content}
                    />
                    <input disabled={!content || !title} type="submit" value="Create" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                </form>
            </div>
            <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
        </Layout>
    );
};

export default Draft;
