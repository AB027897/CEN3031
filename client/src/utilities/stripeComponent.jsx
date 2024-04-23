import React from "react";
import {useElements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, } from "@stripe/react-stripe-js";
import s from "../css/Stripe.module.css"
const StripeComponent = ({donation}) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const donate = async() => {
        const card = elements.getElement(CardNumberElement);
        const cardToken = await stripe.createToken(card);
        donation(cardToken); 
    }
    return (
        <div>
            <CardNumberElement/>
            <CardExpiryElement/>
            <CardCvcElement/>
            <hr className={s.BarSep}/>
            <div className={s.ButtonDiv}>
                <button className={s.button} onClick={() => donate()}>CONFIRM</button>
            </div>
        </div>
    )
}

export default StripeComponent;