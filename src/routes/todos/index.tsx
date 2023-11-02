import * as elements from "typed-html"
import type { Elysia } from 'elysia'
import { NotFoundError, t } from "elysia"
import { TodoItem } from '../../components/TodoItem'
import { TodoList } from '../../components/TodoList'
import { db } from "../../db"
import { Todo, todos } from "../../db/schema"
import { eq } from "drizzle-orm"

const justId =  t.Object({
    id: t.Numeric()
})

export default (app: Elysia) => app
    .get("/", async () => {
        const data = await db.select().from(todos).all()
        return <TodoList todos={data}/>
    })

    .post("/", async ({body}) => {
        if (!body.content.length)
            throw new Error("Content cannot be empty")

        console.log(body)
        const newTodo = await db.
            insert(todos).values(body).returning().get()

        return <TodoItem {...newTodo}/>
    }, {
        body: t.Object({
            content: t.String()
        })
    })

    .post("/toggle/:id", async ({params}) => {
        const oldTodo = await db
            .select().from(todos)
            .where(eq(todos.id, params.id)).get()

        if (!oldTodo)
            throw new NotFoundError()

        const newTodo = await db
            .update(todos).set({ completed: !oldTodo.completed})
            .where(eq(todos.id, params.id)).returning().get()

        return <TodoItem {...newTodo}/>
    }, { params: justId })

    .delete("/:id", async ({params}) => {
        await db.delete(todos).where(eq(todos.id, params.id)).run()
    }, { params: justId })