__author__ = 'luishoracio'
import socket

send1 = 'STP/00/196/<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>'
send1 += "<RequestCall>"
send1 += "<RequestName>OnlineDoor.Open</RequestName>"
send1 += "<Params>"
send1 += "<DoorNameList>"
send1 += "<DoorID>Lector Mural</DoorID>"
send1 += "</DoorNameList>"
send1 += "</Params>"
send1 += "</RequestCall>"

print(send1)

clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.connect(('10.33.5.106', 8050))

clientsocket.send(send1)
clientsocket.send(send1)

data = clientsocket.recv(1024)
clientsocket.close()
print 'Received', repr(data)