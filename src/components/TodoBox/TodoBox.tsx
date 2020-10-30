import React from 'react'

interface Props {
    id: string,
    title: string,
    del : (id : string) => void,
    update : (id: string, completed: boolean) => void,
    completed: boolean
}

const TodoBox = ({id, title, del, update, completed} : Props) => {
    return (
        <div>
            <li>
                {completed ? <del>{title}</del> : title}
                <span onClick={() => del(id)}>x</span>
                <span onClick={() => update(id, completed)}>{completed ? 'Undo' : 'Done'}</span>
            </li>
        </div>
    )
}

export default TodoBox
