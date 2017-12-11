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

@app.route('/health')
def health():
   return render_template('health.html')

@app.route('/community')
def community():
    return render_template("community.html")

@app.route('/community/general')
def community_general():
    return render_template("general.html")

@app.route('/community/recipes')
def community_recipes():
    return render_template("recipes.html")

@app.route('/community/contactus')
def community_contactus():
    return render_template("contactus.html")

@app.route('/community/faq')
def community_faq():
    return render_template("faq.html")

@app.route('/community/general/append')
def community_general_append():
    return render_template("append.html")

if __name__ == '__main__':
    app.run(debug = True)
