import WebSocket from 'ws';

import { WS_PLAYERS, USERS } from '../store';

export const updateRoom = (response: string) => {
  WS_PLAYERS.forEach((userId: number, webSocket: WebSocket) => {
    const isMatchingUser = USERS.some(user => user.id === userId);
    
    if (isMatchingUser) {
      webSocket.send(response);
    }
  });
};