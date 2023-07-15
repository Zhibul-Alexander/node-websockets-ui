import { WebSocketServer } from 'ws';
import 'dotenv/config';

const PORT = process.env.HTTP_PORT || 8181;

export const wss = new WebSocketServer({ port: PORT });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log(data);
  });

  ws.on('error', (e) => {
    console.log(e);
  });
});