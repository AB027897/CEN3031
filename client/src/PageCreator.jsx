import React from 'react';
import {useState} from 'react';
import s from './css/PageCreator.module.css';
import ajax from './utilities/ajax.js'
import User from './utilities/user.js';

function Login() {
  const [getErrorText, setErrorText] = useState("");
  const [getTitle, setTitle] = useState("");
  const [getBody, setBody] = useState("");
  const handleLogin = async () => {
    let page = new User(getTitle, getBody);
    let text = await ajax(page, "/loginvalidation", true);
    if(typeof(text) !== "string") {
        setErrorText("");
    } else {
        setErrorText(text);
        setTitle("");
        setBody("");
    }
};
  return (
    <div className={s.App}>
      <header className={s.App_header}>
        <h1 className={s.Title}>PageCreator</h1>
      </header>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
            <h2>Username</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..." onChange={(event)=> setTitle(event.target.value)} value={getTitle}/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Password</h2>
            <input className={s.TextField} type="password" placeholder="Enter Text..." onChange={(event)=> setBody(event.target.value)} value={getBody}/>
        </div>
        <p className={s.ErrorText}>{getErrorText}</p>
        <button className={s.button} onClick={()=> handleLogin()}>LOGIN</button>
        <p className={s.RedirectText}>Need an account? <a className={s.App_link} href="/signup" rel="noopener noreferrer">SIGN UP</a></p>
      </body>
    </div>
  );
}

export default Login;
