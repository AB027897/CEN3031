import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './css/index.module.css';
import Home from './App';
import Signup from './SignUp';
import Login from './Login';
import PageCreator from './PageCreator.jsx';
import Error from './404-page.jsx'

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/pagecreator" element={<PageCreator/>}></Route>
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

