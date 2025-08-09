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
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './protectedroute';
import Services from './pages/services';

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
          <Route path="/services" element={<Services />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/profile/:id" element={<ProtectedRoute allowedRoles={["patient"]}> <Profile /></ProtectedRoute>} />
          <Route path="/adminpanel" element={<ProtectedRoute allowedRoles={["doctor"]}>
            <AdminPanel />
          </ProtectedRoute>} />
        </Routes>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: '',
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: '#fff',
              color: '#000',
            },

            // Default options for specific types
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'white',
              },
            },
          }}
        />
      </BrowserRouter>

    </>
  );
}

export default App;
