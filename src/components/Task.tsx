import { FC } from "react";

interface TaskProps {
    index: number;
    text: string;
    deleteTask: (index: number) => void;
}

const Task: FC<TaskProps> = (props) => {
    const { index, text, deleteTask } = props;

    return (
        <li className="task" key={index}>
            <p className="task__text">
                {index + 1}.&nbsp;{text}
            </p>
            <button className="button button-delete" onClick={() => deleteTask(index)}>
                Delete
            </button>
        </li>
    );
};

export default Task;
