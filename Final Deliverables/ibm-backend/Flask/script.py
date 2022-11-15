from resume_parser import resumeparse
import redis
import base64
import os
import json
import time


redis_client = redis.Redis(
  host= 'eu1-aware-tuna-35243.upstash.io',
  port= '35243',
  password= 'b4722ca688d24027a33b0f649208bc8d'
)

print(redis_client)

pipe = redis_client.pubsub()


def pdf_handller(message):
    data = json.loads(message['data'].decode('utf-8'))
    print(data['filename'])
    byte = base64.b64decode(data['blob'])
    print("byte decoded")
    f = open(os.path.join("./", data['filename']), 'wb')
    f.write(byte)
    f.close()
    print("file finished")
    parse_data = resumeparse.read_file('./'+ data['filename'])
    print(parse_data)
    redis_client.publish("get-parsed-data", json.dumps({"filename" : data['filename'],"parse_data" : parse_data}))
    os.remove(data['filename'])
  


pipe.subscribe(**{'get-resume-from-node': pdf_handller})

def exception_handler(ex, pubsub, thread):
    print(ex)
    thread.stop()
    thread.join(timeout=1.0)
    pubsub.close()

thread = pipe.run_in_thread(exception_handler=exception_handler)

