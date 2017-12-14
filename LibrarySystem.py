from flask import Flask, render_template, request, redirect, url_for, flash

import firebase_admin
from firebase_admin import credentials, db

from postVar import Post
from postVar import Contact
from postVar import User_recipe

from getPost import postObj
from getPost import contactObj
from getPost import recipeObj

cred = credentials.Certificate('cred/idiet-229a2-firebase-adminsdk-f5ibn-9f138ec335.json')
default_app = firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://idiet-229a2.firebaseio.com/'
})

root = db.reference()

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/community')
def community():
    return render_template("community.html")

@app.route('/community/announcements', methods=['GET'])
def announcements():
    return render_template("announcements.html")

@app.route('/community/general')
def general():
    posts = root.child("posts").get()
    if posts == None:
        noPosts = 'There are no current posts.'
        return render_template('general.html', generals=noPosts)
    titles = []
    comments = []
    for i in posts:
        postDetail = posts[i]
        user_title = postDetail['title']
        user_comment = postDetail['comment']
        titles.append(user_title)
        comments.append(user_comment)
    return render_template("general.html", title=titles, comment=comments)

@app.route('/community/recipes')
def recipes():
    return render_template("recipes.html")

@app.route('/community/contactus', methods=['POST', 'GET'])
def contactus():
    contact = Contact(request.form)
    if request.method == 'POST':
        email = contact.email.data
        subject = contact.subject.data
        message = contact.message.data
        contacts = contactObj(email, subject, message)
        contact_db = root.child('messages')
        contact_db.push({
            'email': contacts.get_email(),
            'subject': contacts.get_subject(),
            'message': contacts.get_message(),
        })
        return redirect(url_for('contactus'))

    return render_template("contactus.html", contact=contact)

@app.route('/community/faq')
def faq():
    return render_template("faq.html")

@app.route('/community/announcements/<title_url>', methods=['GET','POST'])
def append(title_url):
    posts = root.child("posts").get()
    for i in posts:
        user_details = posts[i]
        if user_details['title'] == title_url:
            titled = user_details['title']
            commented = user_details['comment']
    return render_template("append.html", titled=titled, commented=commented)

@app.route('/community/general/post', methods=['POST', 'GET'])
def post():
    post = Post(request.form)
    if request.method == 'POST':
        title = post.title.data
        comment = post.comment.data
        posts = postObj(title, comment)
        post_db = root.child('posts')
        post_db.push({
            'title': posts.get_title(),
            'comment': posts.get_comment(),
        })
        return redirect(url_for('general'))

    return render_template("post.html", post=post)

@app.route('/community/recipes/post_recipe', methods=['POST', 'GET'])
def post_recipe():
    postR = User_recipe(request.form)
    if request.method == 'POST':
        food = postR.food.data
        food_type = postR.food_type.data
        recipes = postR.recipes.data
        postRs = recipeObj(food, food_type, recipes)
        postR_db = root.child('recipes')
        postR_db.push({
            'food': postRs.get_food(),
            'food_type': postRs.get_food_type,
            'recipes': postRs.get_recipes,
        })
        return redirect(url_for('recipes'))

    return render_template("post_recipe.html", postR=postR)

if __name__ == '__main__':
    app.secret_key = 'iDiet123'
    app.run()
