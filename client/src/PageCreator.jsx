import React from 'react';
import {useState} from 'react';
import s from './css/PageCreator.module.css';
import ajax from './utilities/ajax.js'
import User from './utilities/user.js';

function Login() {
  const [getErrorText, setErrorText] = useState("");
  const [getTitle, setTitle] = useState("");
  const [getCaption, setCaption] = useState("");
  const [getBody, setBody] = useState("");
  return (
    <div className={s.App}>
      <header className={s.App_header}>
      <view style={{flex:1}}>
          <a className={s.BackButton} href="javascript:history.back()" rel="noopener noreferrer">&lt; Go Back</a>
        </view>
        <view style={{alignItems: 'cemter', flex: 6}}>
          <h1 className={s.Title}>Charity Page Creator</h1>
        </view>
        <view style={{flex: 1}}/>
      </header>
      <body className={s.App_body}>
        <div className={s.ItemTitle}>
            <h2>Title</h2>
            <input className={s.TextField} type="text" value={getTitle} onChange={(event)=> setTitle(event.target.value)}/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Preview Caption</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..." onChange={(event)=> setCaption(event.target.value)} value={getCaption}/>
        </div>
        <div className={s.ItemTitle}>
            <h2>Page Body</h2>
            <form method="POST">
              <textarea className={s.BodyTextField} placeholder="Desribe your charity..." onChange={(event)=> setBody(event.target.value)} value={getBody}/>
            </form>
        </div>
        <div className={s.ItemTitle}>
          <h2>Upload Images</h2>
          <form method="POST">
            <input className={s.UploadText} type="file" id="myFile" name="filename" multiple="multiple"/>
          </form>
        </div>
        <p className={s.ErrorText}>{getErrorText}</p>
        <button className={s.ConfirmButton}>Confirm Changes</button>
      </body>
    </div>
  );
}

export default Login;