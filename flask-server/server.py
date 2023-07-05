from flask import Flask, request, session
from flask_pymongo import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()
import os
from flask_bcrypt import Bcrypt


#mdp : Zz&1zzzzzz
app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
CORS(app)

#MONGO DB CONNECTION
uri = os.getenv("MONGODB_URI")
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

@app.route("/createAcc", methods = ['POST'] )
def createAcc():
    username = request.json['username']
    mail = request.json['mail']
    password = request.json['mdp']
    try:
        result = dbUser.user_detail.find_one({'mail':mail})
        if result:
            return {"message" : "Email déjà utilisé"}
        else:
            #insert an user
            pw_hash = bcrypt.generate_password_hash(password)
            userExist = dbUser.user_detail.insert_one({"username": username,"mail": mail, "mdp": pw_hash, "points": 0})
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
    points = request.json['points']
    mail = request.json['mail']
    user  = dbUser.user_detail.find_one({"mail": mail},{"_id": 0})
    try:
        dbUser.user_detail.update_one({"mail": mail}, {"$set": {"points": points + user['points'] +1}})
        return {"update": "done"}
    except Exception:
        return {"err": str(Exception)}

@app.route("/getInfo", methods = ['GET', 'POST'])
def getInfo():
    mail = request.json['mail']
    if(mail):
        user  = dbUser.user_detail.find_one({"mail": mail},{"_id": 0})
        return {"userData": {"username": user['username'],"mail": user['mail'], "points": user['points']} }
    else:
        return {"profil": "no Profil"}

if __name__ == "__main__":
    app.run(debug=True)