from tornado import websocket, web, ioloop, httpserver
import tornado
import json

import sys

session = {}
WAITING_FOR_PLAYERS=0
GAME_IN_PROGRESS=1
game_state=WAITING_FOR_PLAYERS


class WSHandler(tornado.websocket.WebSocketHandler):
 
	def check_origin(self, origin):
		return True

	def open(self):
		print("connection opened")#print to terminal a conection is opened 
		print(self.request.remote_ip)#print the ip of the joined client
		print(self.stream.socket.getpeername()[1])
		pass
 
	def on_message(self, message):
		msg = json.loads(message)
		print(msg)
		if msg['type'] == 'updateState': #look up for dictionary 
			self.send_to_other_player(msg)
			print("updateState")
		if(msg['type'] == 'join'):
			self.join(msg)
		if(msg['type'] == 'start'):
			self.write_message(msg)
		if(msg['type'] == 'Error'):
			self.write_message(msg)
		if(msg['type'] == 'GameOver'):
			self.GameOver(msg)

		
		pass
 
	def on_close(self):
		for key in session:
			if key == self.get_player_address():
				session.pop(self.get_player_address())
		pass

	def get_player_address(self):
		return  str(self.request.connection.context.address)

	def send_to_other_player(self, message):
		for key, value in session.items():
			if key != self.get_player_address():
				value.write_message(message)
		pass

	def join(self, message):
		print("JOIN")
		player_address = str(self.request.connection.context.address)
		print("player address")
		print( len(session) )

		if len(session) < 2:
			if player_address not in session:
				session[player_address] = self
				game_state = WAITING_FOR_PLAYERS			
				print("GameJoined")
		elif len(session) >= 2:
			self.write_message(self.format_message("Error", "No available spaces"))
			print("No available spaces")
				
		if player_address in session:
			if len(session) == 2:
				game_state = GAME_IN_PROGRESS
				self.write_message(self.format_message("start", "Game Started"))
				self.send_to_other_player(self.format_message("start", "Game Started"))
		print("game state")

	def GameOver(self, message):
		print("GameOver")

		if self.get_player_address() in session :
			if len(session) > 0:
				self.write_message(self.format_message("GameOver","GAME OVER"))
				self.send_to_other_player(self.format_message("GameOver","GAME OVER"))

				session.clear()
				game_state = WAITING_FOR_PLAYERS
				print("Game Quit")

		else:
			self.write_message(self.format_message("Error","Not In Session"))

		pass

	def format_message(self, type, data):
		message = {}
		message["type"] = type
		message["data"] = str(data)
		return json.dumps(message)

app= tornado.web.Application([
	#map the handler to the URI named "test"
	(r'/wstest', WSHandler),
])
 
if __name__ == '__main__':
	server_port=8080
	app.listen(server_port)
	ioloop.IOLoop.instance().start()
	
