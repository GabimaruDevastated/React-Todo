import { useState } from "react";
import "./styles/App.css";
import Task from "./components/Task/Task";

interface ObjectTask {
    id: number;
    checked: boolean;
    text: string;
}

function App() {
    const storedTasks = localStorage.getItem("tasks");
    const [tasks, setTasks] = useState<ObjectTask[]>(storedTasks ? JSON.parse(storedTasks) : []);
    const [newTask, setNewTask] = useState<ObjectTask>({
        id: maxId(),
        checked: false,
        text: "",
    });

    function maxId() {
        return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, text: event.target.value });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTask();
        }
    };

    const addTask = () => {
        if (newTask && newTask.text.trim() !== "") {
            const updatedTasks = [...tasks, { ...newTask, id: maxId() }];
            setTasks(updatedTasks);
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setNewTask({ id: maxId(), checked: false, text: "" });
        }
    };

    const deleteTask = (index: number) => {
        const updatedTasks = tasks.filter((i) => i.id !== index);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleChecked = (index: number) => {
        const updatedTasks = tasks.map((item) => {
            if (item.id === index) {
                return { ...item, checked: !item.checked };
            } else {
                return item;
            }
        });

        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    return (
        <div className="App">
            <h1 className="title">To-Do List</h1>
            <div className="add-task-wrapper">
                <input
                    className="input"
                    type="text"
                    placeholder="Task text"
                    id="newTask"
                    value={newTask.text}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                />
                <button className="button" onClick={addTask}>
                    Add Task
                </button>
            </div>
            <ol className="tasks">
                {tasks.map((task) => {
                    return (
                        <Task
                            key={task.id}
                            index={task.id}
                            checked={task.checked}
                            handleChecked={handleChecked}
                            text={task.text}
                            deleteTask={deleteTask}
                        />
                    );
                })}
            </ol>
            <p className="developer">
                <span>Developer: </span>
                <a className="link" href="https://github.com/GabimaruDevastated">
                    GabimaruDevastated
                </a>
            </p>
        </div>
    );
}

export default App;
