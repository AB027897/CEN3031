import hands from './images/Logo_Hands_Crop.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import Account, {getAccount, getAccountInfo} from './utilities/account';
import ajax from './utilities/ajax';
import s from './css/PageViewer.module.css';
import { checkToken, getToken } from './utilities/token';
import loading from './images/loading.webp';

function Login() {
  const [getName, setName] = useState("")
  const [getTitle, setTitle] = useState("");
  const [getBody, setBody] = useState("");
  const [getImageURLs, setImageURLS] = useState([]);
  const [getNewComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [getLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=> {
    (async ()=> {
      if(!checkToken()) {
        navigate("/login");
      }
      let uuid = "";
      if(localStorage.getItem("Post") !== null) {
        uuid = localStorage.getItem("Post");
      }
      const user = await getAccount(uuid);
      const userInfo = await getAccountInfo(user);
      setName(userInfo["name"]);
      const account = new Account(user["uuid"], user["token"], "", "", "", "", "", userInfo["type"]);
      const post = await ajax(account, "/getpost");
      setTitle(post["title"]);
      setBody(post["body"]);
      const images = await ajax(account, "/getimage");
      setImageURLS(images);
      setLoading(false);
      getComments();
    })();
  }, []);

  const getComments = async () => {
    const data = {
      "token": getToken()
    }
    const response = await ajax(data, "/get_comments");
    setComments(response);
  }

  const handleDonate = async () => {
    if(localStorage.getItem("Post") !== null) {
      //navigate("/donate");
      const data = {
        "charity" : localStorage.getItem("Posts"),
        "amount": 100, 
        "token": getToken()
      }
      const message = await ajax(data, "/financial")

      setComments(message)
    } 
  };

  const handleSubmit = async() => {
    const data = {
      "comment": getNewComment.trim(),
      "token": getToken()
    }
    setNewComment("")
    await ajax(data, "/add_comment");
    getComments()
  };

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
            <button className={s.DonateButton} onClick={() => handleDonate()}>
              <p className={s.DonateText}>DONATE</p>
            </button>
          </div>
          <div className={s.CommentsBG}>
            <div className={s.CommentsDiv}>
              <p className={s.CommentsHeader}>Comments</p>
              {comments.map((comment, index) => (
                <div className = {s.CommentEntry} key={index}>
                  <p className = {s.CommentDate}> {comment.date} </p>
                  <p className = {s.CommentText}>
                    <b>{comment.name}</b>: <br />
                    {comment.text}
                  </p>
                </div>
            ))}
              
              <div>
              <form onSubmit={handleSubmit} style={{ flex: 5 }}>
                  <textarea className={s.TextField} placeholder="New Comment..." onChange={(event) => setNewComment(event.target.value)} value={getNewComment} />
                  <input style={{ flex: 1 }} className={s.SubmitButton} type="submit" value="Post Comment" />
                </form>
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