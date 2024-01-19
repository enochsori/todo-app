import { createContext, useContext, useEffect, useState } from 'react';

// export const DarkModeContext = createContext();
const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    // setDarkMode((prevMode) => !prevMode);
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    // check user's previous mode setting in browser local storage and os setting.
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('prefers-color-scheme: dark').matches);

    // initial setting using user's preference
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// implementing dark mode using darkMode state : directly add a class in DOM
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    // store changed mode in localStorage
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    // store changed mode in localStorage
    localStorage.theme = 'light';
  }
}

// effective way to use context!
// no need to remember the context name in the component where need to use this context.
export const useDarkMode = () => useContext(DarkModeContext);
