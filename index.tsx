import { Elysia } from "elysia"
import { html } from "@elysiajs/html"
import * as elements from "typed-html"

const app = new Elysia()
    .use(html())
    .get("/", () =>
        <BaseHtml>
            <body
                class="flex w-full h-screen justify-center items-center"
                hx-get="/todos" hx-trigger="load" hx-swap="innerHTML"
            />
        </BaseHtml>
    )
    .get("/todos", () => <TodoList todos={db}/>)
    .listen(3000)

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)

const BaseHtml = ({ children }: elements.Children) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <script src="https://unpkg.com/htmx.org@1.9.3"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
${children}
</html>
`

type Todo = {
    id: number
    content: string
    completed: boolean
}

const db: Todo[] = [
    { id: 1, content: "Do the dishes", completed: true },
    { id: 2, content: "Study Mathematics", completed: false }
]

const TodoItem = ({id, content, completed}: Todo) => (
    <div class="flex flex-row space-x-3">
        <p>{content}</p>
        <input type="checkbox" checked={completed} />
        <button class="text-red-500">X</button>
    </div>
)

function TodoList({todos}: {todos: Todo[]}) {
    if (!todos.length)
        return <p>No Tasks!</p>

    return <div>
        {todos.map(todo => (
            <TodoItem {...todo} />
        ))}
    </div>
}