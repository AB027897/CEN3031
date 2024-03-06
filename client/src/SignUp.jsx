import React from 'react';
import { useState } from 'react';
import './Signup.css'


function Signup() {
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
            <p className="Title">DonorGram</p>
            <p className="Account-Type">Account Type</p>
            <div className="Account-Type-Div">
                <input type = "radio" value="Donor" checked={getDonorStatus} onClick={()=> changeState("donor")}/>
                <p className="Type">Donor</p> 
                <input type = "radio" value="Charity" checked={getCharityStatus} onClick={()=> changeState("charity")}/>
                <p className="Type">Charity</p>
            </div>
            <p className="Username">Username</p>
            <input className="Text-Field" type="text" placeholder='Enter Text'/>
        </div>
        
    );
}


export default Signup;