import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
<<<<<<< HEAD
import "./index.css"
=======
import './index.module.css';
>>>>>>> 9557a9e200c05dc12429d75fed3711fa9ff52bf0
import Home from './App';
import Signup from './SignUp';
import Login from './Login';
import Error from './404-page.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="*" element={<Error/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

