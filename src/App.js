import { Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import Game from './components/Game';



// Тут тільки роути Menu основний файл




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Menu/>}/>
        <Route path='/Game' element={<Game/>}/>
      </Routes>
    </div>
  );
}


export default App;
