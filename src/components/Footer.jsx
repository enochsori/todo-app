import { useContext, useState } from 'react';
import styles from './Footer.module.css';
import { TodoListContext } from '../context/TodoListContext';

const Footer = () => {
  const { dispatch } = useContext(TodoListContext);

  const [inputTodo, setInputTodo] = useState('');
  const handleInputChange = (event) => {
    setInputTodo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputTodo.trim().length === 0) {
      return;
    }

    const newTodo = { todo: inputTodo, isCompleted: false, id: Date.now() };
    dispatch({ type: 'add', payload: newTodo });

    // reset input
    setInputTodo('');
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.inputGroup}>
        <input
          type='text'
          placeholder='Add Todo'
          value={inputTodo}
          onChange={handleInputChange}
        />
        <button type='submit' disabled={inputTodo.trim().length === 0}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Footer;
