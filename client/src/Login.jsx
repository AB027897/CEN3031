import React from 'react';
import {useState} from 'react';
import s from './css/Login.module.css';
import ajax from './utilities/ajax.js'
import User from './utilities/user.js';

function Login() {
  const [getErrorText, setErrorText] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const handleLogin = async () => {
    let user = new User(getEmail, getPassword);
    let text = await ajax(user, "/loginvalidation", true);
    if(typeof(text) !== "string") {
        setErrorText("");
    } else {
        setErrorText(text);
        setEmail("");
        setPassword("");
    }
};
  return (
    <div className={s.App}>
      <header className={s.App_header}>
        <h1 className={s.Title}>DonorGram</h1>
    <div className={s.App}>
      <header className={s.App_header}>
        <h1 className={s.Title}>DonorGram</h1>
      </header>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
            <h2 className={s.ItemTitleText}>Username</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..."/>
        </div>
        <div className={s.ItemTitle}>
        <div className={s.ItemTitle}>
            <h2 className={s.ItemTitleText}>Password</h2>
            <input className={s.TextField} type="password" placeholder="Enter Text..."/>
        </div>
        <p className={s.ErrorText}>{getErrorText}</p>
        <button className={s.button} onClick={()=> handleLogin()}>LOGIN</button>
        <p className={s.RedirectText}>Need an account? <a className={s.App_link} href="/signup" rel="noopener noreferrer">SIGN UP</a></p>
      </body>
    </div>
  );
}

export default Login;
export default Login;
