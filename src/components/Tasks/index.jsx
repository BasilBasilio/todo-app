import styles from './tasks.module.css';
import { Task } from '../Task';

export function Tasks({ tasks,  onComplete, onDelete, moveTask }) {
    const tasksQuantity = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    return (
        <section className={styles.tasks}>
            <header className={styles.header}>
                <div>
                    <p>Create tasks</p>
                    <span>{tasksQuantity}</span>
                </div>
                <div>
                    <p className={styles.textPurple}>Completed tasks</p>
                    <span>{completedTasks} of {tasksQuantity}</span>
                </div>
            </header>

            <div className={styles.list}>
                {tasks.map((task, index) => (
                    <Task 
                    key={task.id}
                    index={index} 
                    task={task} 
                    onComplete={onComplete} 
                    onDelete={onDelete}
                    moveTask={moveTask} 
                    />
                ))}
            </div>
        </section>
    )
}
