// temporary imports for placeholder images
import img1 from './images/Logo_Earth.png';
import img2 from './images/HomeIcon.png';
import img3 from './images/SearchIcon.png';
import img4 from './images/SettingsIcon.png';
import img5 from './images/Logo_Hands.png';

import hands from './images/Logo_Hands_Crop.png';
import React from 'react';
import {useState} from 'react';
import s from './css/PageViewer.module.css';

function Login() {
  const [getTitle] = useState("");
  const [getBody] = useState("");
  // something for getImages? idk how to do that
  const [getNewComment, setNewComment] = useState("");
  return (
    <div className={s.App}>
      <header className={s.App_header} value={getTitle}>
        <div style={{flex:1}}>
          <a className={s.BackButton} href="javascript:history.back()" rel="noopener noreferrer">&lt; Go Back</a>
        </div>
        <div style={{alignItems: 'cemter', flex: 6}}>
          <p className={s.Title}>American Red Cross</p>
        </div>
        <div style={{flex: 1}}/>
      </header>
      <body className={s.App_body}>
        <div className={s.PageBodyText}>
          <h2 value = {getBody}>
            Humanity
            <br/><br/>
            The Red Cross, born of a desire to bring assistance without discrimination to the wounded on the battlefield, endeavors—in its international and national capacity—to prevent and alleviate human suffering wherever it may be found. Its purpose is to protect life and health and to ensure respect for the human being. It promotes mutual understanding, friendship, cooperation and lasting peace amongst all peoples.
            <br/><br/><br/>
            Impartiality
            <br/><br/>
            It makes no discrimination as to nationality, race, religious beliefs, class or political opinions. It endeavors to relieve the suffering of individuals, being guided solely by their needs, and to give priority to the most urgent cases of distress.
            <br/><br/><br/>
            Neutrality
            <br/><br/>
            In order to continue to enjoy the confidence of all, the Red Cross may not take sides in hostilities or engage at any time in controversies of a political, racial, religious or ideological nature.
            <br/><br/><br/>
            Independence
            <br/><br/>
            The Red Cross is independent. The national societies, while auxiliaries in the humanitarian services of their governments and subject to the laws of their respective countries, must always maintain their autonomy so that they may be able at all times to act in accordance with Red Cross principles.
            <br/><br/><br/>
            Voluntary Service
            <br/><br/>
            The Red Cross is a voluntary relief movement not prompted in any manner by desire for gain.
            <br/><br/><br/>
            Unity
            <br/><br/>
            There can be only one Red Cross society in any one country. It must be open to all. It must carry on its humanitarian work throughout its territory.
            <br/><br/><br/>
            Universality
            <br/><br/>
            The Red Cross is a worldwide institution in which all societies have equal status and share equal responsibilities and duties in helping each other.
          </h2>
        </div>
        <div className={s.ImagesBG}>
          <div className={s.Images}>
            <img className={s.Image} src={img1} alt=""/>
            <img className={s.Image} src={img2} alt=""/>
            <img className={s.Image} src={img3} alt=""/>
            <img className={s.Image} src={img4} alt=""/>
            <img className={s.Image} src={img5} alt=""/>
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
    </div>
  );
}

export default Login;