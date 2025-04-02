import { FC } from "react";
import IconTrash from "../../assets/icons/trash";
import "./task.css";

interface TaskProps {
    index: number;
    text: string;
    deleteTask: (index: number) => void;
}

const Task: FC<TaskProps> = (props) => {
    const { index, text, deleteTask } = props;

    return (
        <li className="task" key={index}>
            <div className="task__inner">
                <input className="checkbox" type="checkbox" name="checkbox" />
                <p className="task__text">{text}</p>
            </div>
            <button className="icon icon-delete" onClick={() => deleteTask(index)}>
                <IconTrash className="trash" />
            </button>
        </li>
    );
};

export default Task;
