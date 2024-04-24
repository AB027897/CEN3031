// The login page is where users go to sign in to an existing donor/charity account.
// this page includes error checking but will not indicate whether password or email was incorrect for security reasons.

import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/Login.module.css';
import ajax from './utilities/ajax.js'
import User from './utilities/user.js';
import Account from './utilities/account.js'
import {setToken, checkToken} from './utilities/token.js';

function Login() {
  // error text
  const [getErrorText, setErrorText] = useState("");
  // local data for entry fields
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");

  const navigate = useNavigate();
  
  useEffect(()=> {
    (async ()=> {
      // automatically routes to for-you page if a log-in token is already detected.
      // this allows users who recently signed in to quickly sign back in
      if(checkToken()) {
        navigate("/fyp");
      }
    })();
  }, []);

  const handleLogin = async () => {
    // attempt login
    let user = new User(getEmail, getPassword);
    let text = await ajax(user, "/loginvalidation");
    

    if(typeof(text) !== "string") { // valid signin attempt
        setErrorText("");
        setToken(text['token']);
        let account = new Account(text['localId'], text['token']);
        let accountInfo = await ajax(account, "/getaccountinfo");
        navigate("/fyp");
    } else { // invalid sign in attempt - yields an error message which is formatted to be better readable to users
        if(text=="INVALID_EMAIL")
        {
          setErrorText("Email address must be valid");
        }
        else if(text=="INVALID_LOGIN_CREDENTIALS")
        {
          setErrorText("Invalid username or password");
        }
        else {
          setErrorText(text);
        }
        // clear email and password fields after failed sign in attempt
        setEmail("");
        setPassword("");
    }
};
  return (
    <div className={s.App}>
      <header className={s.App_header}>
        <h1 className={s.Title}>DonorGram</h1>
      </header>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
            <h2>Email</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..." onChange={(event)=> setEmail(event.target.value)} value={getEmail}/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Password</h2>
            <input className={s.TextField} type="password" placeholder="Enter Text..." onChange={(event)=> setPassword(event.target.value)} value={getPassword}/>
        </div>
        <p className={s.ErrorText}>{getErrorText}</p>
        <button className={s.button} onClick={()=> handleLogin()}>LOGIN</button>
        <p className={s.RedirectText}>Need an account? <a className={s.App_link} href="/signup" rel="noopener noreferrer">SIGN UP</a></p>
      </body>
    </div>
  );
}

export default Login;
