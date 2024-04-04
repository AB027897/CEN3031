# Instructions to Run
- Step 1: Go into the client folder and run the following command: npm install
- Step 2: Then, run the following command: npm run build
- Step 3: Go into the server folder and create a .env file using the following parameters obtained from firebase:
    - API_KEY
    - AUTH_DOMAIN
    - PROJECT_ID
    - STORAGE_BUCKET
    - MESSAGING_SENDER_ID
    - APP_ID
    - MEASUREMENT_ID
    - DATABASE_URL
- Step 4: Put the json file downloaded from service accounts in the firebase settings and rename it serviceAccount.json and put it in the server folder
- Step 5: Run the following command pip install -r requirements.txt
- Step 6: Run the command: python app.py
- Step 7: Go to your browser and type in the following url: localhost:3000 and that is the website
# IMPORTANT: Make sure your Node.js is at 20.11.0 and your Python version is at 3.12.2
## Note: You can use npm start in the client folder to just run the frontend but the server functionality will not work

