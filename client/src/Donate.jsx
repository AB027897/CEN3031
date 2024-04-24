import React from 'react';
import {Elements, useElements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import StripeComponent from './utilities/stripeComponent.jsx';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/Donate.module.css';
import {getAccount, getAccountInfo} from './utilities/account';
import ajax from './utilities/ajax.js';
import {checkToken, getToken} from './utilities/token.js';
import loading from './images/loading.webp';
import Card from './utilities/card.js';


function Donate() {
  // header
  const [getName, setName] = useState("");
  // input variables
  const [getDollarAmt, setDollarAmt] = useState("");
  const stripe = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
  // error
  const [getErrorText, setErrorText] = useState("");
  // loading
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
      setLoading(false);
    })();
  }, [])
  const donate = async(cardToken)=> { 
    const regex = /^\d*\.?\d*$/;
    if(getDollarAmt === "" || Number(getDollarAmt) < 0.5 || !regex.test(getDollarAmt)) {
      setErrorText("Must have a valid dollar amount.")
      return;
    }
    const card = new Card(cardToken, Number(getDollarAmt)*100, localStorage.getItem("Post"), getToken());
    const message = await ajax(card, "/donatecharity");
    if(message === null) {
      navigate("/fyp");
    }
    if(message !== "") {
      setErrorText(message);
    } else {
      navigate("/fyp");
    }
  }
  return (
    <div>
      {getLoading ? 
      <div className={s.Loading}> 
        <img src={loading} className={s.Loading_img} ></img> 
      </div> :
      <div className={s.App}>
        <header className={s.App_header}>
          <div style={{flex:1}}>
            <a className={s.BackButton} href="javascript:history.back()" rel="noopener noreferrer">&lt; Go Back</a>
          </div>
          <div style={{alignItems: 'center', flex: 6}}>
            <p className={s.Title}>{getName}</p>
          </div>
          <div style={{flex: 1}}/>
        </header>
        <body className={s.App_body}>
          <div className={s.ContributionAmtDiv}>
            <div className={s.ItemTitle}>
                <h2>Contribution Amount</h2>
                <div className={s.ContributionHorDiv}>
                  <h2 className={s.DollarSignSpacing}>$</h2>
                  <input className={s.TextFieldDollars} type="text" placeholder="0.00" value={getDollarAmt} onChange={(event) => setDollarAmt(event.target.value)}/>
                </div>
            </div>
          </div>  
          <Elements stripe={stripe}>
            <StripeComponent donation={donate}/>
          </Elements>
          <p className={s.ErrorText}>{getErrorText}</p>
        </body>
      </div>}
    </div>
  );
}

export default Donate;
