from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("skeleton.html")

@app.route('/privacy')
def privacy():
    return render_template("privacy.html")

@app.route('/terms&conditions')
def terms_and_conditions():
    return render_template("terms&conditions.html")

@app.route('/login')
def login():
    return render_template("login.html")

@app.route('/recipe')
def recipe():
   return render_template('recipe.html')

if __name__ == '__main__':
    app.run(debug = True)
