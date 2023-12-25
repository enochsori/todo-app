import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import Card from './components/Card';
import { DarkModeProvider } from './context/DarkModeContext';
import { TodoListProvider } from './context/TodoListContext';

function App() {
  return (
    <DarkModeProvider>
      <TodoListProvider>
        <>
          <Card>
            <Header />
            <TodoList />
            <Footer />
          </Card>
        </>
      </TodoListProvider>
    </DarkModeProvider>
  );
}

export default App;
