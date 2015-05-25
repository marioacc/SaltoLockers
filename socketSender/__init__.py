__author__ = 'luishoracio'
import socket

send = 'STP/00/196/<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>'
send += "<RequestCall>"
send += "<RequestName>OnlineDoor.Open</RequestName>"
send += "<Params>"
send += "<DoorNameList>"
send += "<DoorID>Lector Mural</DoorID>"
send += "</DoorNameList>"
send += "</Params>"
send += "</RequestCall>"

print(send)

clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.connect(('10.33.13.173', 8050))
clientsocket.send(send)

data = clientsocket.recv(1024)
clientsocket.close()
print 'Received', repr(data)