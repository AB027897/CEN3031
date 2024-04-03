import React from 'react';
import {useState} from 'react';
import s from './css/PageCreator.module.css';
import ajax from './utilities/ajax.js'
import Post from './utilities/post'
import { getToken } from './utilities/token';
import {getAccount, getAccountInfo} from './utilities/account.js';

function Login() {
  const [getErrorText, setErrorText] = useState("");
  const [getTitle, setTitle] = useState("");
  const [getCaption, setCaption] = useState("");
  const [getBody, setBody] = useState("");
  const [getFiles, setFiles] = useState([]);
  const createPosts = async () => {
    const user = await getAccount();
    const userInfo = await getAccountInfo(user);
    const imageData = new FormData();
    for(let i=0; i < getFiles.length; i++) {
      imageData.append("files"+i, getFiles[i]);

    }
    const post = new Post(user["uuid"], userInfo["type"], getToken(), getTitle, getCaption, getBody);
    await ajax(post, "/addpost");
    await ajax(post, "/addimage", "post", imageData, "multipart/form-data");
  }
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
            <h2 className={s.RightSpacing}>Title</h2>
            <input className={s.TextField} type="text" placeholder="Enter Text..." value={getTitle} onChange={(event)=> setTitle(event.target.value)}/>
        </div>
        <div className={s.ItemTitle}>
            <h2 className={s.RightSpacing}>Preview Caption</h2>
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
            <input className={s.UploadText} type="file" id="myFile" name="filename" multiple="multiple" accept=".png, .jpeg, .jpg, .tiff" onChange={(event)=> setFiles(event.target.files)}/>
          </form>
        </div>
        <p className={s.ErrorText}>{getErrorText}</p>
        <button className={s.ConfirmButton} onClick={()=> createPosts()}>Confirm Changes</button>
      </body>
    </div>
  );
}

export default Login;