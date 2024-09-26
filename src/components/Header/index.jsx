import styles from './header.module.css'
import todoLogo from '../../assets/todoLogo.svg'
import { useState } from 'react'

export function Header({ onAddTask }) {
    const [title, setTitle] = useState('');
    function handleSubmit(evt) {
        evt.preventDefault();
        onAddTask(title);
        setTitle('');
    }
    function onChangeTitle(evt){
        setTitle(evt.target.value);
    }
    return (
        <header className ={styles.header}>
        <img src={todoLogo} />
        <form onSubmit={handleSubmit} className={styles.newTaskForm}>
            <input placeholder="Add new task" type="text" value={title} onChange={onChangeTitle} />
            <button>Create</button>
        </form>
        </header>
    )
} 