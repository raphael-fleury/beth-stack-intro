import * as elements from "typed-html"
import type { Elysia } from 'elysia'
import { t } from "elysia"
import { Todo } from '../../models/Todo'
import { TodoItem } from '../../components/TodoItem'
import { TodoList } from '../../components/TodoList'

const db: Todo[] = [
    { id: 1, content: "Do the dishes", completed: true },
    { id: 2, content: "Study Mathematics", completed: false }
]
let lastId = 2

const justId =  t.Object({
    id: t.Numeric()
})

export default (app: Elysia) => app
    .get("/", () => <TodoList todos={db}/>)

    .post("/", ({body}) => {
        if (!body.content.length)
            throw new Error("Content cannot be empty")
        const newTodo: Todo = {
            id: lastId + 1,
            content: body.content,
            completed: false
        }
        db.push(newTodo)
        lastId++
        return <TodoItem {...newTodo}/>
    }, {
        body: t.Object({
            content: t.String()
        })
    })

    .post("/toggle/:id", ({params}) => {
        const todo = db.find(todo => todo.id === params.id)
        if (todo) {
            todo.completed = !todo.completed
            return <TodoItem {...todo} />
        }
    }, { params: justId })

    .delete("/:id", ({params}) => {
        const todo = db.find(todo => todo.id === params.id)
        if (todo) {
            db.splice(db.indexOf(todo), 1)
        }
    }, { params: justId })