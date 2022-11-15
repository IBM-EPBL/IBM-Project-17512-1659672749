import json
import os
import re

import ibm_db
import requests
from flask import Flask, redirect, render_template, request, session, url_for
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__,template_folder='template',static_folder='template/static')
app.config['SESSION_TYPE'] = 'memcached'
app.config['SECRET_KEY'] = 'super secret key'

session_username = ""

hostname = ''
uid = ''
pwd = ''
driver = "{}"
db = ''
port = ''
protocol = ''
cert = ''

dsn = (
	"DATABASE = {0};"
	"HOSTNAME = {1};"
	"PORT = {2};"
	"UID = {3};"
	"SECURITY = SSL;"
	"SSlServerCertificate = {4};"
	"PWD = {5};"
).format(db, hostname, port, uid, cert, pwd)


conn = ibm_db.connect(dsn, " ", " ")


@app.route("/")
def home_page():
	return render_template('home.html')


@app.route("/login", methods=["GET", "POST"])
def login_page():
	global userid
	msg_value = ""
	msg = ""
	if request.method == 'POST':
		username = request.form["username"]
		password = request.form["password"]
		# username = request.form.get("username")
		# password = request.form.get("password")
		print(username)
		sql = "SELECT username,email,password from user where username = ? and password = ? "
		stmt = ibm_db.prepare(conn,sql)
		ibm_db.bind_param(stmt,1,username)
		ibm_db.bind_param(stmt,2,password)
		ibm_db.execute(stmt)
		account = ibm_db.fetch_assoc(stmt)
		print(account)
		if account:
			session['loggedin']=True
			session['id'] = account['USERNAME']
			userid = account['USERNAME']
			session['USERNAME'] = account['USERNAME']
			# msg_value = "Logged in successfully"
			global session_username
			session_username = username
			return render_template('dashboard_2.html', msg_value=msg_value)
		else:
			msg = "Incorrect Username or Password"
			return render_template('login.html', msg=msg)
	return render_template('login.html')


@app.route("/register", methods=["GET", "POST"])
def register_page():
	msg = ''
	if request.method == 'POST':
		username = request.form["username"]
		password = request.form["password"]
		email = request.form["email"]
		sql = "SELECT * from user where username = ?"
		stmt = ibm_db.prepare(conn,sql)
		ibm_db.bind_param(stmt,1,username)
		ibm_db.execute(stmt)
		account = ibm_db.fetch_assoc(stmt)
		print(account)
		if account:
			msg = "Account already exists"
		elif not re.match(r'[^@]+@[^@]+\.[^@]+',email):
			msg = 'Invalid email address !'
		elif not re.match(r'[A-Za-z0-9]',username):
			msg = "Name must contain only characters and numbers!"
		else:
			insert_sql = "INSERT INTO user (USERNAME,EMAIL,PASSWORD) values (?,?,?)"
			prep_stmt = ibm_db.prepare(conn, insert_sql)
			ibm_db.bind_param(prep_stmt,1,username)
			ibm_db.bind_param(prep_stmt,2,email)
			ibm_db.bind_param(prep_stmt,3,password)
			ibm_db.execute(prep_stmt)
			msg='You have successfully registered !'
			# return render_template('login.html')
	elif request.method == 'POST':
		msg = 'Please fill out the form!'
	return render_template('register.html', msg=msg)


@app.route('/dashboard',methods=["GET", "POST"])
def dashboard():
	if request.method == 'POST':

		skillname = request.form["skillname"]

		url = "https://jsearch.p.rapidapi.com/search"

		querystring = {"query":f"{skillname}","num_pages":"1"}

		headers = {
		"X-RapidAPI-Key": "",
		"X-RapidAPI-Host": "jsearch.p.rapidapi.com"
		}

		response = requests.request("GET", url, headers=headers, params=querystring)

		# print(response.text)
		json_value = response.text


		
		json_value = json.loads(json_value,strict=False)

		jobs_data = json_value["data"]

		msg = """"""
		i = 0

		for i in range(len(jobs_data)):
			job_title = json_value["data"][int(i)]["job_title"]
			employer_website = json_value["data"][i]["employer_website"]
			msg = msg + f"""
				<div class="col-lg-3 ml-5" id="focus-third">
				<div class="card" style="width: 20rem;">
					<!-- <img src="assets/img/health camp.jpg" class="card-img-top" alt="..."> -->
					<div class="card-body" style="border: 1px solid #000000">
					<h5 class="card-title">{job_title}</h5>
					<p class="card-text">{employer_website}</p>
						<a href="apply?job_title={job_title}&employer_website={employer_website}" class="btn btn-primary">Apply Now</a>
					</div>
				</div>
				</div>
				<br>
				<div class="space"></div>
			"""

		print(len(jobs_data))
		return render_template('dashboard_2.html',msg=msg)
	else:
		return render_template('dashboard_2.html')


