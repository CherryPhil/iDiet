from wtforms import Form, StringField, SubmitField

class Post(Form):
    title = StringField('Title')
    comment = StringField('Text')
    submit = SubmitField('Post')