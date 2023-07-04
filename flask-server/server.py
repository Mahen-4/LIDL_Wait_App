from flask import Flask, request
from flask_pymongo import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS
from flask_bcrypt import Bcrypt

import os
#mdp : Zz&1zzzzzz
app = Flask(__name__)
CORS(app)

#MONGO DB CONNECTION
uri = os.environ.get("MONGODB_URI")
client = MongoClient(uri)
dbProduct = client['product']
dbUser = client['users']

#bcrypt
bcrypt = Bcrypt(app)



@app.route("/game_fruit&Legume", methods = ['GET'])
def productGame_Fruit_Legume():
    try:
        allFruit_Legume = dbProduct.allProduct.find({"type": "Fruit&Legume"},{"_id": 0})
        list_cursor = list(allFruit_Legume)
        return {"product": list_cursor}
    except Exception:
        return {"error": Exception}

@app.route("/createAcc")
def createAcc():
    try:
        result = dbUser.user_detail.find_one({'email':'dsada'})
        if result:
            return {"message" : "Email déjà utilisé"}
        else:
            #insert an user
            #pw_hash = bcrypt.generate_password_hash('Zz&1zzzzzz')
            #userExist = dbUser.user_detail.insert_one({"username": "original","mail": "original@gmail.com", "mdp": pw_hash, "points": 0})
            return {"message": "Creation de compte reussi !"}
    except Exception:
        return {"err": Exception}

@app.route("/logIn", methods = ['POST', 'GET'])
def logIn():
    if request.method == 'POST':
        mail = request.json['mail']
        password = request.json['password']
        try:
            userExist  = dbUser.user_detail.find_one({"mail": mail},{"_id": 0})
            if userExist:
                checkPassword = bcrypt.check_password_hash(userExist['mdp'], password)
                if checkPassword:
                    return {"Connexion Status" : "Connected", "userData": {"username": userExist['username'],"mail": userExist['mail'], "points": userExist['points']} }
                else:
                    return {"err": "Mauvais mot de passe"}
            else:
                return {"err": "Cette utilisateur n'existe pas"}
        except Exception:
            return{"err": Exception}
    else: 
        return {"get": "get"}

if __name__ == "__main__":
    app.run(debug=True)