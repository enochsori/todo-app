import { useContext } from 'react';
import { MdDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import styles from './Header.module.css';
import { useDarkMode } from '../context/DarkModeContext';
import { TodoListContext } from '../context/TodoListContext';
import { VscGithubInverted } from 'react-icons/vsc';

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const { filterOptions, selectedOption, handleChangeFilter } =
    useContext(TodoListContext);

  const handleSelect = (option) => {
    handleChangeFilter(option);
  };

  return (
    <div className={styles.header}>
      <div className={styles.setting}>
        <button className={styles.toggleButton}>
          {darkMode ? (
            <MdDarkMode onClick={toggleDarkMode} />
          ) : (
            <CiLight onClick={toggleDarkMode} />
          )}
        </button>

        <a href='https://github.com/enochsori/todo-app' target='_blank'>
          <VscGithubInverted />
        </a>
      </div>

      <ul className={styles.filters}>
        {filterOptions.map((option, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                option === selectedOption && styles.selected
              }`}
              key={index}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
