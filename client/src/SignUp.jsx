import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './css/SignUp.module.css'
import ajax from './utilities/ajax.js'
import phoneNumberFormat from './utilities/phoneNumberFormat.js';
import User from './utilities/user.js';
import Account from './utilities/account.js'
import {setToken} from './utilities/token.js';

function Signup() {
    const [getDonorStatus, setDonorStatus] = useState(false);
    const [getCharityStatus, setCharityStatus] = useState(false);
    const [getErrorText, setErrorText] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getConfirmPassword, setConfirmPassword] = useState("");
    const [getPhoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate();
    const changeState = (type) => {
        if(type === "donor") {
            setDonorStatus(true);
            setCharityStatus(false);
        } else {
            setCharityStatus(true);
            setDonorStatus(false);
        }
    }
    const formatPhoneNumber = (phoneNumber) => {
        setPhoneNumber(phoneNumberFormat(phoneNumber));
      }; 
    const handleSignup = async () => {
        let user = new User(getEmail, getPassword, getConfirmPassword);
        if(!user.validatePasswords()) {
            setErrorText("Passwords do not match!");
            return;
        } 
        let accountType = 'donor';
        if(!getDonorStatus && !getCharityStatus) {
            setErrorText("Need to select an account type!");
            return;
        } else if(getCharityStatus) {
            accountType = 'charity'
        }
        let text = await ajax(user, "/signupvalidation");
        console.log(text);
        const phoneNumber = getPhoneNumber.replace(/[-() ]/g, "");
        if(typeof(text) !== "string") {
            setErrorText("");
            setToken(text['token']);
            let account = new Account(text['localId'], text['token'], accountType, phoneNumber, getEmail);
            await ajax(account, "/addaccountinfo");
            if(accountType === 'donor') {
                navigate("/donoraccount");
            } else {
                navigate("/charityaccount");
            }
        } else {
            setErrorText(text);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhoneNumber("");
        }
    };
    return (
        <div className = {s.Page}>
            <header className={s.Title_Header}>
                <p className={s.Title}>DonorGram</p>
            </header>
            <div className={s.App_body}>
                <div className={s.Account_Type_Div}>
                    <input type = "radio" value="Donor" checked={getDonorStatus} className={s.Radio} onClick={()=> changeState("donor")}/>
                    <p className={s.Type}>Donor</p> 
                    <input type = "radio" value="Charity" checked={getCharityStatus} className={s.Radio} onClick={()=> changeState("charity")}/>
                    <p className={s.Type}>Charity</p>
                </div>
                <div className={s.Inputs}>
                    <div className={s.Field}>
                        <h2 className={s.FieldTitleText}>Email</h2>
                    </div>
                    <input className={s.Text_Field} type="text" placeholder='Enter Text...' onChange={(event)=> setEmail(event.target.value)} value={getEmail}/>
                    <div className={s.Field}>
                        <h2 className={s.FieldTitleText}>Password</h2>
                    </div>
                    <input className={s.Text_Field} type="password" placeholder='Enter Text...' onChange={(event) => setPassword(event.target.value)} value={getPassword}/>
                    <div className={s.Field}>
                        <h2 className={s.FieldTitleText}>Confirm Password</h2>
                    </div>
                    <input className={s.Text_Field} type="password" placeholder='Enter Text...' onChange={(event)=> setConfirmPassword(event.target.value)} value={getConfirmPassword}/>
                    <div className={s.Field}>
                        <h2 className={s.FieldTitleText}>Phone Number</h2>
                    </div>
                    <input className={s.Text_Field} type="text" placeholder="(XXX) XXX-XXXX" maxLength={14} value={getPhoneNumber} onChange={(event) => formatPhoneNumber(event.target.value)}/>
                </div>
                <p className={s.Error_Text}>{getErrorText}</p>
                <button className={s.Button} onClick={() => handleSignup()}>SIGN UP</button>
                <p className={s.Redirect_Text}>Have an account? <a className={s.App_link} href="/login" rel="noopener noreferrer">LOGIN</a></p>
            </div>
        </div>
    );
}

export default Signup;