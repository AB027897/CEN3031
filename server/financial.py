import stripe
from dotenv import load_dotenv
import os

load_dotenv()

stripe.api_key = os.getenv("STRIPE_API_KEY")

def create_charity_account(email):
    try:
        account = stripe.Account.create(
            type="express",
            country="US",
            email=email,
            capabilities={
                "transfers": {"requested": True},
            },
        )
        return account
    except Exception as e:
        return str(e)
    
def create_bank_account(id, account_number, routing_number, country):
    source= {
        "account_number": account_number,
        "routing_number": routing_number, 
        "country": country, 
        "currency" : "usd"
    }
    stripe.Customer.create_source(id, source=source)

        
def create_card_token(number, exp_month, exp_year, cvc):
    card = {
        "number": number,
        "exp_month": exp_month,
        "exp_year": exp_year,
        "cvc": cvc
    }
    return stripe.Token.create(card)

def charge_card(amount, token):
    stripe.Charge.create(amount=amount, currency="usd", source=token, description="Donation")

def transfer_money(amount, charity):
    stripe.Transfer.create(amount=amount, currency="usd", destination=charity)