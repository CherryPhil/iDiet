from flask import Flask, render_template, request, redirect, url_for
#Firebase
import firebase_admin
from firebase_admin import credentials, db

from formLogin import LoginForm
from formRegister import RegisterForm

from objRegister import RegisterObject


cred = credentials.Certificate('cred/idiet-229a2-firebase-adminsdk-f5ibn-9f138ec335.json')
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://idiet-229a2.firebaseio.com/'
})

root = db.reference()


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("skeleton.html")

@app.route("/fun")
def fun():
    return render_template("fun.html")

@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route("/terms&conditions")
def terms_and_conditions():
    return render_template("terms&conditions.html")

@app.route("/health")
def health():
    return render_template("health.html")

@app.route("/recipe")
def recipe():
    database_recipes = root.child('recipe').get()
    name = []
    for i in database_recipes:
        recipe_detail = database_recipes[i]
        name.append(recipe_detail)
    return render_template('recipe.html', name=name)

@app.route("/login", methods=["POST","GET"])
def login():
    session.pop("logged_in", None)
    form = LoginForm(request.form)
    regform = RegisterForm(request.form)

    users = root.child("users").get()

    if request.method == "POST" and form.login.data:
        username = form.username.data
        password = form.password.data

        for userid in users:
            userDetail = users[userid]
            if userDetail["username"] == username and userDetail["password"] == password:
                session["logged_in"] = userid
                return redirect(url_for('home'))
        error="Please check your Username and Password."
        return render_template("login.html", form=form, regform=regform, checkuser=users, error=error)

    elif request.method == "POST" and regform.register.data:
        username = regform.username.data
        firstname = regform.firstname.data
        lastname = regform.lastname.data
        password = regform.password.data

        user = RegisterObject(username, firstname, lastname, password)
        user_db = root.child("users")
        user_db.push({
            "username": user.get_username(),
            "firstname": user.get_firstname(),
            "lastname": user.get_lastname(),
            "password": user.get_password()
        })
        return render_template("login.html", form=form, regform=regform, checkuser=users)

    return render_template("login.html", form=form, regform=regform, checkuser=users)

if __name__ == "__main__":
    app.secret_key = 'iDiet123'
    app.run(debug=True)
