import WebSocket from 'ws';

import { WS_PLAYERS, GAMES } from '../store/index.js';
import { TYPES } from '../constants.js';

export let currentPlayerIndex: number = 0;

export const notifyPlayersOfTurn = async (idGame: number) => {
  const game = GAMES.find((game) => game.idGame === idGame);

  if (game) {
    WS_PLAYERS.forEach((idPlayer, webSocket: WebSocket) => {
      if (game.players.some((player) => player.idPlayer === idPlayer)) {
        webSocket.send(JSON.stringify({
          type: TYPES.TURN,
          data: JSON.stringify({ currentPlayerIndex: idPlayer }),
          id: 0,
        }));
      }
    });
  }
};