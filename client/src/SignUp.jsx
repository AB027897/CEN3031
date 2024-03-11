import React from 'react';
import { useState } from 'react';
import s from './SignUp.module.css'

class User {
    constructor() {
       this.email = "";
       this.password = "";
    }
}
const ajax = (userInfo) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/signupvalidation", true);
    xhttp.setRequestHeader("account", JSON.stringify(userInfo));
    xhttp.send();
}

function Signup() {
    let user = new User()
    const [getDonorStatus, setDonorStatus] = useState(false);
    const [getCharityStatus, setCharityStatus] = useState(false);
    const changeState = (type) => {
        if(type === "donor") {
            setDonorStatus(true);
            setCharityStatus(false);
        } else {
            setCharityStatus(true);
            setDonorStatus(false);
        }
    }
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
                <input className={s.Text_Field} type="password" placeholder='Enter Text...' onChange={(event) => user.password = event.target.value}/>
                <h2 className={s.Field}>Email</h2>
                <input className={s.Text_Field} type="text" placeholder='Enter Text...' onChange={(event)=> user.email = event.target.value }/>
                <h2 className={s.Field}>Phone Number</h2>
                <input className={s.Text_Field} type="text" placeholder='Enter Text...'/>
            </div>
            <p className={s.Error_Text}>* Invalid Email Address or Password</p>
            <button className={s.Button} onClick={() => ajax(user)}>SIGN UP</button>
            <p className={s.Redirect_Text}>Have an account? <a className={s.App_link} href="/login" rel="noopener noreferrer">LOGIN</a></p>
        </div>
    );
}




export default Signup;