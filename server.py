import time
import os
import json
import logging
from flask import *
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./client/build/static')
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# Database Config
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DB_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# Models
class Client(db.Model):
    """ user schema model """
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    timestamp = db.Column(db.Integer, primary_key=True, nullable=False)

    def __rep__(self):
        return '<CLient %r >' % (self.name)

# utils
def insert(user_name, user_email, user_img):
    """ insert data in database """
    t = time.time()
    user = Client(name=user_name, email=user_email, img_url = user_img, timestamp = t)
    db.session.add(user)
    db.session.commit()
    return True

# Routes 
@app.route('/', defaults={"filename" : "index.html"})
def home(filename):
    return send_from_directory('./client/build', filename)

@app.route('/api/cred', methods = ['POST'])
def userCred():
    """ api to collect user credentials """
    user = request.data
    user = user.decode("utf-8")
    user = json.loads(user)
    # print("\nDATA : ", user["name"], " ", user["email"])
    if insert(user["name"], user["email"], user["img_url"]) :
        return "OK"
    else: return "Failed"

# development
env = os.getenv("ENV")

if __name__ == '__main__':
    if env == "DEV":
        print("Running on DEV mode")
        app.run(host="127.0.0.1", port=5000, debug=True)
    else:
        app.run(debug=False)
    

 