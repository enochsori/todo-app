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
    <div className={styles.wrapper}>
      <ul className={styles.todoList}>
        {filteredList.map((todo) => (
          <li
            key={todo.id}
            className={`${todo.isCompleted && styles.isCompleted} ${
              styles.listItem
            }`}
          >
            <div>
              <input
                type='checkbox'
                checked={todo.isCompleted}
                onChange={() => handleCompleteTodo(todo.id)}
              />
              <span>{todo.todo}</span>
            </div>
            <button onClick={() => handleRemoveTodo(todo.id)}>
              <FaRegTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
