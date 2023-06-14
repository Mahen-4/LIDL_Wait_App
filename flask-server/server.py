from flask import Flask, request
from flask_pymongo import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://user1:fBTJAgfCMfN4Om68@cluster0.lnmsrd4.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
db = client['product']
collection = db.allProduct




@app.route("/game_fruit&Legume", methods = ['GET'])
def productGame_Fruit_Legume():
    try:
        allFruit_Legume = db.allProduct.find({"type": "Fruit&Legume"},{"_id": 0})
        list_cursor = list(allFruit_Legume)
        return {"product": list_cursor}
    except Exception:
        return {"error": Exception}

@app.route("/test")
def test():
    return {"testt": "done !"}


if __name__ == "__main__":
    app.run(debug=True)