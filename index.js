
import express from "express"

import { Server } from "socket.io";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer } from 'http'



const server = express()
const httpServer = createServer(server);

const PORT = process.env.PORT || 3000;

const io = new Server(httpServer);


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);






server.use(express.static(__dirname + '/public'));


function onConnection(socket) {

  console.log('Client connected');
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.on('disconnect', () => console.log('Client disconnected'))
}

io.on('connection', onConnection);

 
httpServer.listen(PORT, () => console.log('listening on port ' + PORT));

//heroku : agile-oasis-84110