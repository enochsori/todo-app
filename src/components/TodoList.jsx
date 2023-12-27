import { useContext, useEffect, useState } from 'react';
import styles from './TodoList.module.css';
import { FaRegTrashAlt } from 'react-icons/fa';
import { TodoListContext } from '../context/TodoListContext';

const TodoList = () => {
  const { state, dispatch, selectedOption } = useContext(TodoListContext);
  const [filteredList, setFilteredOptions] = useState([...state.todoList]);

  const handleRemoveTodo = (id) => {
    dispatch({ type: 'delete', payload: id });
  };

  const handleCompleteTodo = (id) => {
    dispatch({ type: 'completed', payload: id });
  };

  useEffect(() => {
    if (selectedOption === 'All') {
      setFilteredOptions([...state.todoList]);
    } else if (selectedOption === 'Active') {
      setFilteredOptions(state.todoList.filter((todo) => !todo.isCompleted));
    } else {
      setFilteredOptions(state.todoList.filter((todo) => todo.isCompleted));
    }
  }, [selectedOption, state.todoList]);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filteredList.map((todo) => (
          <li
            key={todo.id}
            className={`${todo.isCompleted && styles.isCompleted} ${
              styles.todo
            }`}
          >
            <input
              className={styles.checkbox}
              type='checkbox'
              id='checkbox'
              checked={todo.isCompleted}
              onChange={() => handleCompleteTodo(todo.id)}
            />
            <label htmlFor='checkbox' className={styles.text}>
              {todo.todo}
            </label>

            <span className={styles.icon}>
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                className={styles.button}
              >
                <FaRegTrashAlt />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
