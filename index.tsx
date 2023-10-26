import { Elysia } from "elysia"
import { html } from "@elysiajs/html"
import * as elements from "typed-html"

const app = new Elysia()
    .use(html())
    .get("/", ({html}) => html(
        <BaseHtml>
            <button hx-get="/data" hx-swap="outerHTML">
                Click Me
            </button>
        </BaseHtml>
    ))
    .get("/data", () => <h1>Clicked</h1>)
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
</head>
<body>${children}</body>
</html>
`