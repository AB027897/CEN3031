import React from 'react';
import {useState} from 'react';
import s from './css/PageViewer.module.css';

function Login() {
  const [getTitle] = useState("");
  const [getBody] = useState("");
  // something for getImages? idk how to do that

  return (
    <div className={s.App}>
      <header className={s.App_header} value={getTitle}>
        <view style={{flex:1}}>
          <a className={s.BackButton} href="javascript:history.back()" rel="noopener noreferrer">&lt; Go Back</a>
        </view>
        <view style={{alignItems: 'cemter', flex: 6}}>
          <h1 className={s.Title}>Title</h1>
        </view>
        <view style={{flex: 1}}/>
      </header>
      <body className={s.App_body}>
        <div className={s.PageBodyText}>
            <h2 value = {getBody}>PageBody</h2>
        </div>
        <div className={s.Images}>
            <h2>Replace w/ Images</h2>
        </div>
      </body>
    </div>
  );
}

export default Login;
