import json
from flask import Flask
from datetime import datetime
import pytz
import requests
from color_convert import color
from PIL import Image
from urllib.request import urlopen
import re as r


app = Flask(__name__)

db= {}

@app.route("/", methods=["GET"])
def register():
     time =  datetime.now(tz=pytz.timezone('Asia/Kolkata'))
     response = requests.get("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")
     data = json.loads(response.text)
     rgbValue = color.hex_to_rgb("#fff000")
     img_res = requests.get("https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png")
     file = open("demo.jpg", "wb")
     file.write(img_res.content)
     file.close()
     img = Image.open("./demo.jpg")
     width,height = img.size
     dns = str(urlopen('http://checkip.dyndns.com/').read())
     address = r.compile(r'Address: (\d+\.\d+\.\d+\.\d+)').search(dns).group(1)
     return "<h1>Host IP is {}</h1> <h1>Current Server Time  {}</h1> <h3>Rgb Value of Yellow is {}<h3><h3>The Dimensions of Google logo in the search page is {}x{}<pre>{}</pre>".format(address, time, rgbValue,width, height, data)
