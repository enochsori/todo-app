import { createContext, useReducer, useState } from 'react';

export const TodoListContext = createContext();

const initialList = { todoList: [] };

export const TodoListProvider = ({ children }) => {
  const handleList = (state, action) => {
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
