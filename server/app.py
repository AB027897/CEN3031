from flask import Flask
#from flask_cors import CORS

app = Flask(__name__)
#CORS(app)
@app.route("/test")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == "__main__":
    app.run(debug=True)
    #app.run(host="127.0.0.1", port=3000, debug=True)