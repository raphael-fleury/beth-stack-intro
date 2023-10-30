import * as elements from "typed-html"
import type { Elysia } from 'elysia'
import { BaseHtml } from "../components/BaseHtml"

export default (app: Elysia) => app
    .get("/", () =>
        <BaseHtml>
            <body
                class="flex w-full h-screen justify-center items-center"
                hx-get="/todos" hx-trigger="load" hx-swap="innerHTML"
            />
        </BaseHtml>
    )