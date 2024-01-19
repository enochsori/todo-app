import { createContext, useEffect, useReducer, useState } from 'react';

export const TodoListContext = createContext();

export const TodoListProvider = ({ children }) => {
  // use local storage to save todo list for preserve todo data

  const getTodoFromLocalStorage = () => {
    console.log('called');
    const storedTodoList = localStorage.getItem('todo');
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  };

  const initialList = { todoList: getTodoFromLocalStorage() };

  const handleList = (state, action) => {
    // reset localStorage
    switch (action.type) {
      case 'add':
        return {
          ...state,
          todoList: [...state.todoList, action.payload],
        };
      case 'delete':
        return {
          ...state,
          todoList: state.todoList.filter((todo) => todo.id !== action.payload),
        };

      case 'completed':
        const updatedTodoList = state.todoList.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted,
            };
          }
          return todo;
        });
        return {
          ...state,
          todoList: [...updatedTodoList],
        };
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(handleList, initialList);

  const filterOptions = ['All', 'Active', 'Completed'];
  const [selectedOption, setSelectedOption] = useState(filterOptions[0]);

  const handleChangeFilter = (filter) => {
    setSelectedOption(filter);
  };

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(state.todoList));
  }, [state.todoList]);

  return (
    <TodoListContext.Provider
      value={{
        state,
        dispatch,
        selectedOption,
        handleChangeFilter,
        filterOptions,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};
