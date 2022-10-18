from flask import Flask, render_template,request,redirect,url_for
import ibm_db
import re

app = Flask(__name__)
app.config['DEBUG'] = True
app.secret_key = 'a'

conn=ibm_db.connect("DATABASE=bludb;QUERYTIMEOUT=1;CONNECTTIMEOUT=10;HOSTNAME=55fbc997-9266-4331-afd3-888b05e734c0.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;PORT=31929;SECURITY=SSL;SSLServerCertificate=./DigiCertGlobalRootCA.crt;PROTOCOL=TCPIP;UID=jyg49227;PWD=TWWOggsuvcgpokMW",'','')
print(conn)
