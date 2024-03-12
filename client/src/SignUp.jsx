import React from 'react';
import { useState } from 'react';
import './Signup.css'
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
        <div className = "Page">
            <header className="Title-Header">
                <p className="Title">DonorGram</p>
            </header>
            <div className="Account-Type-Div">
                <input type = "radio" value="Donor" checked={getDonorStatus} className="Radio" onClick={()=> changeState("donor")}/>
                <p className="Type">Donor</p> 
                <input type = "radio" value="Charity" checked={getCharityStatus} className="Radio" onClick={()=> changeState("charity")}/>
                <p className="Type">Charity</p>
            </div>
            <div className="Inputs">
                <p className="Field">Username:</p>
                <input className="Text-Field" type="text" placeholder='Enter Text...'/> 
                <p className='Field'>Password:</p>
                <input className="Text-Field" type="password" placeholder='Enter Text...' onChange={(event) => user.password = event.target.value}/>
                <p className='Field'>Email:</p>
                <input className="Text-Field" type="text" placeholder='Enter Text...' onChange={(event)=> user.email = event.target.value }/>
                <p className='Field'>Phone Number:</p>
                <input className="Text-Field" type="text" placeholder='Enter Text...'/>
            </div>
            <p className="Error-Text">* Invalid Email Address or Password</p>
            <button className="Button" onClick={() => ajax(user, "/signupvalidation", true)}>SIGN UP</button>
            <p className="Redirect-Text">Have an account? <a className="App-link" href="/login" rel="noopener noreferrer">LOGIN</a></p>
        </div>
    );
}

export default Signup;