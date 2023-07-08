import { httpServer } from './http_server/index.ts';
import { config } from 'dotenv';
import { webss } from './websocket_server/index.ts';

config();

const PORT = process.env.HTTP_PORT || 8181;

httpServer.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});

process.on('SIGINT', () => {
  httpServer.close();
  webss.close();
  process.exit();
});