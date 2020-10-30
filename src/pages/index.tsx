import React, {useState, useEffect} from 'react';
import TodoBox from '../components/TodoBox/TodoBox';
import axios from 'axios';

export default () => {

    const [reminder, setterReminder] = useState<string>("");
    const [reminders, setReminders] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const result = await axios.get("/.netlify/functions/getTodo");
            setReminders(result.data);
        })();
    }, [])

    const onDelete = async (id) => {
        const deletion = await axios.delete("/.netlify/functions/deleteTodo",
            { data: { id: id } }
        );
        if(deletion.data === true){
            const result = await axios.get("/.netlify/functions/getTodo");
            setReminders([...result.data]);
        }
    }

    const Submit = async () => {
        if(reminder){
            setLoading(true);
            const result = await axios.post("/.netlify/functions/createTodo",
                {title : reminder}
            );
            setterReminder("");
            setReminders([...reminders, result.data]);
            setLoading(false);
        }
    }

    const onUpdate = async (id, completed) => {
        const update = await axios.patch("/.netlify/functions/updateTodo",
            {completed : !completed, id : id}
        );
        if(update.data === true){
            const result = await axios.get("/.netlify/functions/getTodo");
            setReminders([...result.data]);
        }
    }

    return (
        <div className="App">
            <div className="box">
                <input type="text" className="input" placeholder="Reminder" value={reminder} name="reminder" onChange={({target}) => setterReminder(target.value)}/>
                <button className="submit__button" onClick={Submit}>
                    {!loading ? "Add" : "Loading"}
                </button>
                <ul className="lists">
                    {
                    reminders.length > 0 &&
                    reminders.map(rem => (
                    <TodoBox
                        id={rem.id}
                        key={rem.id}
                        del={onDelete}
                        title={rem.title}
                        update={onUpdate}
                        completed={rem.completed}
                        />
                    ))
                    }
                </ul>
            </div>
        </div>
    )
}