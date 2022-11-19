import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def sendEmail(payload):
    message = Mail(
    from_email='737819ECR155@smartinternz.com',
    to_emails = payload["email"],
    subject='Verify Your Email Address',
    html_content='<h3>Please Verify Your Email Address By Click The Link Below</h3><br />'.format(payload["email"]))
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.message)
