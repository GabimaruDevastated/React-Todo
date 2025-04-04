import { FC } from "react";
import IconTrash from "../../assets/icons/trash";
import "./task.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
    id: number;
    text: string;
    checked: boolean;
    handleChecked: (index: number) => void;
    deleteTask: (index: number) => void;
}

const Task: FC<TaskProps> = (props) => {
    const { id, text, checked, handleChecked, deleteTask } = props;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const styles = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    return (
        <li ref={setNodeRef} {...attributes} {...listeners} style={styles} className="task">
            <div className="task__inner">
                <input
                    className="checkbox"
                    onChange={() => handleChecked(id)}
                    checked={checked}
                    type="checkbox"
                    name="checkbox"
                />
                <p className="task__text">{text}</p>
            </div>
            <button
                className="icon icon-delete"
                onClick={() => {
                    deleteTask(id);
                }}
            >
                <IconTrash className="trash" />
            </button>
        </li>
    );
};

export default Task;
