import styles from './task.module.css'
import { TbTrash } from 'react-icons/tb'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useDrag, useDrop } from 'react-dnd';

const ITEM_TYPE = 'TASK';

export function Task({ task, index, onComplete, onDelete, moveTask }) {
        const [{ isDragging }, drag] = useDrag({
            type: ITEM_TYPE,
            item: { index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });
    
        const [, drop] = useDrop({
            accept: ITEM_TYPE,
            hover: (draggedItem) => {
                if (draggedItem.index !== index) {
                    moveTask(draggedItem.index, index);
                    draggedItem.index = index;
                }
            },
        });
    return(
        <div
        ref={(node) => drag(drop(node))}
        className={styles.task}
        style={{ opacity: isDragging ? 0.5 : 1 }}
    >
            <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
                {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
            </button>
            <p className={task.isCompleted ? styles.textCompleted : ""}>{task.title}</p>
            <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
                <TbTrash size={20} />
            </button>
        </div>
    )
}