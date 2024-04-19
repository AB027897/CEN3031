class Card {
    constructor(number, expMonth, expYear, cvc, dollarAmt, charity, token) {
        this.number = number;
        this.exp_month = expMonth;
        this.exp_year = expYear;
        this.cvc = cvc;
        this.amount = dollarAmt;
        this.charity = charity;
        this.token = token;
    }
}
export default Card;