from flask import Flask, request, session;
from flask_pymongo import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS
import os
from flask_bcrypt import Bcrypt


#mdp : Zz&1zzzzzz
app = Flask(__name__)
app.secret_key = str(os.environ.get("APP_SECRET_KEY"))
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
        return {"error": str(Exception) }

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
        print(Exception)
        return {"err": str(Exception)}

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
                    
                    session['sessionUP'] = True
                    session['username'] = str(userExist['username'])
                    session['userMail'] = str(userExist['mail'])
                    session['userPoints'] = str(userExist['points'])
                    return {"Connexion Status" : "Connected", "userData": {"username": userExist['username'],"mail": userExist['mail'], "points": userExist['points']} }
                else:
                    return {"err": "Mauvais mot de passe"}
            else:
                return {"err": "Cette utilisateur n'existe pas"}
            
        except Exception as e:
            return{"err": str(e)}
    else:
        return{"method": "get"}
    
@app.route("/updatePoints", methods = ['POST'])
def updatePoints():
    points = request.json['points'] + session['userPoints']
    mail = request.json['mail']
    try:
        dbUser.user_detail.update_one({"mail": mail}, {"$set": {"points": points}})
        return {"update": "done"}
    except Exception:
        return {"err": str(Exception)}

@app.route("/sessionUP", methods = ['GET'])
def sessionUP():
    if "sessionUP" in session:
        return{
            "username":  session['username'],
            "userMail":  session['userMail'],
            "userPoints":  session['userPoints']
        }
    else :
         return{"session":"off"}


if __name__ == "__main__":
    app.run(debug=True)