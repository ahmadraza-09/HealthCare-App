import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Doctor from './pages/doctor';
import About from './pages/about';
import Contact from './pages/contact';
import Appointment from './pages/appointment';
import Profile from './pages/profile';
import AdminPanel from './pages/adminpanel';
import './App.css';
import './css/doctorcard.css'
import './css/header.css'
import './css/footer.css'
import './css/footer.css'
import './css/hero.css'
import './css/appointment.css'
import './css/worktutorial.css'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>

    </>
  );
}

export default App;
