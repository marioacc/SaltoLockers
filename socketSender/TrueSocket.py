__author__ = '__el Quique__'

# Echo client program
import socket
import sys
import time

HOST = '10.33.5.106'  #10.32.70.126'  # The remote host
PORT = 8050  # The same port as used by the server
s = None
for res in socket.getaddrinfo(HOST, PORT, socket.AF_UNSPEC, socket.SOCK_STREAM):
    af, socktype, proto, canonname, sa = res
    try:
        s = socket.socket(af, socktype, proto)
    except socket.error as msg:
        s = None
        continue
    try:
        s.connect(sa)
    except socket.error as msg:
        s.close()
        s = None
        continue
    break
if s is None:
    print 'could not open socket'
    sys.exit(1)
#message_list = ["!200001010123401234#", "!10000202053054060-170#"]
message_list = ["" , ""]

#time.sleep(1)

for message in message_list:
    #print message
    s.sendall(
        'STP/00/194/<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?><RequestCall><RequestName>OnlineDoor.Open</RequestName><Params><DoorNameList><DoorID>Lector Mural</DoorID></DoorNameList></Params></RequestCall>')

data = s.recv(1024)
s.close()
print 'Received', repr(data)
#print('exito')