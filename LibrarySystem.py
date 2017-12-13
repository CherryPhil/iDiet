from flask import Flask, render_template, request, redirect, url_for, flash

import firebase_admin
from firebase_admin import credentials, db

from postVar import Post
from getPost import postObj

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

@app.route('/community/contactus')
def contactus():
    return render_template("contactus.html")

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

if __name__ == '__main__':
    app.secret_key = 'iDiet123'
    app.run()
