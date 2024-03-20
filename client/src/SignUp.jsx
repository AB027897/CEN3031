import React from 'react';
import { useState } from 'react';
import s from './SignUp.module.css'
import ajax from './ajax.js'

class User {
    constructor() {
       this.email = "";
       this.password = "";
    }
};


function Signup() {
    let user = new User()
    const [getDonorStatus, setDonorStatus] = useState(false);
    const [getCharityStatus, setCharityStatus] = useState(false);
    const [getErrorText, setErrorText] = useState("");
    const [getEmail, setEmail] = useState(user.email);
    const [getPassword, setPassword] = useState(user.password);
    const changeState = (type) => {
        if(type === "donor") {
            setDonorStatus(true);
            setCharityStatus(false);
        } else {
            setCharityStatus(true);
            setDonorStatus(false);
        }
    }
    const updateEmail = (val) => {
        user.email = val;
        setEmail(user.email);
    }
    const updatePassword = (val) => {
        user.password = val;
        setPassword(user.password);

    }
    const handleSignup = async () => {
        let text = await ajax(user, "/signupvalidation", true);
        if(text === "None") {
            setErrorText("");
        } else {
            setErrorText(text);
            updateEmail("");
            updatePassword("");
        }
    };
    return (
        <div className = {s.Page}>
            <header className={s.Title_Header}>
                <p className={s.Title}>DonorGram</p>
            </header>
            <div className={s.Account_Type_Div}>
                <input type = "radio" value="Donor" checked={getDonorStatus} className={s.Radio} onClick={()=> changeState("donor")}/>
                <p className={s.Type}>Donor</p> 
                <input type = "radio" value="Charity" checked={getCharityStatus} className={s.Radio} onClick={()=> changeState("charity")}/>
                <p className={s.Type}>Charity</p>
            </div>
            <div className={s.Inputs}>
                <h2 className={s.Field}>Username</h2>
                <input className={s.Text_Field} type="text" placeholder='Enter Text...'/> 
                <h2 className={s.Field}>Password</h2>
                <input className={s.Text_Field} type="password" placeholder='Enter Text...' onChange={(event) => updatePassword(event.target.value)} value={getPassword}/>
                <h2 className={s.Field}>Email</h2>
                <input className={s.Text_Field} type="text" placeholder='Enter Text...' onChange={(event)=> updateEmail(event.target.value)} value={getEmail}/>
                <h2 className={s.Field}>Phone Number</h2>
                <input className={s.Text_Field} type="text" placeholder='Enter Text...'/>
            </div>
            <p className={s.Error_Text}>{getErrorText}</p>
            <button className={s.Button} onClick={() => handleSignup()}>SIGN UP</button>
            <p className={s.Redirect_Text}>Have an account? <a className={s.App_link} href="/login" rel="noopener noreferrer">LOGIN</a></p>
        </div>
    );
}

export default Signup;