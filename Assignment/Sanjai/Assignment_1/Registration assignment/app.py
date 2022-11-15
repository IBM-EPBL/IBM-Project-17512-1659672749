from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['DEBUG'] = True

CORS(app)
@app.route('/login',methods=("POST","GET"))
def login():
    name = request.form['name']
    mobile = request.form['mobile']
    email = request.form['email']
    return f'{name} register mobile num as {mobile} and email as {email}'

@app.route('/')
def home():
    return render_template("index.html")

if __name__ == '__main__':
    app.run()