import stripe
from dotenv import load_dotenv
import os

load_dotenv()

stripe.api_key = os.getenv("STRIPE_API_KEY")

def create_charity_account(email, country):
    try:
        account = stripe.Account.create(
            type="express",
            country= country,
            email=email,
            capabilities={
                "transfers": {"requested": True},
            },
        )
        return account
    except Exception as e:
        return str(e)
    
def create_bank_account(id, account_number, routing_number, country):
    account= {
        "object": "bank_account",
        "account_number": account_number,
        "routing_number": routing_number, 
        "country": country, 
        "currency" : "usd"
    }
    try:
        stripe.Account.create_external_account(id, external_account=account)
    except Exception as e:
        return str(e)

def charge_card(amount, token):
    try:
        stripe.Charge.create(amount=amount, currency="usd", source=token, description="Donation")
    except Exception as e:
        return str(e)

def transfer_money(amount, charity):
    stripe.Transfer.create(amount=amount, currency="usd", destination=charity)