import { Elysia } from "elysia"
import { html } from "@elysiajs/html"
import { autoroutes } from "elysia-autoroutes"

const app = new Elysia()
    .use(html())
    .use(autoroutes({ routesDir: './routes' }))
    .listen(3000)

console.log(`Elysia is running at http://${app.server?.hostname}:${app.server?.port}`)