import { Elysia } from "elysia"
import { html } from "@elysiajs/html"
import * as elements from "typed-html"

const app = new Elysia()
    .use(html())
    .get("/", () =>
        <BaseHtml>
            <div class="vw-100 vh-100 d-flex justify-content-center align-items-center">
                <button class="btn btn-primary" hx-get="/data" hx-swap="outerHTML">
                    Click Me
                </button>
            </div>
        </BaseHtml>
    )
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
</head>
<body>${children}</body>
</html>
`