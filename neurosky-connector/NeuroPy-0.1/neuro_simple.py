import time
import json
import socket

from NeuroPy import NeuroPy

s = socket.socket()
host = 'localhost'
port = 6969
# print ("Host", host)

s.connect((host, port))

object1=NeuroPy("/dev/rfcomm0", 57600) 

def attention_callback(attention_value):
    print ("Value of attention is", attention_value)
    data = {}
    data['type'] = 'attention'
    data['value'] = str(attention_value)
    json_data = json.dumps(data)

    s.send(json_data)
    return None

def meditation_callback(meditation_value):
    print ("Value of meditation is", meditation_value)
    data = {}
    data['type'] = 'meditation'
    data['value'] = str(meditation_value)
    json_data = json.dumps(data)

    s.send(json_data)
    return None

object1.setCallBack("attention", attention_callback)
object1.setCallBack("meditation", meditation_callback)

object1.start()

while True:
    x = 1
    # print ("Meditation is", object1.meditation)
    # print ("Attention is", object1.attention)
    # print ("Delta is", object1.delta)
    # print ("Theta is", object1.theta)
    # print ("lowAlpha is", object1.lowAlpha)
    # print ("highAlpha is", object1.highAlpha)
    # print ("lowBeta is", object1.lowBeta)
    # print ("highBeta is", object1.highBeta)
    # print ("lowGamma is", object1.lowGamma)
    # print ("midGamma is", object1.midGamma)
    # print ("blinkStrength is", object1.blinkStrength)
    # time.sleep(0.00001)
    # print
