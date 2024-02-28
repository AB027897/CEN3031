from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "Hello World"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True)