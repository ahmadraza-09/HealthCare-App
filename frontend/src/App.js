import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import './App.css';
import './css/doctorcard.css'
import './css/header.css'
import './css/footer.css'
import './css/footer.css'
import './css/hero.css'
import './css/appointment.css'
import './css/worktutorial.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
