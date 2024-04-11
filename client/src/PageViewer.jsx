import hands from './images/Logo_Hands_Crop.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Account, {getAccount, getAccountInfo} from './utilities/account';
import ajax from './utilities/ajax';
import s from './css/PageViewer.module.css';
import { checkToken } from './utilities/token';
import loading from './images/loading.webp';

function Login() {
  const [getName, setName] = useState("")
  const [getTitle, setTitle] = useState("");
  const [getBody, setBody] = useState("");
  const [getCaption, setCaption] = useState("");
  const [getImageURLs, setImageURLS] = useState([]);
  const [getNewComment, setNewComment] = useState("");
  const [getLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=> {
    (async ()=> {
        if(!checkToken()) {
          navigate("/login");
        }
      const user = await getAccount();
      const userInfo = await getAccountInfo(user);
      setName(userInfo["name"]);
      const account = new Account(user["uuid"], user["token"], "", "", "", "", "", userInfo["type"]);
      const post = await ajax(account, "/getpost");
      setTitle(post["title"]);
      setBody(post["body"]);
      setCaption(post["preview_caption"]);
      const images = await ajax(account, "/getimage");
      setImageURLS(images);
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      {getLoading ? 
      <div className={s.Loading}>
        <img src={loading} className={s.Loading_img}></img>
      </div> :
      <div className={s.App}>
        <header className={s.App_header} value={getTitle}>
          <div style={{flex:1}}>
            <a className={s.BackButton} href="javascript:history.back()" rel="noopener noreferrer">&lt; Go Back</a>
          </div>
          <div style={{alignItems: 'cemter', flex: 6}}>
            <p className={s.Title}>{getName}</p>
          </div>
          <div style={{flex: 1}}/>
        </header>
        <body className={s.App_body}>
          <div className={s.PageBodyText}>
            <p>{getBody}</p>
          </div>
          <div className={s.ImagesBG}>
            <div className={s.Images}>
              {getImageURLs.map((url, i)=> (
                <img className={s.Image} src={url}></img>
              ))}
            </div>
          </div>
          <div className={s.DonateDiv}>
            <img className={s.HandsImage} src={hands} alt="two hands holding"/>
            <p className={s.TextAboveButton}>Show your support!</p>
            <button className={s.DonateButton}>
              <p className={s.DonateText}>DONATE</p>
            </button>
          </div>
          <div className={s.CommentsBG}>
            <div className={s.CommentsDiv}>
              <p className={s.CommentsHeader}>Comments</p>
              <div className={s.CommentEntry}>
                <p className={s.CommentDate}>3/20/24</p>
                <p className={s.CommentText}><b>Name</b>:<br/> Comment from user with name shown on the left</p>
              </div>
              <div className={s.CommentEntry}>
                <p className={s.CommentDate}>3/22/24</p>
                <p className={s.CommentText}><b>American Red Cross</b>:<br/> Comment from user with name shown on the left. This is an example intended to test comments that span multiple lines. This is an example intended to test comments that span multiple lines. This is an example intended to test comments that span multiple lines. This is an example intended to test comments that span multiple lines.. This is an example intended to test comments that span multiple lines.. This is an example intended to test comments that span multiple lines.</p>
              </div>
              <div className={s.CommentEntry}>
                <p className={s.CommentDate}>4/2/24</p>
                <p className={s.CommentText}><b>Paul Paulson</b>:<br/>Paul Paulson said a thing. In fact, he had much more thoughts than some of the other users leaving comments.</p>
              </div>
              <div className={s.CommentEntry}>
                <p className={s.CommentDate}>4/20/24</p>
                <p className={s.CommentText}><b>John Johnson</b>:<br/>Look another person had more thoughts to share, how exciting.</p>
              </div>
              <div>
                <form style={{flex:5}} method="POST">
                    <textarea className={s.TextField} placeholder="New Comment..." onChange={(event)=> setNewComment(event.target.value)} value={getNewComment}/>
                </form>
                <input style={{flex:1}}className={s.SubmitButton} type="submit" value="Post Comment"></input>
              </div>
              <br/>
              <br/>
            </div>
          </div>
        </body>
      </div>}
    </div>
  );
}

export default Login;