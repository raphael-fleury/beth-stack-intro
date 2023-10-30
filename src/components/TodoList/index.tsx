import * as elements from "typed-html"
import { Todo } from '../../models/Todo'
import { TodoItem } from "../TodoItem"
import { TodoForm } from "../TodoForm"

export function TodoList({todos}: {todos: Todo[]}) {
    const content = todos.length
        ? todos.map(todo => <TodoItem {...todo} />)
        : ''

    return <div>
        {content}
        <TodoForm/>
    </div>
}