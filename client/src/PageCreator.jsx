// the page creator is where charity's go to add data to their page, including the preview blurb, body text, and images.

import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/PageCreator.module.css';
import ajax from './utilities/ajax.js'
import Post from './utilities/post'
import {getToken, checkToken} from './utilities/token';
import {getAccount, getAccountInfo} from './utilities/account.js';

function Login() {
  // error for improper use of input fields
  const [getErrorText, setErrorText] = useState("");
  // locally stored data for input fields
  const [getCaption, setCaption] = useState("");
  const [getBody, setBody] = useState("");
  const [getFiles, setFiles] = useState([]);

  const navigate = useNavigate();
  
  useEffect(()=> {
    (async ()=> {
      // automatically route to login if login token is not found
      if(!checkToken()) {
        navigate("/login");
      }
    })();
  }, []);

  const createPosts = async () => {
    // fetch account
    const user = await getAccount();
    const userInfo = await getAccountInfo(user);
    // upload image data
    const imageData = new FormData();
    for(let i=0; i < getFiles.length; i++) {
      imageData.append("files"+i, getFiles[i]);

    }
    // upload text data
    const post = new Post(user["uuid"], userInfo["type"], getToken(), "title (remove)", getCaption, getBody);
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
            <h2 className={s.RightSpacing}>Preview Caption</h2>
            <input className={s.TextField} type="text" maxLength={200} placeholder="Enter Text..." onChange={(event)=> setCaption(event.target.value)} value={getCaption}/>
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