@app.route('/apply', methods=['GET','POST'])
def apply():
	msg_value = ''
	if request.method == 'POST':
		username = request.form["username"]
		email = request.form["email"]
		qualification = request.form["qualification"]
		skills = request.form["skills"]
		job_title = request.form["job_title"]
		employer_website = request.form["employer_website"]
		sql = 'SELECT * FROM user where username =?'
		insert_sql = "INSERT INTO jobs (USERNAME,EMAIL,QUALIFICATION,SKILLS,JOBTITLE,COMPANY) VALUES (?,?,?,?,?,?)"
		prep_stmt = ibm_db.prepare(conn, insert_sql)
		ibm_db.bind_param(prep_stmt,1,username)
		ibm_db.bind_param(prep_stmt,2,email)
		ibm_db.bind_param(prep_stmt,3,qualification)
		ibm_db.bind_param(prep_stmt,4,skills)
		ibm_db.bind_param(prep_stmt,5,job_title)
		ibm_db.bind_param(prep_stmt,6,employer_website)
		ibm_db.execute(prep_stmt)
		msg_value = 'You have successfully applied for job !'
		session['loggedin']=True
	elif request.method == ['POST']:
		msg_value='Please fill out the form !'
		return render_template("apply_2.html", remaining_form=remaining_form)
	else:
		print("out")
		get_job_title = request.args.get('job_title', default = "Developer", type = str)
		get_employer_website = request.args.get('employer_website', default = 'Company Name Not Provided', type = str)
		if get_employer_website == None:
			get_employer_website = 'Company Name Not Provided'
		# print(get_job_title)
		# print(get_employer_website)
		remaining_form = f"""
			<input type="text" name="job_title" id="job_title" value="{get_job_title}" required></br></br>
			<input type="text" name="employer_website" id="employer_website" value="{get_employer_website}" required></br></br>
		"""
		return render_template("apply_2.html", remaining_form=remaining_form)
	return render_template('dashboard_2.html',msg_value=msg_value)


@app.route('/display')
def display():
	# print(session["username"],session['id'])
	# cursor = mysql.connetion.cursor()
	# cursor.execute('SELECT * FROM job where userid = %s', (session['id']))
	# account = cursor.fetchone()
	# print("accountdisplay",account)
	jobs_list_sql = "SELECT * FROM jobs where username = ? " 
	prep_stmt = ibm_db.prepare(conn, jobs_list_sql)
	print(session_username)
	ibm_db.bind_param(prep_stmt,1,session_username)
	ibm_db.execute(prep_stmt)
	list_of_jobs = ibm_db.fetch_assoc(prep_stmt)
	jobs_table = """"""
	while list_of_jobs != False:
		# print("The ID is : " + str(list_of_jobs["JOBTITLE"]))
		# print("The name is : ", str(list_of_jobs["COMPANY"]))
		jobs_name_value = str(list_of_jobs["JOBTITLE"])
		company_name_value = str(list_of_jobs["COMPANY"])
		skills_name_value = str(list_of_jobs["SKILLS"])
		list_of_jobs = ibm_db.fetch_assoc(prep_stmt)
		jobs_table = jobs_table + f"""
			<tr>
				<td>{jobs_name_value}</td>
				<td>{company_name_value} Chang</td>
				<td>{skills_name_value}</td>
			</tr>
		"""
	print(list_of_jobs)
	return render_template('display.html', jobs_table=jobs_table)


@app.route('/logout')
def logout():
	session.pop('loggedin',None)
	session.pop('id', None)
	session.pop('username',None)
	return render_template('home.html')
	



def SendEmail(to_email):
	FROM_EMAIL = 'jobportal@sendgrid.com'
	""" Send an email to the provided email addresses
	:param to_email = email to be sent to
	:returns API response code
	:raises Exception e: raises an exception """
	message = Mail(
		from_email=FROM_EMAIL,
		to_emails=to_email,
		subject='MyJobPortal : Job Applied',
		html_content='<strong></strong>')
	try:
		sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
		response = sg.send(message)
		code, body, headers = response.status_code, response.body, response.headers
		print(f"Response Code: {code} ")
		print(f"Response Body: {body} ")
		print(f"Response Headers: {headers} ")
		print("Message Sent!")
	except Exception as e:
		print("Error: {0}".format(e))
	return str(response.status_code)





if __name__=='__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)
