from flask import Flask, render_template,request,redirect,url_for
import ibm_db
import re

app = Flask(__name__)
app.config['DEBUG'] = True
app.secret_key = 'a'


conn=ibm_db.connect("DATABASE=bludb;QUERYTIMEOUT=1;CONNECTTIMEOUT=10;HOSTNAME=b0aebb20-94fa-46ec-a1fc-1c888edb6187.c3n41cmd0nqnrk39u98g.databases.appdomain.cloud;PORT=31249;SECURITY=SSL;SSLServerCertificate=./DigiCertGlobalRootCA.crt;PROTOCOL=TCPIP;UID=rts12021;PWD=bbx8Laaa03KvpvKO",'','')


@app.route("/", methods=["GET", "POST"])
def register():
    if request.method == 'POST':
        data = request.form.to_dict()
        sql_query = "INSERT INTO User (username, email, rollnumber, password) VALUES('{}','{}','{}','{}')".format(data["user"], data["email"], data["rollnumber"], data["password"])
        ibm_db.exec_immediate(conn,sql_query)
        return redirect(url_for("login"))
    if request.method == "GET":
        return render_template("registration.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        data = request.form.to_dict()
        sql_query = "SELECT password from User WHERE username = '{}'".format(data["user"])
        result = ibm_db.exec_immediate(conn,sql_query)
        value = ibm_db.fetch_tuple(result)
        if value[0] == data["password"]:
            return redirect(url_for("welcome"))
        else:
            return "<p style=color:red;>Invalid Credentials</p>"
    if request.method == "GET":
        return render_template("login.html")


@app.route("/welcome", methods=["GET"])
def welcome():
    return render_template("welcome.html")