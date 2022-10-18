from flask import Flask,request

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/login',methods=("POST","GET"))
def login():
    name = request.form['name']
    mobile = request.form['mobile']
    email = request.form['email']
    return f'{name} register mobile num as {mobile} and email as {email}'

@app.route('/')
def home():
    return "Welcome to home page!"

if __name__ == '__main__':
    app.run()