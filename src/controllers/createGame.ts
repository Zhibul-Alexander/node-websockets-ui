import WebSocket from 'ws';

import { WS_PLAYERS, GAMES } from '../store';
import { Player } from '../types';
import { TYPES } from '../constants';

export const createGame = (idGame: number) => {
  WS_PLAYERS.forEach((idPlayer: number, webSocket: WebSocket) => {
    const game = GAMES.find((game) => {
      const isMatchingGame = game.idGame === idGame;
      const hasMatchingPlayer = game.players.some((player: Player) => player.idPlayer === idPlayer);
      const hasTwoPlayers = game.players.length === 2;

      return isMatchingGame && hasMatchingPlayer && hasTwoPlayers;
    });

    if (game) {
      const response = JSON.stringify({
        type: TYPES.CREATE_GAME,
        data: JSON.stringify({ idGame, idPlayer: idPlayer }),
        id: 0,
      });
      webSocket.send(response);
    }
  });
};