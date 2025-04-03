import { FC } from "react";
import IconTrash from "../../assets/icons/trash";
import "./task.css";

interface TaskProps {
    index: number;
    text: string;
    checked: boolean;
    handleChecked: (index: number) => void;
    deleteTask: (index: number) => void;
}

const Task: FC<TaskProps> = (props) => {
    const { index, text, checked, handleChecked, deleteTask } = props;

    return (
        <li className="task">
            <div className="task__inner">
                <input
                    className="checkbox"
                    onChange={() => handleChecked(index)}
                    checked={checked}
                    type="checkbox"
                    name="checkbox"
                />
                <p className="task__text">{text}</p>
            </div>
            <button className="icon icon-delete" onClick={() => deleteTask(index)}>
                <IconTrash className="trash" />
            </button>
        </li>
    );
};

export default Task;
