import { useState } from "react";
import "./styles/App.css";
import Task from "./components/Task/Task";
import {
    closestCorners,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ObjectTask {
    id: number;
    checked: boolean;
    text: string;
}

function App() {
    const storedTasks = localStorage.getItem("tasks");
    const [tasks, setTasks] = useState<ObjectTask[]>(storedTasks ? JSON.parse(storedTasks) : []);
    const [newTask, setNewTask] = useState<ObjectTask>({ id: maxId(), checked: false, text: "" });

    function maxId() {
        if (tasks.length > 0) {
            return tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
        } else {
            return 1;
        }
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

    const getTaskPos = (id: number) => {
        return tasks.findIndex((task) => task.id === id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id === over?.id) return;

        setTasks((tasks) => {
            const originalPos = getTaskPos(Number(active.id));
            const newPos = getTaskPos(Number(over?.id));
            const newTasks = arrayMove(tasks, originalPos, newPos);
            localStorage.setItem("tasks", JSON.stringify(newTasks));
            return newTasks;
        });
    };

    const sensorSettings = {
        distance: 6,
    };

    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: sensorSettings,
        }),
        useSensor(PointerSensor, {
            activationConstraint: sensorSettings,
        }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    return (
        <div className="App">
            <h1 className="title">To-Do List</h1>
            <div className="add-task-wrapper">
                <input
                    id="newTask"
                    className="input"
                    type="text"
                    placeholder="Task text"
                    autoComplete="off"
                    autoFocus={true}
                    value={newTask.text}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                />
                <button className="button" onClick={addTask}>
                    Add Task
                </button>
            </div>
            <ol className="tasks">
                <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                    <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                        {tasks.map((task) => {
                            return (
                                <Task
                                    key={task.id}
                                    id={task.id}
                                    checked={task.checked}
                                    text={task.text}
                                    handleChecked={handleChecked}
                                    deleteTask={deleteTask}
                                />
                            );
                        })}
                    </SortableContext>
                </DndContext>
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
