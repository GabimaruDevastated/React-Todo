import { useState } from "react";
import "./styles/App.css";
import Task from "./components/Task/Task";

function App() {
    const [tasks, setTasks] = useState<string[]>([
        "mmmmmmmmmmmmmmmmmmmmm",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem iure debitis officia consequatur vel exercitationem, nobis maiores molestiae odit earum reiciendis vero magnam obcaecati dolor aspernatur asperiores aliquam! Rerum, nulla?",
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem iure debitis officia consequatur",
    ]);
    const [newTask, setNewTask] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTask();
        }
    };

    const addTask = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
            setNewTask("");
        }
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="App">
            <h1 className="title">To-Do List</h1>
            <div className="add-task-wrapper">
                <input
                    className="input"
                    type="text"
                    id="newTask"
                    value={newTask}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                />
                <button className="button" onClick={addTask}>
                    Add Task
                </button>
            </div>
            <ol className="tasks">
                {tasks.map((text, index) => {
                    return <Task text={text} index={index} deleteTask={deleteTask} />;
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
