__author__ = 'mgradob'

"""
 Imports
"""
import socket
import sys

#import COMThread


class SocketTestServer:
    """
     Class ServerSocketTest
      Initializes a server socket on localhost, appends data received in console.
    """

    """Global Variables"""
    addr = ""
    port = 0
    conns = 0
    test_socket = None
    com_thread = None
    poll_thread = None
    command = ""

    # Initialization
    def __init__(self, address, port, connections):
        self.addr = address
        self.port = port
        self.conns = connections

        self.test_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        print('Socket created')

        try:
            self.test_socket.bind((self.addr, self.port))
        except socket.error as msg:
            print('Bind failed. Error code: {}'.format(msg))
            sys.exit()

        print('Socket bind complete')

        self.test_socket.listen(self.conns)
        print('Socket listening, conns: {}'.format(self.conns))

        while 1:
            conn, addr = self.test_socket.accept()

            while 1:
                self.command = conn.recv(1024)
                print('Command received: {}'.format(self.command))

                if not self.command:
                    break

                if self.command == 'DEPOSITO':
                    conn.sendall("DEPOSITO(12,50)")
                else:
                    conn.sendall("OK: {}".format(self.command))

            conn.close()

"""
 Run
"""
if __name__ == '__main__':
    server = SocketTestServer('127.0.0.1', 9998, 1)