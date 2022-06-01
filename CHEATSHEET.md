# CheatSheet

## Task TS Type
```typescript
type TaskProps = {
    id: string;
    title: string;
    author: {
        name: string;
        email: string;
    } | null;
    content: string;
    category: string;
    completed: boolean;
};
```

## Get author name
```typescript jsx
const authorName = task.author ? task.author.name : "Unknown author";
```


https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#typedef-callback-and-param